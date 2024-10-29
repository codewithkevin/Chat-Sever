import { Schema, model } from "mongoose";

const rateLimitSchema = new Schema({
    userId: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    count: { type: Number, default: 1 },
});

export const RateLimit = model("RateLimit", rateLimitSchema);