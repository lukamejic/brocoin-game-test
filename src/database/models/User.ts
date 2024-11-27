import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  username: string;
  telegramId: string;
  lastLogin: Date;
  createdAt: Date;
  points: number;
  referralPoints: number;
  referredBy: string;
  rating: number;
  timePoints: number;
  dailyPoints: number;
  timePointsRecord: number;
  pointsSum: number;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: false},
  username: { type: String, required: false },
  telegramId: { type: String, required: true, unique: true},
  lastLogin: { type: Date, required: false },
  createdAt: { type: Date, required: false },
  points: { type: Number, required: false },
  referralPoints: { type: Number, required: false },
  referredBy: { type: String, required: false},
  rating: { type: Number, required: false },
  timePoints: { type: Number, required: false },
  dailyPoints: { type: Number, required: false },
  timePointsRecord: { type: Number, required: false },
  pointsSum: { type: Number, required: false },
});

export const User = model<IUser>("User", UserSchema);
