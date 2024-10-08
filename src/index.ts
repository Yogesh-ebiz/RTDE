// monogo connect
// aes256 enception with node js
// encription decrytion -> one decrypt func and 2 encrypt func


import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import 'mongoose';
import "./common/env"
import "./common/database/db"
import "./build"

dotenv.config();

const app = express();
const port: number = parseInt(process.env.PORT || '8000');


// Middleware setup
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

export default app;
