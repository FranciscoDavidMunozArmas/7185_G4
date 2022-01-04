import { Request, Response } from "express";
import { unlinkAllFiles, unlinkFile } from "../../lib/files";
import { productConverter } from "../interface/product.interface";
import productSchema from "../schemas/product.schema";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const mongoData = await productSchema.find();
        const products = mongoData.map((product) => {
            return productConverter.convertJSON(product);
        });
        return res.status(200).json(products);
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}
export const deleteProducts = async (req: Request, res: Response) => {
    try {
        await unlinkAllFiles("uploads/products");
        await productSchema.deleteMany({});
        return res.status(200).json({ message: "All items have been deleted" });
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const createProduct = async (req: Request, res: Response) => {
    try {
        const data = productConverter.convertJSON(req.body);
        data.image = req.file?.path;
        const product = await productSchema.create(data);
        return res.status(200).json(product);
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mongoData = await productSchema.findById(id);
        if (mongoData) {
            const product = productConverter.convertJSON(mongoData);
            return res.status(200).json(product);
        }
        return res.status(200).json({ message: "Data not found" });
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = productConverter.convertJSON(req.body);
        data._id = id;
        const oldData = await productSchema.findById(id);
        if (oldData) {
            if (oldData.image && req.file) {
                data.image = req.file.path;
                await unlinkFile(oldData.image);
            }
            const product = await productSchema.findByIdAndUpdate(id, data, { new: true });
            return res.status(200).json(product);
        }
        return res.status(200).json({ message: "Data not found" });
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}

export const deleteProductById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const data = await productSchema.findById(id);
        if (data && data.image) {
            await unlinkFile(data.image);
            await productSchema.findByIdAndRemove(id);
            return res.status(200).json({ message: "Data has been deleted" });
        }
        return res.status(200).json({ message: "Data not found" });
    } catch (error: any) {
        return res.status(500).json({ message: "error", error: error });
    }
}