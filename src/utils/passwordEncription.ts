import bcrypt from 'bcrypt';
import { fromByteArray, toByteArray } from 'base64-js';

const saltRounds = 10;

export const hashPassword = async (password: string): Promise<string> => {
	const hashedPassword = await bcrypt.hash(password, saltRounds);
	const base64EncodedHash = fromByteArray(Buffer.from(hashedPassword));
	return base64EncodedHash;
};

export const verifyPassword = async (
	password: string,
	base64EncodedHash: string
): Promise<boolean> => {
	const decodedHash = Buffer.from(toByteArray(base64EncodedHash)).toString();
	const match = await bcrypt.compare(password, decodedHash);
	return match;
};
