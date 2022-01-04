import { Request, Response } from 'express';
import constants from '../../lib/constants';
import { userConverter } from '../interface/user.interface';
import { warehouseConverter } from '../interface/warehouse.interface';
import userSchema from '../schemas/user.schema';
import warehouseSchema from '../schemas/warehouse.schema';
import { createUser, deleteUser } from './user.controller';

const ROLE_WAREHOUSE = constants.ROLES[2];

export const getWarehouses = async (req: Request, res: Response) => {
    try {
        const mongoData = await warehouseSchema.find();
        const warehouses = mongoData.map(element => warehouseConverter.convertJSON(element));
        return res.status(200).json(warehouses);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const createWarehouse = async (req: Request, res: Response) => {
    try {
        const data = userConverter.convertJSON(req.body)
        const userId = await createUser(data.username, data.password, ROLE_WAREHOUSE);
        if (userId) {
            const warehouse = warehouseConverter.convertJSON(req.body);
            warehouse.userid = userId;
            const mongoData = await warehouseSchema.create(warehouse);
            return res.status(200).json(warehouseConverter.convertJSON(mongoData));
        }
        return res.status(400).json({
            message: "User not created"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteWarehouses = async (req: Request, res: Response) => {
    try {
        const mongoData = await warehouseSchema.find();
        mongoData.forEach(async element => {
            await deleteUser(element.userid);
        });
        await warehouseSchema.deleteMany({});
        return res.status(200).json({
            message: "Warehouses deleted"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getWarehouseByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mongoData = await warehouseSchema.findById(id);
        const warehouse = warehouseConverter.convertJSON(mongoData);
        return res.status(200).json(warehouse);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const updateWarehouse = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = await warehouseSchema.findById(id);
        if (data) {
            const warehouse = warehouseConverter.convertJSON(req.body);
            warehouse._id = id;
            warehouse.userid = data.userid;
            const mongoData = await warehouseSchema.findByIdAndUpdate(id, warehouse, { new: true });
            if (mongoData) {
                return res.status(200).json(warehouseConverter.convertJSON(mongoData));
            }
        }
        return res.status(400).json({
            message: "Warehouse not updated"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteWarehouseByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mongoData = await warehouseSchema.findById(id);
        const warehouse = warehouseConverter.convertJSON(mongoData);
        const data = await deleteUser(warehouse.userid);
        if (data) {
            await warehouseSchema.findByIdAndDelete(id);
            return res.status(200).json({
                message: "Warehouse deleted"
            });
        }
        return res.status(400).json({
            message: "Warehouse not deleted"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getWarehouseByUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const userData = await userSchema.findOne({ username: username });
        if (userData) {
            const mongoData = await warehouseSchema.findOne({ userid: userData._id });
            if (mongoData) {
                const warehouse = warehouseConverter.convertJSON(mongoData);
                return res.status(200).json(warehouse);
            }
        }
        return res.status(400).json({
            message: "Warehouse not found"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

