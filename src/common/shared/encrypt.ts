import crypto from 'crypto';

// Define your secret key and IV (initialization vector)
const algorithm = 'aes-256-cbc';
const secretKey = crypto.randomBytes(32); // AES-256 requires a 32-byte key
const iv = crypto.randomBytes(16); // AES uses a 16-byte IV

// Function to encrypt text using AES-256
function encrypt(text: string): string {
    const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

// Function to decrypt text using AES-256
function decrypt(encryptedText: string): string {
    const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}


export default {
    encrypt,
    decrypt
}