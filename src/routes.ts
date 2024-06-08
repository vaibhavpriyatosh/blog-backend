import express from 'express';
import * as userContoller from './controller/user';
import * as postContoller from './controller/post';
import { authentication } from './middleware';

const router = express.Router();

router.get('/', (_req, res) => res.send('ROAM AROUND'));

router
	.route('/user')
	.post(userContoller.createUser)
	.put(authentication, userContoller.updateUser)
	.get(userContoller.getUser);

router.get('/user/get-by-name', authentication, userContoller.getUserByName);
router.post(
	'/user/follow-list',
	authentication,
	userContoller.createUserFollow
);

router
	.route('/post')
	.post(authentication, postContoller.createPost)
	.put(authentication, postContoller.updatePost);

export default router;
