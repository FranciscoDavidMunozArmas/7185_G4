import { Request, Response } from 'express';
import constants from '../../lib/constants';
import { managerConverter } from '../interface/manager.interface';
import { userConverter } from '../interface/user.interface';
import managerSchema from '../schemas/manager.schema';
import userSchema from '../schemas/user.schema';
import { createUser, deleteUser } from './user.controller';

const ROLE_MANAGER = constants.ROLES[0];

export const getManagers = async (req: Request, res: Response) => {
    try {
        const mongoData = await managerSchema.find();
        const managers = mongoData.map(element => managerConverter.convertJSON(element));
        return res.status(200).json(managers);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const createManager = async (req: Request, res: Response) => {
    try {
        const data = userConverter.convertJSON(req.body)
        const userId = await createUser(data.username, data.password, ROLE_MANAGER);
        if (userId) {
            const manager = managerConverter.convertJSON(req.body);
            manager.userid = userId;
            const mongoData = await managerSchema.create(manager);
            return res.status(200).json(managerConverter.convertJSON(mongoData));
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

export const deleteManagers = async (req: Request, res: Response) => {
    try {
        const mongoData = await managerSchema.find();
        mongoData.forEach(async element => {
            await deleteUser(element.userid);
        });
        await managerSchema.deleteMany({});
        return res.status(200).json({
            message: "Managers deleted"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getManagerByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mongoData = await managerSchema.findById(id);
        const manager = managerConverter.convertJSON(mongoData);
        return res.status(200).json(manager);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const updateManager = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = await managerSchema.findById(id);
        if (data) {
            const warehouse = managerConverter.convertJSON(req.body);
            warehouse._id = id;
            warehouse.userid = data.userid;
            const mongoData = await managerSchema.findByIdAndUpdate(id, warehouse, { new: true });
            if (mongoData) {
                return res.status(200).json(managerConverter.convertJSON(mongoData));
            }
        }
        return res.status(400).json({
            message: "Manager not updated"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteManagerByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mongoData = await managerSchema.findById(id);
        const warehouse = managerConverter.convertJSON(mongoData);
        const data = await deleteUser(warehouse.userid);
        if (data) {
            await managerSchema.findByIdAndDelete(id);
            return res.status(200).json({
                message: "Warehouse deleted"
            });
        }
        return res.status(400).json({
            message: "Manager not deleted"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getManagerByUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.params;
        const userData = await userSchema.findOne({ username: username });
        if (userData) {
            const mongoData = await managerSchema.findOne({ userid: userData._id });
            if (mongoData) {
                const warehouse = managerConverter.convertJSON(mongoData);
                return res.status(200).json(warehouse);
            }
        }
        return res.status(400).json({
            message: "Manager not found"
        });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

