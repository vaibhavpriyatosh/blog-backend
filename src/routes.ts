import express from 'express';
import * as userContoller from './controller/user'

const router = express.Router();

router.get('/', (_req, res) => res.send('ROAM AROUND'));

router.route('/user')
    .post(userContoller.createUser)



export default router;