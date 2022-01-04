import { Router } from 'express';
import { authUser } from '../../config/auth.config';
import * as Controller from '../controller/report.controller';

const router = Router();

router.route("/orders")
.get(authUser, Controller.getReportOrders)
.post(authUser, Controller.createReportOrder)

router.route("/orders/order/:id")
.get(authUser, Controller.getReportOrderById)
.put(authUser, Controller.updateReportOrderById);

router.route("/inventories")
.get(authUser, Controller.getReportInventories)
.post(authUser, Controller.createReportInventory)

router.route("/inventories/inventory/:id")
.get(authUser, Controller.getReportInventoryById)
.put(authUser, Controller.updateReportInventoryById);

export default router;