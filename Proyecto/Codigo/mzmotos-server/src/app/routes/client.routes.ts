import { Router } from 'express';
import * as Controller from '../controller/client.controller';

const router = Router();

router.route("/")
.get(Controller.getClients)
.post(Controller.createClient)
.delete(Controller.deleteClients);

router.route("/client/:id")
.get(Controller.getClientByID)
.put(Controller.updateClient)
.delete(Controller.deleteClientByID);

router.route("/many")
.post(Controller.getManyClients)

export default router;