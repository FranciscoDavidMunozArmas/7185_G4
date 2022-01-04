import { Schema, model } from "mongoose";
import { User } from "../interface/user.interface";

const schema = new Schema({
    username: {
        type: String,
        unique: true
    },
    password: String,
    role: String
},
{
    timestamps: false,
    versionKey: false
});

export default model<User>('user', schema)