import mongoose, { Schema, Document } from "mongoose";

export interface message extends Document {
  content: string;
  createDat: Date;
}

const MessageSchema: Schema<message> = new Schema({
  content: {
    type: String,
    required: true,
  },
  createDat: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export interface user extends Document {
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  verifyCodeExpiry: Date;
  isVerified: boolean;
  isAcceptingMessage: boolean;
  messages: message[];
}

const UserSchema: Schema<user> = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, "email is required"],

    unique: true,
    match: [/.+\@.+\..+/, "please use a valid email addres"],
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  verifyCode: {
    type: String,
    required: [true, "verifyCode is required"],
  },
  verifyCodeExpiry: {
    type: Date,
    required: [true, "verifyCodeExpiry is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAcceptingMessage: {
    type: Boolean,
    default: true,
  },
  messages: [MessageSchema],
});

const UserModel =
  (mongoose.models.User as mongoose.Model<user>) ||
  mongoose.model<user>("User", UserSchema);

export default UserModel;
