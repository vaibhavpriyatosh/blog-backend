import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { getUserById } from './models/user'; // Adjust the path as needed
import logger from './utils/logger';

const secretKey = 'your_secret_key'; // Replace with your actual secret key

interface TokenPayload {
	id: number;
}

export const authentication = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: 'Authorization header is missing' });
	}

	const token = authHeader.split(' ')[1];

	try {
		const decoded = jwt.verify(token, secretKey) as TokenPayload;
		const user = await getUserById({ id: decoded.id });

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		req.user = user; // Attach user to the request object
		next();
	} catch (error) {
		logger.error(
			`auth : middleware : authenticateJWT : ${
				error instanceof Error ? error.message : error
			}`
		);
		return res.status(403).json({ message: 'Forbidden' });
	}
};
