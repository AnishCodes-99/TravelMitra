import mongoose, { Document, Schema } from 'mongoose';

export interface ISavedDestination extends Document {
  firebaseUid: string;
  destinationReference: string;
  destinationName: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const savedDestinationSchema = new Schema<ISavedDestination>(
  {
    firebaseUid: {
      type: String,
      required: true,
      index: true,
    },
    destinationReference: {
      type: String,
      required: true,
      trim: true,
    },
    destinationName: {
      type: String,
      required: true,
      trim: true,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure a user doesn't duplicate-save the same destination
savedDestinationSchema.index({ firebaseUid: 1, destinationReference: 1 }, { unique: true });

export const SavedDestination = mongoose.model<ISavedDestination>(
  'SavedDestination',
  savedDestinationSchema
);
