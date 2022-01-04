import { Request, Response } from 'express';
import { orderConverter } from '../interface/order.interface';
import { reportInventoryConverter } from '../interface/reportInventory.interface';
import { reportOrderConverter } from '../interface/reportOrder.interface';
import orderSchema from '../schemas/order.schema';
import reportInventorySchema from '../schemas/reportInventory.schema';
import reportOrderSchema from '../schemas/reportOrder.schema';

export const getReportOrders = async (req: Request, res: Response) => {
    try {
        const reportData = await reportOrderSchema.find({});
        const orderData = await orderSchema.find({});
        const data: any[] = [];
        reportData.forEach((reportOrder) => {
            orderData.forEach((order) => {
                if (reportOrder.orderId === order.orderId) {
                    data.push(reportOrderConverter.joinReportOrder(reportOrder, order));
                }
            });
        });
        return res.status(200).json(data);
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const createReportOrder = async (req: Request, res: Response) => {
    try {
        const data: any = reportOrderConverter.convertJSON(req.body);
        data.date = new Date();
        const mongoData = await reportOrderSchema.create(data);
        return res.status(200).json(mongoData);
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const getReportOrderById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const reportData = await reportOrderSchema.findById(id);
        if (!reportData) {
            return res.status(404).json({ message: "not found" });
        }
        const orderData = await orderSchema.findOne({ orderId: reportData.orderId });
        if (!orderData) {
            return res.status(404).json({ message: "not found" });
        }
        return res.status(200).json(reportOrderConverter.joinReportOrder(reportData, orderData));
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const updateReportOrderById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const oldData = await reportOrderSchema.findById(id);
        if (!oldData) {
            return res.status(404).json({ message: "not found" });
        }
        const data = reportOrderConverter.convertJSON(req.body);
        data._id = id;
        data.reportid = oldData.reportid;
        data.date = oldData.date;
        const mongoData = await reportOrderSchema.findByIdAndUpdate(id, data, { new: true });
        return res.status(200).json(mongoData);
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const getReportInventories = async (req: Request, res: Response) => {
    try {
        const mongoData = await reportInventorySchema.find({});
        const data = mongoData.map(reportInventoryConverter.convertJSON);
        return res.status(200).json(data);
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const createReportInventory = async (req: Request, res: Response) => {
    try {
        const data = reportInventoryConverter.convertJSON(req.body);
        data.date = new Date();
        const mongoData = await reportInventorySchema.create(data);
        return res.status(200).json(mongoData);
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const getReportInventoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mongoData = await reportInventorySchema.findById(id);
        if (!mongoData) {
            return res.status(404).json({ message: "not found" });
        }
        return res.status(200).json(mongoData);
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const updateReportInventoryById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const oldData = await reportInventorySchema.findById(id);
        if (!oldData) {
            return res.status(404).json({ message: "not found" });
        }
        const data = reportInventoryConverter.convertJSON(req.body);
        data._id = id;
        data.reportid = oldData.reportid;
        data.date = oldData.date;
        const mongoData = await reportInventorySchema.findByIdAndUpdate(id, data, { new: true });
        return res.status(200).json(mongoData);
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}