import { hashSync, compare } from "bcrypt";

export function hashPassword(password: string) {
  const hashSaltRounds = 10;
  return hashSync(password, hashSaltRounds);
}

export function comparePassword(password: string, hashPassword: string) {
  return compare(password, hashPassword);
}

const hash1 = hashPassword("123");
const hash2 = hashPassword("123");

async function run() {
  console.log(await comparePassword("1234", hash1));
  console.log(await comparePassword("123", hash2));
}

run();
