import mongoose, { Document, model, Query, Schema } from 'mongoose';
import { removeVersionKey } from '../middlewares/removeVersionKey';

export interface AppointmentSchema extends Document {
  appointDate: Date;
  createdAt: Date;
  reason: string;
  client: mongoose.Schema.Types.ObjectId;
  vet: mongoose.Schema.Types.ObjectId;
}

const appointmentSchema = new Schema<AppointmentSchema>({
  appointDate: {
    type: Date,
    required: true,
    validate: {
      validator: async function(date: Date) {
        const count = await this.constructor.countDocuments({
          appointDate: date,
          vet: this.vet,
        });
        return count === 0;
      },
      message: 'Appointment date already exists for this vet.',
    },
  },
  reason: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  client: {
    type: mongoose.Types.ObjectId,
    ref: 'Client',
    required: [true, 'Appointment should belong to a client'],
  },
  vet: {
    type: mongoose.Types.ObjectId,
    ref: 'Vet',
    required: [true, 'Appointment should belong to a vet'],
  },
});

appointmentSchema.pre(/^find/, removeVersionKey);

appointmentSchema.pre<Query<AppointmentSchema[], AppointmentSchema>>(/^find/, function (next) {
  this.populate({
    path: 'vet',
    // select: 'lastName firstName', // TODO: define specific fields we need
  }).populate({
    path: 'client',
    // select: 'firstName', // same as above
  });

  next();
});

export const Appointment = model<AppointmentSchema>('Appointment', appointmentSchema);
