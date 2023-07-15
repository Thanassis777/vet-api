import { Specialities } from '../constants/specialities';

export const validateSpecialities = (values: string[]) => {
  if (Array.isArray(values) && values.length === 0) {
    throw new Error(`Specialities should have at least one value`);
  } else if (Array.isArray(values) && values.length > Object.keys(Specialities).length) {
    throw new Error(`Specialities should have maximum 4 values`);
  } else if (values.some((val) => values.indexOf(val) !== values.lastIndexOf(val))) {
    throw new Error(`Specialities should not have duplicate`);
  }
};
