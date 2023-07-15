import { UserTypes } from './userTypes';

export const requiredFields: Record<UserTypes, string[]> = {
  [UserTypes.vet]: ['address', 'numberAddress', 'region'], // add more
  [UserTypes.client]: ['phone'], // add more
};
