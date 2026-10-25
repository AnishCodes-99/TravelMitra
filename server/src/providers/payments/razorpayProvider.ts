import crypto from 'crypto';
import { IPaymentProvider, CreateOrderParams, PaymentOrder, VerifyPaymentParams } from '../types.js';
import { env } from '../../config/env.js';
import { logger } from '../../utils/logger.js';
import { AppError } from '../../middleware/errorHandler.js';

export class RazorpayPaymentProvider implements IPaymentProvider {
  private keyId: string;
  private keySecret: string;

  constructor() {
    this.keyId = env.RAZORPAY_KEY_ID;
    this.keySecret = env.RAZORPAY_KEY_SECRET;
  }

  public isConfigured(): boolean {
    return Boolean(this.keyId && this.keySecret);
  }

  public async createOrder(params: CreateOrderParams): Promise<PaymentOrder> {
    if (!this.isConfigured()) {
      throw new AppError(
        'Razorpay payment gateway is not configured on the server. Please provide RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in server/.env.',
        503
      );
    }

    // In payment phase:
    // const instance = new Razorpay({ key_id: this.keyId, key_secret: this.keySecret });
    // return instance.orders.create({ ... })
    logger.info(`Creating Razorpay order for booking ${params.bookingId} of amount ₹${params.amountInPaise / 100}`);
    return {
      orderId: `order_sim_${Date.now()}`,
      amount: params.amountInPaise,
      currency: params.currency,
      keyId: this.keyId,
      status: 'created',
    };
  }

  public async verifySignature(params: VerifyPaymentParams): Promise<boolean> {
    if (!this.isConfigured()) {
      throw new AppError('Payment signature verification requires active Razorpay credentials.', 503);
    }

    const body = `${params.orderId}|${params.paymentId}`;
    const expectedSignature = crypto
      .createHmac('sha256', this.keySecret)
      .update(body.toString())
      .digest('hex');

    return expectedSignature === params.signature;
  }
}

export const paymentProvider = new RazorpayPaymentProvider();
