import { Router } from 'express';
import * as Controller from '../controller/salesman.controller';
import * as AppointmentController from '../controller/appointment.controller';
import { authUser } from '../../config/auth.config';

const router = Router();

router.route("/")
.get(authUser, Controller.getSalesmen)
.post(authUser, Controller.createSalesman)
.delete(authUser, Controller.deleteSalesmen);

router.route("/salesman/:id")
.get(authUser, Controller.getSalesmanByID)
.put(authUser, Controller.updateSalesman)
.delete(authUser, Controller.deleteSalesmanByID);

router.route("/username/:username")
.get(authUser, Controller.getSalesmanByUsername)

router.route("/appointments/:salesmanid")
    .get(authUser, AppointmentController.getAppointments)
    .post(authUser, AppointmentController.postAppointment)
    .delete(authUser, AppointmentController.deleteAppointments);

router.route("/appointments/:salesmanid/:appointmentid")
    .get(authUser, AppointmentController.getAppointment)
    .put(authUser, AppointmentController.putAppointments)
    .delete(authUser, AppointmentController.deleteAppointment);

export default router;