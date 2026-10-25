import mongoose, { Document, Schema } from 'mongoose';

export type BookingType = 'flight' | 'hotel' | 'package';
export type PaymentStatus = 'pending' | 'authorized' | 'captured' | 'failed' | 'refunded';
export type BookingStatus = 'draft' | 'confirmed' | 'cancelled' | 'completed';

export interface IBooking extends Document {
  firebaseUid: string;
  bookingReference: string;
  bookingType: BookingType;
  providerReference?: string;
  providerConfirmationReference?: string;
  details: Record<string, unknown>;
  passengerOrGuestInfo: Array<Record<string, unknown>>;
  price: number;
  currency: string;
  paymentStatus: PaymentStatus;
  bookingStatus: BookingStatus;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    firebaseUid: {
      type: String,
      required: true,
      index: true,
    },
    bookingReference: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    bookingType: {
      type: String,
      enum: ['flight', 'hotel', 'package'],
      required: true,
    },
    providerReference: {
      type: String,
      trim: true,
    },
    providerConfirmationReference: {
      type: String,
      trim: true,
    },
    details: {
      type: Schema.Types.Mixed,
      required: true,
    },
    passengerOrGuestInfo: {
      type: [Schema.Types.Mixed],
      default: [],
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    currency: {
      type: String,
      default: 'INR',
    },
    paymentStatus: {
      type: String,
      enum: ['pending', 'authorized', 'captured', 'failed', 'refunded'],
      default: 'pending',
      index: true,
    },
    bookingStatus: {
      type: String,
      enum: ['draft', 'confirmed', 'cancelled', 'completed'],
      default: 'draft',
      index: true,
    },
    razorpayOrderId: {
      type: String,
      trim: true,
    },
    razorpayPaymentId: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);
