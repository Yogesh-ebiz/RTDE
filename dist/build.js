"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = buildAndCopyEnv;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const command_line_args_1 = __importDefault(require("command-line-args"));
// Function to build and copy .env file
function buildAndCopyEnv() {
    // Run tsc to compile TypeScript code
    (0, child_process_1.exec)('tsc', (error) => {
        if (error) {
            console.error(`Error during build: ${error.message}`);
            return;
        }
        console.log('Build successful!');
        const options = (0, command_line_args_1.default)([
            {
                name: 'env',
                alias: 'e',
                defaultValue: 'prod',
                type: String
            }
        ]);
        // Define the source and destination paths for the .env file
        const sourcePath = path_1.default.resolve(process.cwd(), "common", "env", `${String(options.env)}.env`);
        const distPath = path_1.default.resolve(process.cwd(), 'dist');
        console.log('Current working directory:', process.cwd());
        console.log(sourcePath);
        console.log("distPath>>>>>>>>>>", distPath);
        // Check if .env file exists
        if (fs_1.default.existsSync(sourcePath)) {
            // Copy the .env file to the dist folder
            fs_1.default.copyFileSync(sourcePath, distPath);
            console.log('.env file copied to dist folder!');
        }
        else {
            console.error('.env file does not exist!');
        }
    });
}
buildAndCopyEnv();
