
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import commandLineArgs from 'command-line-args';


// Function to build and copy .env file
export default function buildAndCopyEnv() {
    // Run tsc to compile TypeScript code
    exec('tsc', (error: any) => {
        if (error) {
            console.error(`Error during build: ${error.message}`);
            return;
        }


        console.log('Build successful!');

        const options = commandLineArgs([
            {
                name: 'env',
                alias: 'e',
                defaultValue: 'prod',
                type: String
            }
        ])

        // Define the source and destination paths for the .env file
        const sourcePath = path.resolve(process.cwd(),"common","env", `${String(options.env)}.env`);
        const distPath = path.resolve(process.cwd(), 'dist');


        console.log('Current working directory:', process.cwd());
        console.log(sourcePath);
        console.log("distPath>>>>>>>>>>", distPath);


        // Check if .env file exists
        if (fs.existsSync(sourcePath)) {
            // Copy the .env file to the dist folder

            fs.copyFileSync(sourcePath, distPath);
            console.log('.env file copied to dist folder!');

        } else {
            console.error('.env file does not exist!');
        }
    });
}

buildAndCopyEnv();
