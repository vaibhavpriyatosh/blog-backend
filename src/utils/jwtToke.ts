import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY ?? 'secret_key';

export const generateToken = (
	payload: object,
	expiresIn: string | number = '1h'
): string => {
	return jwt.sign(payload, secretKey, { expiresIn });
};

export const verifyToken = (token: string): object | string => {
	try {
		return jwt.verify(token, secretKey);
	} catch (err) {
		throw new Error('Invalid token');
	}
};
