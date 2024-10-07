"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __importDefault(require("crypto"));
// Define your secret key and IV (initialization vector)
const algorithm = 'aes-256-cbc';
const secretKey = crypto_1.default.randomBytes(32); // AES-256 requires a 32-byte key
const iv = crypto_1.default.randomBytes(16); // AES uses a 16-byte IV
// Function to encrypt text using AES-256
function encrypt(text) {
    const cipher = crypto_1.default.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}
// Function to decrypt text using AES-256
function decrypt(encryptedText) {
    const decipher = crypto_1.default.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}
exports.default = {
    encrypt,
    decrypt
};
