import "dotenv/config";

export const PORT = 5556;

export const mongoDBURL = process.env.mongoDBURL;

export const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";
