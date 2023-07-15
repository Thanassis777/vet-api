import { Document, Schema } from 'mongoose';
import validator from 'validator';

import { UserTypes } from '../constants/userTypes';

export interface UserSchema extends Document {
  firstName: string;
  lastName: string;
  phone: number;
  imageProfile: string;
  images: string[];
  email: string;
  password: string;
  passwordConfirm: string;
  userType: string;
  createdAt: Date;
  passwordChangedAt: Number;
  passwordResetToken: string;
  passwordResetExpires: Date;

  correctPassword: (candidatePass: string, userPass: string) => Promise<boolean>;
  changedPasswordAfter: (JWTTimestamp: string) => boolean;
  createPasswordResetToken: () => string;
}

const userSchema = new Schema<UserSchema>({
  firstName: {
    type: String,
    required: [true, 'First name is required.'],
    trim: true,
    minlength: 2,
    maxlength: 20,
    validate: (value: string) => validator.isAlpha(value),
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required.'],
    trim: true,
    minlength: 2,
    maxlength: 20,
    validate: (value: string) => validator.isAlpha(value),
  },
  phone: {
    type: Number,
    required: false,
    validate: (value: number) => validator.isMobilePhone(value.toString(), 'el-GR'),
  },
  imageProfile: {
    type: String,
    default: 'default.jpg',
  },
  images: [String],
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    validate: (value: string) => validator.isEmail(value),
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    validate: (value: string) => validator.isStrongPassword(value),
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: true,
    validate: {
      validator: function (value: string) {
        return value === this.password;
      },
      message: 'Passwords are not the same!',
    },
  },
  userType: {
    type: String,
    required: true,
    enum: Object.keys(UserTypes),
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false,
  },
  passwordChangedAt: Number,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

export default userSchema;
