import { Schema, model, Document, Types } from "mongoose";

// Define an interface for the schema structure
interface INotificationTemplate extends Document {
    name: string;
    subject: string;
    action: Types.ObjectId; // References the "NotificationAction" model
    body: string;
    isActive: boolean;
    createdAt?: Date; // Automatically added by timestamps
    updatedAt?: Date; // Automatically added by timestamps
}

// Define the schema
const notificationTemplateSchema = new Schema<INotificationTemplate>(
    {
        name: {
            type: String,
            required: true,
        },
        subject: {
            type: String,
            required: true,
        },
        action: {
            type: Schema.Types.ObjectId,
            ref: "NotificationAction",
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        isActive: {
            type: Boolean,
            default: true,
            required: true,
        },
    },
    {
        timestamps: true, // Automatically manage createdAt and updatedAt fields
    }
);

// Define indexes
notificationTemplateSchema.index({ action: 1 });

// Export the model
export default model<INotificationTemplate>(
    "NotificationTemplate",
    notificationTemplateSchema
);
