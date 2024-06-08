import express from 'express';
import * as userContoller from './controller/user';
import * as postContoller from './controller/post';
import { authentication } from './middleware';

const router = express.Router();

router.get('/', (_req, res) => res.send('ROAM AROUND'));

router.route('/user').post(userContoller.createUser).get(userContoller.getUser);

router.route('/post').post(authentication, postContoller.createPost);

export default router;
