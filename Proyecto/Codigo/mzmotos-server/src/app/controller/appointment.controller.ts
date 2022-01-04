import { Request, Response } from "express";
import { appointmentConverter } from "../interface/appointment.interface";
import { salesmanConverter } from "../interface/salesman.interface";
import salesmanSchema from "../schemas/salesman.schema";

export const getAppointments = async (req: Request, res: Response) => {
    try {
        const { salesmanid } = req.params;
        const mongoData = await salesmanSchema.findById(salesmanid);
        const appointments = salesmanConverter.convertJSON(mongoData)
            .appointments.map((appointment: any) => appointmentConverter.convertJSON(appointment));
        return res.status(200).json(appointments);
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const postAppointment = async (req: Request, res: Response) => {
    try {
        const { salesmanid } = req.params;
        const appointment = appointmentConverter.convertJSON(req.body);
        console.log(appointment.date);
        appointment.state = false;
        const updateSalesman = await salesmanSchema.findByIdAndUpdate(salesmanid, {
            $push: {
                appointments: [appointment]
            }
        }, { new: true });
        return res.status(200).json(updateSalesman);
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const deleteAppointments = async (req: Request, res: Response) => {
    try {
        const { salesmanid } = req.params;
        const salesman = await salesmanSchema.findByIdAndUpdate(salesmanid, { $pull: { appointments: {} } }, { new: true });
        return res.status(200).json(salesman?.appointments);
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const getAppointment = async (req: Request, res: Response) => {
    try {
        const { salesmanid, appointmentid } = req.params;
        const salesman = await salesmanSchema.findById(salesmanid);
        if (salesman) {
            const appointment = salesman.appointments.find((element: any) => {
                if(element._id == appointmentid) return appointmentConverter.convertJSON(element);
            });
            return res.status(200).json(appointment);
        }
        return res.status(200).json({ message: "Data not found" });
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const putAppointments = async (req: Request, res: Response) => {
    try {
        const { salesmanid, appointmentid } = req.params;
        const appointment = appointmentConverter.convertJSON(req.body);
        const salesman = await salesmanSchema.findOneAndUpdate(
            { _id: salesmanid, "appointments._id": appointmentid },
            { $set: { "appointments.$": appointment } },
            { new: true });
        return res.status(200).json(salesman?.appointments);
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const deleteAppointment = async (req: Request, res: Response) => {
    try {
        const { salesmanid, appointmentid } = req.params;
        await salesmanSchema.findOneAndUpdate(
            { _id: salesmanid },
            { $pull: { appointments: { _id: appointmentid } } },
            { new: true });
        return res.status(200).json({ message: "Appointment deleted" });
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}