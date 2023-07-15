import { Document, model, Schema } from 'mongoose';

import userSchema, { UserSchema } from './userModel';
import { PetSchema } from './petModel';

import { attachSchemaMiddleware } from '../middlewares/attachSchemaMiddleware';
import validator from 'validator';
import { removeVirtualId } from '../utils/removeVirtualId';

export interface ClientSchema extends UserSchema, Document {
  pets: PetSchema[];
}

const clientSchema = new Schema<ClientSchema>(
  {
    ...userSchema.obj,
    pets: {
      type: [
        {
          name: {
            type: String,
            validate: (value: string) => validator.isAlpha(value),
            trim: true,
          },
          age: {
            type: Number,
            validate: (value: number) => validator.isFloat(value.toString(), { gt: 0 }),
          },
          breed: {
            type: String,
            validate: (value: string) => validator.isAlpha(value),
            trim: true,
          },
        },
      ],
      default: [],
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

// virtual populate appointments (not persisted in database,only for query purposes)
clientSchema.virtual('appointments', {
  ref: 'Appointment',
  foreignField: 'client',
  localField: '_id',
  options: { select: '-client' },
});

attachSchemaMiddleware(clientSchema);

export default model<ClientSchema>('Client', clientSchema);
