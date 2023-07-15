import { Document } from 'mongoose';

export interface PetSchema extends Document {
  name: string;
  age: number;
  breed: string;
}
