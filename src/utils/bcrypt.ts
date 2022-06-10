import * as bcrypt from 'bcrypt';

const SALT = 10;

export async function encodePassword(rawPassword: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(rawPassword, SALT);
  return hashedPassword;
}

export function comparePasswords(
  rawPassword: string,
  hash: string,
): Promise<boolean> {
  console.log(rawPassword, hash);
  return bcrypt.compare(rawPassword, hash);
}
