import mongoose, { Document, Schema } from 'mongoose';

export interface IItineraryItem {
  day: number;
  time?: string;
  activity: string;
  location?: string;
  notes?: string;
}

export interface ITrip extends Document {
  firebaseUid: string;
  title: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  itinerary: IItineraryItem[];
  travellers: number;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const itineraryItemSchema = new Schema<IItineraryItem>({
  day: { type: Number, required: true },
  time: { type: String, trim: true },
  activity: { type: String, required: true, trim: true },
  location: { type: String, trim: true },
  notes: { type: String, trim: true },
});

const tripSchema = new Schema<ITrip>(
  {
    firebaseUid: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    destination: {
      type: String,
      required: true,
      trim: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    itinerary: [itineraryItemSchema],
    travellers: {
      type: Number,
      default: 1,
      min: 1,
    },
    notes: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Trip = mongoose.model<ITrip>('Trip', tripSchema);
