import { returnById } from './interface';
declare global {
	namespace Express {
		interface Request {
			user: returnById;
		}
	}
}
