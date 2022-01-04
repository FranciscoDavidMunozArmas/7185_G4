import { Request, Response } from 'express';
import { orderConverter } from '../interface/order.interface';
import orderSchema from '../schemas/order.schema';

export const getOrders = async (req: Request, res: Response) => {
    try {
        const mongoData = await orderSchema.find({});
        const orders = mongoData.map(orderConverter.convertJSON);
        return res.status(200).json(orders);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const createOrder = async (req: Request, res: Response) => {
    try {
        const data = orderConverter.convertJSON(req.body);
        data.date = new Date();
        data.total = data.list
            .map((item: any) => {
                return item.product.price * item.quantity;
            })
            .reduce((acc: any, curr: any) => acc + curr, 0);
        const mongoData = await orderSchema.create(data);
        if (mongoData) {
            return res.status(200).json(mongoData);
        }
        return res.status(400).json({
            message: "Order not created"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteOrders = async (req: Request, res: Response) => {
    try {
        await orderSchema.deleteMany({});
        return res.status(200).json({
            message: "Orders deleted"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getOrderById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mongoData = await orderSchema.findById(id);
        if (mongoData) {
            return res.status(200).json(orderConverter.convertJSON(mongoData));
        }
        return res.status(400).json({
            message: "Order not found"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const updateOrder = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = orderConverter.convertJSON(req.body);
        const mongoData = await orderSchema.findById(id);
        if (mongoData) {
            data._id = id;
            data.orderId = mongoData.orderId;
            data.total = data.list
                .map((item: any) => {
                    return item.product.price * item.quantity;
                })
                .reduce((acc: any, curr: any) => acc + curr, 0);
            const oldData = await orderSchema.findByIdAndUpdate(id, data, { new: true });
            if (oldData) {
                return res.status(200).json(orderConverter.convertJSON(oldData));
            }
        }
        return res.status(400).json({
            message: "Order not found"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteOrdersById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mongoData = await orderSchema.findByIdAndDelete(id);
        if (mongoData) {
            return res.status(200).json({
                message: "Order deleted"
            });
        }
        return res.status(400).json({
            message: "Order not found"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getOrdersBySalesman = async (req: Request, res: Response) => {
    try {
        const { salesman } = req.params;
        const mongoData = await orderSchema.find({ salesman });
        const salesmen = mongoData.map(orderConverter.convertJSON);
        return res.status(200).json(salesmen);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteOrdersBySalesman = async (req: Request, res: Response) => {
    try {
        const { salesman } = req.params;
        await orderSchema.deleteMany({ salesman });
        return res.status(200).json({
            message: "Orders deleted"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}



