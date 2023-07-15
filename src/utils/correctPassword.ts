import bcrypt from 'bcrypt';

export const correctPassword = async function (candidatePass: string, userPass: string) {
  return await bcrypt.compare(candidatePass, userPass);
};
