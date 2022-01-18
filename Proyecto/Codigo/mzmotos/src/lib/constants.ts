// import * as dotenv from "dotenv";

// dotenv.config();

export const CONSTANTS = {
    API_URL: "http://localhost:3000",
    SECRET_KEY: "secretKey",
    DATE_FORMAT: "YYYY-MM-DDTHH:MM",
    ROLES: ["admin", "salesman", "warehouse"],
};

export const passwordGenerator = (length: number) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRTSUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
};
