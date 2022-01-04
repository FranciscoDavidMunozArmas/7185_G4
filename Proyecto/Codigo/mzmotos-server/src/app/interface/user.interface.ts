import { Document } from "mongoose"

export interface User extends Document{
    _id?: string,
    username: string,
    password: string,
    role: string
}

export const userConverter = {
    convertJSON: (json: any) => {
        return {
            _id: json._id,
            username: json.username,
            password: json.password,
            role: json.role
        }
    }
}