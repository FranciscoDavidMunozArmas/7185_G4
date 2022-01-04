import { Router } from 'express';
import * as Controller from '../controller/order.controller';
import { authUser } from '../../config/auth.config';

const router = Router();

router.route("/")
.get(authUser, Controller.getOrders)
.post(authUser, Controller.createOrder)
.delete(authUser, Controller.deleteOrders);

router.route("/order/:id")
.get(authUser, Controller.getOrderById)
.put(authUser, Controller.updateOrder)
.delete(authUser, Controller.deleteOrdersById);

router.route("/salesman/:salesman")
.get(authUser, Controller.getOrdersBySalesman)
.delete(authUser, Controller.deleteOrdersBySalesman);

export default router;