import { Schema, model } from "mongoose";

export interface IUser {
  name: string;
  username: string;
  telegramId: string;
  lastLogin: Date;
  createdAt: Date;
  points: number;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: false},
  username: { type: String, required: false },
  telegramId: { type: String, required: true, unique: true},
  lastLogin: { type: Date, required: false },
  createdAt: { type: Date, required: false },
  points: { type: Number, required: false }
});

export const User = model<IUser>("User", UserSchema);