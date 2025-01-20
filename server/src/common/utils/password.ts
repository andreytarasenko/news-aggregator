import { hash, compare, genSalt } from 'bcrypt';

export const hashPassword = async (password: string) => {
  const salt = await genSalt(10);
  return hash(password, salt);
};

export const comparePasswords = async (
  password: string,
  hashedPassword: string,
) => {
  return compare(password, hashedPassword);
};
