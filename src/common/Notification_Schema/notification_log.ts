import { Schema, model, Document, Types } from "mongoose";

// Define an interface for the schema structure
interface INotificationLog extends Document {
    from: Types.ObjectId;
    to: Types.ObjectId;
    subject?: string;
    body?: string;
    createdAt?: Date; // timestamps will automatically add createdAt
    updatedAt?: Date; // timestamps will automatically add updatedAt
}

// Define the schema
const notificationLogSchema = new Schema<INotificationLog>(
    {
        from: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        to: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        subject: {
            type: String,
        },
        body: {
            type: String,
        },
    },
    {
        timestamps: true, // Automatically manages createdAt and updatedAt
    }
);

// Define indexes
notificationLogSchema.index({ from: 1 });
notificationLogSchema.index({ to: 1 });

// Export the model
export default model<INotificationLog>("NotificationLog", notificationLogSchema);
