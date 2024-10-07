"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const DB_URL = process.env.DB_URL || '';
mongoose_1.default.set('strictQuery', false);
mongoose_1.default.connect(DB_URL, {
// useNewUrlParser: true,
// useUnifiedTopology: true
})
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log(err));
// mongoose.connection.on("disconnect", () => {
//     console.log("MongoDB disconnected");
// });
