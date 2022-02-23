import dotenv from 'dotenv';
import { constants } from 'fs-extra';

dotenv.config();

export default {
    MONGO_USER: process.env.MONGO_USER,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD,
    MONGO_HOST: process.env.MONGO_HOST,
    MONGO_NAME: process.env.MONGO_NAME,
    PORT: process.env.PORT || 3000,
    SECRET_KEY: process.env.SECRET_KEY,
    ROLES: ['admin', 'salesman', 'warehouse'],
    UID_LENGTH: 10
}

export const twilioConsts = {
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_PHONE_NUMBER: process.env.TWILIO_PHONE_NUMBER
}