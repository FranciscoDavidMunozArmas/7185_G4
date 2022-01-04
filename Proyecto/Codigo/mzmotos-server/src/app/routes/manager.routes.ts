import { Router } from 'express';
import { authUser } from '../../config/auth.config';
import * as Controller from '../controller/manager.controller';

const router = Router();

router.route("/")
.get(authUser, Controller.getManagers)
.post(Controller.createManager)
.delete(authUser, Controller.deleteManagers);

router.route("/one/:id")
.get(authUser, Controller.getManagerByID)
.put(authUser, Controller.updateManager)
.delete(authUser, Controller.deleteManagerByID);

router.route("/username/:username")
.get(authUser, Controller.getManagerByUsername)

export default router;