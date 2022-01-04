import { Router } from 'express';
import { authUser } from '../../config/auth.config';
import * as Controller from '../controller/warehouse.controller';

const router = Router();

router.route("/")
.get(authUser, Controller.getWarehouses)
.post(authUser, Controller.createWarehouse)
.delete(authUser, Controller.deleteWarehouses);

router.route("/one/:id")
.get(authUser, Controller.getWarehouseByID)
.put(authUser, Controller.updateWarehouse)
.delete(authUser, Controller.deleteWarehouseByID);

router.route("/username/:username")
.get(authUser, Controller.getWarehouseByUsername)

export default router;