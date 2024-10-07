import { Schema, model, Document } from "mongoose";

// Define an interface for the schema structure
interface INotificationAction extends Document {
    action: string;
    constants: any[]; // You can refine this if you know the specific type
    isActive: boolean;
    createdAt?: Date; // timestamps will automatically add createdAt
    updatedAt?: Date; // timestamps will automatically add updatedAt
}

// Define the schema
const notificationActionSchema = new Schema<INotificationAction>(
    {
        action: {
            type: String,
            required: true,
        },
        constants: {
            type: [{ type: Schema.Types.Mixed }], // Use Schema.Types.Mixed for array with unknown types
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
            required: true,
        },
    },
    {
        timestamps: true, // This will automatically create `createdAt` and `updatedAt` fields
    }
);

// Export the model
export default model<INotificationAction>("NotificationAction", notificationActionSchema);
