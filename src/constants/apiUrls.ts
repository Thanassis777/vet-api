import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
const BASE_URL = process.env.BASE_URL;

export const baseUsersUrl = `${BASE_URL}/users`;
export const baseVetsUrl = `${BASE_URL}/vets`;
export const baseClientsUrl = `${BASE_URL}/clients`;
export const baseAuthUrl = `${BASE_URL}/auth`;
export const baseAppointmentUrl = `${BASE_URL}/appointments`;

export const userApi = {
  BASE_URL: baseUsersUrl,
  ROOT_URL: '/',
  IDS_URL: '/:id',
  NESTED_APPOINTMENT_URL: '/:clientId/:vetId/appointments',
};

export const vetApi = {
  BASE_URL: baseVetsUrl,
  ROOT_URL: '/',
  IDS_URL: '/:id',
  NESTED_APPOINTMENT_URL: '/:vetId/appointments',
};

export const clientApi = {
  BASE_URL: baseClientsUrl,
  ROOT_URL: '/',
  IDS_URL: '/:id',
  NESTED_APPOINTMENT_URL: '/:clientId/appointments',
};

export const authApi = {
  BASE_URL: baseAuthUrl,
  LOGIN_URL: `/login`,
  REGISTER_URL: `/register`,
  FORGOT_PASSWORD_URL: `/forgot-password`,
  RESET_PASSWORD_URL: `/reset-password/:token`,
  UPDATE_MY_PASSWORD: `/updateMyPassword`,
};

export const appointmentApi = {
  BASE_URL: baseAppointmentUrl,
  ROOT_URL: '/',
  IDS_URL: '/:id',
};
