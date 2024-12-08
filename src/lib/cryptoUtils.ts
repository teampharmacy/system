import bcrypt from "bcryptjs";

/**
 * Verify if the provided password matches the hashed password.
 * @param password - The plain text password provided by the user.
 * @param hashedPassword - The hashed password stored in the database.
 * @returns boolean - Returns true if the passwords match, otherwise false.
 */
export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
}
