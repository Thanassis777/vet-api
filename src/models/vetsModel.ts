import { Document, model, Schema } from 'mongoose';
import validator from 'validator';

import userSchema, { UserSchema } from './userModel';

import { Specialities } from '../constants/specialities';

import { validateSpecialities } from '../utils/validateSpecialities';

import { attachSchemaMiddleware } from '../middlewares/attachSchemaMiddleware';
import { removeVirtualId } from '../utils/removeVirtualId';

export interface VetSchema extends UserSchema, Document {
  address: string;
  region: string;
  state: string;
  numberAddress: Number;
  specialities: string[];
}

export const vetSchema = new Schema<VetSchema>(
  {
    ...userSchema.obj,
    address: {
      type: String,
      required: false,
      trim: true,
      minlength: 2,
      maxlength: 20,
      validate: (value: string) => validator.isAlpha(value),
    },
    numberAddress: {
      type: Number,
      required: false,
      min: 1,
      max: 9999,
      validate: (value: number) => validator.isNumeric(value.toString()),
    },
    region: {
      type: String,
      required: false,
      trim: true,
      minlength: 2,
      maxlength: 20,
      validate: (value: string) => validator.isAlpha(value),
    },
    state: {
      type: String,
      required: false,
      trim: true,
      minlength: 2,
      maxlength: 20,
      validate: (value: string) => validator.isAlpha(value),
    },
    specialities: {
      type: [String],
      required: false,
      default: undefined,
      enum: Object.values(Specialities),
      validate: (values: string[]) => validateSpecialities(values),
    },
  },
  {
    toJSON: {
      virtuals: true,
      transform: removeVirtualId,
    },
    toObject: {
      virtuals: true,
      transform: removeVirtualId,
    },
  }
);

attachSchemaMiddleware(vetSchema);

// virtual populate appointments (not persisted in database,only for query purposes)
vetSchema.virtual('appointments', {
  ref: 'Appointment',
  foreignField: 'vet',
  localField: '_id',
  options: { select: '-vet' },
});

export default model<VetSchema>('Vet', vetSchema);
