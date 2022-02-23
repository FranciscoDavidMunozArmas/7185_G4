import { Router } from 'express';
import * as Controller from '../controller/client.controller';

const router = Router();

router.route("/sms").post(Controller.sendsms);
router.route("/email").post(Controller.sendemail);

export default router;

