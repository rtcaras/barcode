import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  profileImage: string;
  email: string;
  phoneNumber: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  profileImage: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
