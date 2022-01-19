import { Router } from 'express';
import { authUser } from '../../config/auth.config';
import * as UserController from '../controller/user.controller';

const router = Router();

router.route("/")
    .get(authUser, UserController.getUsers)
    .delete(authUser, UserController.deleteUsers);

router.route("/signin")
    .post(UserController.signin);

router.route("/password/:username")
    .put(UserController.updatePassword);

router.route("/username/:username")
    .get(UserController.getUserByUsername);

router.route("/user/:id")
    .get(authUser, UserController.getUserById)
    .delete(authUser, UserController.deleteUserById);

export default router;