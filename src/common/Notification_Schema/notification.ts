import mongoose, { Document, Schema } from "mongoose";

// Define an interface representing a document in MongoDB
interface INotification extends Document {
    _doc: any;
    userId: mongoose.Types.ObjectId;
    title: string;
    body: string;
    type: 'promotions' | 'Discount' | 'Booking confirmation' | 'Reminder' | 'Weather' | "Travel safty" | "Event" | "Festival"
    circleId: mongoose.Types.ObjectId;
    extras?: Record<string, any>;
    isRead: boolean;
    isAdmin: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    postTime?: string;
}

const NotificationSchema: Schema<INotification> = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: ["promotions", "Discount", "Booking confirmation", "Reminder", "Weather", "Travel safty", "Event", "Festival"],
            required: true
        },
        circleId: {
            type: Schema.Types.ObjectId,
            ref: "Circles",
            required: true,
        },
        extras: {
            type: Object,
            default: {}
        },
        isRead: {
            type: Boolean,
            required: true,
            default: false,
        },
        isAdmin: {
            type: Boolean,
            required: true,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

// Create an index for userId
NotificationSchema.index(
    { userId: 1 }
);

// Post middleware to format the creation date in a custom format
NotificationSchema.post<INotification>("find", formatPostTime);
NotificationSchema.post<INotification>("findOne", formatPostTime);

// Post
function formatPostTime(
    docs: INotification | INotification[],
    next: () => void
) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    if (Array.isArray(docs)) {
        docs.forEach((doc) => {
            const date = new Date(doc.createdAt || '');
            let hours = date.getHours();
            let minutes: string = date.getMinutes().toString();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours || 12;
            minutes = minutes.length < 2 ? '0' + minutes : minutes;

            const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}, ${hours}:${minutes} ${ampm}`;
            if (doc._doc) {
                doc._doc.postTime = formattedDate;
            } else {
                doc.postTime = formattedDate;
            }
        });
    } else {
        const date = new Date(docs.createdAt || '');
        let hours = date.getHours();
        let minutes: string = date.getMinutes().toString();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours || 12;
        minutes = minutes.length < 2 ? '0' + minutes : minutes;

        const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}, ${hours}:${minutes} ${ampm}`;
        docs.postTime = formattedDate;
    }

    next();
}


// Export the model
const Notification = mongoose.model<INotification>("Notification", NotificationSchema);

export default Notification;
