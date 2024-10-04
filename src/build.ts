
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import commandLineArgs from 'command-line-args';


export default function buildAndCopyEnv() {
    exec('tsc', (error: any) => {
        if (error) {
            console.error(`Error during build: ${error.message}`);
            return;
        }


        console.log('Build successfull!');

        const options = commandLineArgs([
            {
                name: 'env',
                alias: 'e',
                defaultValue: 'prod',
                type: String
            }
        ])

        const sourcePath = path.resolve(process.cwd(),"common","env", `${String(options.env)}.env`);
        const distPath = path.resolve(process.cwd(), 'dist');

        console.log(sourcePath);

        if (fs.existsSync(sourcePath)) {
            fs.copyFileSync(sourcePath, distPath);
            console.log('.env file copied to dist folder!');
        } else {
            console.error('.env file does not exist!');
        }
    });
}

buildAndCopyEnv();
