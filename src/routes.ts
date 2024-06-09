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

router.put('/user/like-view', authentication, userContoller.updateLikeView);

//get user list to follow and search
//change like to view

//see if time optimise view count by maintaining user to post mapping

router
	.route('/post')
	.post(authentication, postContoller.createPost)
	.get(authentication, postContoller.getPost)
	.put(authentication, postContoller.updatePost);
router.delete('/post/:id', authentication, postContoller.deletePost);

export default router;
