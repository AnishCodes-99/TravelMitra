import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProfile extends Document {
  firebaseUid: string;
  displayName: string;
  email: string;
  photoURL?: string;
  phone?: string;
  preferences: {
    currency: string;
    seatPreference?: 'window' | 'aisle' | 'middle';
    mealPreference?: string;
    notificationsEnabled: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userProfileSchema = new Schema<IUserProfile>(
  {
    firebaseUid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    displayName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    photoURL: {
      type: String,
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    preferences: {
      currency: {
        type: String,
        default: 'INR',
      },
      seatPreference: {
        type: String,
        enum: ['window', 'aisle', 'middle'],
      },
      mealPreference: {
        type: String,
        trim: true,
      },
      notificationsEnabled: {
        type: Boolean,
        default: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export const UserProfile = mongoose.model<IUserProfile>('UserProfile', userProfileSchema);
