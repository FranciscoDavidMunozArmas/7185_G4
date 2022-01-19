import { Request, Response } from 'express';
import userSchema from '../schemas/user.schema';
import bcryptjs from 'bcryptjs';
import { userConverter } from '../interface/user.interface';
import { tokenize } from '../../lib/token';
import managerSchema from '../schemas/manager.schema';
import salesmanSchema from '../schemas/salesman.schema';
import warehouseSchema from '../schemas/warehouse.schema';

const saltRounds = 10;

export const createUser = async (username: string, password: string, role: string) => {
    try {
        const data = userConverter.convertJSON({
            username,
            password: bcryptjs.hashSync(password, saltRounds),
            role
        })
        const mongoData = await userSchema.create(data);
        const user = userConverter.convertJSON(mongoData);
        return user._id;
    } catch (error: any) {
        console.log(error.message);
        return null;
    }
}

export const updateUser = async (_id: string, username: string, password: string, role: string) => {
    try {
        const data = {
            username,
            password: bcryptjs.hashSync(password, saltRounds),
            role
        }
        const mongoData = await userSchema.findByIdAndUpdate(_id, data, { new: true });
        const user = userConverter.convertJSON(mongoData);
        return user._id;
    } catch (error: any) {
        console.log(error.message);
        return null;
    }
}

export const deleteUser = async (id: string) => {
    try {
        await userSchema.findByIdAndDelete(id);
        return true;
    } catch (error: any) {
        console.log(error.message);
        return false;
    }
}

export const getUsers = async (req: Request, res: Response) => {
    try {
        const mongoData: any[] = await userSchema.find();
        const users: any[] = mongoData.map((data: any) => userConverter.convertJSON(data));
        return res.status(200).json(users);
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}
export const deleteUsers = async (req: Request, res: Response) => {
    try {
        const response = await userSchema.deleteMany({});
        if (response) {
            return res.status(200).json({ message: "All users have been deleted" });
        }
        return res.status(200).json({ message: "Something went wrong" });
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mongoData = await userSchema.findById(id);
        const user = userConverter.convertJSON(mongoData);
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const deleteUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mongoData = await userSchema.findByIdAndDelete(id);
        const user = userConverter.convertJSON(mongoData);
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const signin = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        let result: boolean = false;
        let token: any = {};
        const user = await userSchema.findOne({ username });
        if (user) {
            result = bcryptjs.compareSync(password, user?.password as string);
            if (result) {
                if (user.role === "admin") {
                    const data = await managerSchema.findOne({ userid: user._id });
                    if (data) {
                        token = { token: user._id, user: data._id, role: user.role };
                        return res.status(200).json(tokenize(token));
                    }
                } else if (user.role === "salesman") {
                    const data = await salesmanSchema.findOne({ userid: user._id });
                    if (data) {
                        token = { token: user._id, user: data._id, role: user.role };
                        return res.status(200).json(tokenize(token));
                    }
                } else if (user.role === "warehouse") {
                    const data = await warehouseSchema.findOne({ userid: user._id });
                    if (data) {
                        token = { token: user._id, user: data._id, role: user.role };
                        return res.status(200).json(tokenize(token));
                    }
                }
            }
        }
        return res.status(200).json(null);
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const updatePassword = async (req: Request, res: Response) => {
    try {
        const { username } = req.params
        const data = userConverter.convertJSON(req.body);
        const mongoData = await userSchema.findOne({ username: username });
        if (mongoData) {
            if (mongoData._id) {
                const userID = await updateUser(mongoData._id, data.username, data.password, mongoData.role);
                if (userID) {
                    return res.status(200).json({ message: "Password has been updated" });
                }
            }
        }
        return res.status(200).json({ message: "Item not found" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getUserByUsername = async (req: Request, res: Response) => {
    try {
        const { username } = req.params
        const mongoData = await userSchema.findOne({ username: username });
        if (mongoData) {
            if (mongoData._id) {
                const user = userConverter.convertJSON(mongoData);
                return res.status(200).json(user);
            }
        }
        return res.status(200).json({ message: "Item not found" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}