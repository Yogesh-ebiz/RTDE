"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const command_line_args_1 = __importDefault(require("command-line-args"));
const path_1 = __importDefault(require("path"));
// ********* SETUP COMMAND LINE ARGS 
const options = (0, command_line_args_1.default)([
    {
        name: 'env',
        alias: 'e',
        defaultValue: 'dev',
        type: String
    }
]);
// ********* SETUP THE ENV 
const configResult = dotenv_1.default.config({
    path: path_1.default.join(__dirname, `${String(options.env)}.env`)
});
if (configResult.error)
    throw configResult.error;
