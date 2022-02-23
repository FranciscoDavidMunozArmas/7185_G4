import * as nodemailer from "nodemailer";
import { Request, Response } from 'express';
import { clientConverter } from '../interface/client.interface';
import clientSchema from '../schemas/client.schema';
import { Twilio } from "twilio";
import { twilioConsts } from "../../lib/constants";

export const getClients = async (req: Request, res: Response) => {
    try {
        const mongoData: any[] = await clientSchema.find();
        const clients: any[] = mongoData.map((client: any) => {
            return clientConverter.convertJSON(client);
        });
        return res.status(200).json(clients);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const createClient = async (req: Request, res: Response) => {
    try {
        const client: any = clientConverter.convertJSON(req.body);
        console.log(req.body);
        const mongoData: any = await clientSchema.create(client);
        return res.status(200).json(mongoData);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteClients = async (req: Request, res: Response) => {
    try {
        await clientSchema.deleteMany({});
        return res.status(200).json({ message: "All items have been delete" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getClientByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const mongoData = await clientSchema.findById(id);
        if (mongoData) {
            const client: any = clientConverter.convertJSON(mongoData);
            return res.status(200).json(client);
        }
        return res.status(200).json({ message: "Item not found" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const updateClient = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const client: any = clientConverter.convertJSON(req.body);
        client._id = id;
        const mongoData = await clientSchema.findByIdAndUpdate(id, client, { new: true });
        if (mongoData) {
            return res.status(200).json(mongoData);
        }
        return res.status(200).json({ message: "Item not found" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const deleteClientByID = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const client = await clientSchema.findByIdAndDelete(id)
        if (client) {
            return res.status(200).json(client);
        }
        return res.status(200).json({ message: "Item not found" });
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const getManyClients = async (req: Request, res: Response) => {
    try {
        const { many }: any = req.body;
        const mongoData = await clientSchema.find();
        if (mongoData) {
            const clients: any[] = [];
            mongoData.forEach(mongoElement => {
                many.forEach((element: any) => {
                    if (mongoElement._id?.toString() === element.toString()) {
                        clients.push(clientConverter.convertJSON(mongoElement));
                    }
                });
            })
            return res.status(200).json(clients);
        }
        return res.status(200).json([]);
    } catch (error: any) {
        return res.status(500).json({
            message: "Error",
            error: error.message
        });
    }
}

export const sendsms = async (req: Request, res: Response) => {
    const client = new Twilio(twilioConsts.TWILIO_ACCOUNT_SID as string, twilioConsts.TWILIO_AUTH_TOKEN as string);
    client.messages
        .create({
            from: twilioConsts.TWILIO_PHONE_NUMBER,
            to: req.body.phone,
            body: req.body.message,
        })
        .then((message) => console.log(message.sid));
    console.log("Hello world");
    return res.status(200);
}

export const sendemail = async (req: Request, res: Response) => {
    let mailOptions = {
        from: "portalband@band.com.br",
        to: req.body.email,
        subject: req.body.subject,
        html: req.body.message
    };

    const transporter = nodemailer.createTransport({
        host: "",
        port: 587,
        secure: false,
        auth:{
            user: "",
            pass: ""
        },
        tls: {rejectUnauthorized: false}
    })

    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return error;
        }else{
            return "Email enviado exitosamente";
        }
    })
}

