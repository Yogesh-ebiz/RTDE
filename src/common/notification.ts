
import AWS from 'aws-sdk'
import { Types } from 'mongoose'
import dotenv from "dotenv";
dotenv.config()


interface INotification {
    type: string;
    userId: string;
    sendNotification(): Promise<void>;
    sendPushNotification(): void;
}

export default class Notification implements INotification {
    constructor(type: string, userId: string) {
        this.type = type
        this.userId = userId

        // Configure AWS SDK
        AWS.config.update({
            region: 'us-east-1',
            accessKeyId: process.env.AWS_ACCESS_KEY_ID,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });
    }

    type: string
    userId: string

    getTemplate(type: any) {
        switch (type) {
            case 'newUser':
                return 'newUser'
            case 'newMessage':
                return 'newMessage'
        }
    }

    async sendNotification() {
        const sns = new AWS.SNS();
        const message = this.getTemplate(this.type);
        const params = {
            Message: message,
            TopicArn: 'arn:aws:sns:your-region:your-account-id:your-topic-name' // Replace with your SNS Topic ARN
        };

        try {
            const data = await sns.publish(() => params).promise();
            console.log(`Notification sent: ${data.MessageId}`);
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    }
    
    async sendPushNotification() {
        const ses = new AWS.SES();
        const emailParams = {
            Destination: {
                ToAddresses: ['Example@example.com'], // Replace with actual recipient email address
            },
            Message: {
                Body: {
                    Text: { Data: this.getTemplate(this.type) }, // Message body
                },
                Subject: { Data: `Notification: ${this.type}` }, // Email subject
            },
            Source: 'sender@example.com', // Replace with a verified email in SES
        };

        try {
            const data = await ses.sendEmail(() => emailParams).promise();
            if (!data) {
                throw new Error('Error sending email');
            }

            else {
                console.log(`Email sent! Message ID: ${data.MessageId}`);
            }

        } catch (error) {
            console.error('Error sending email:', error);
        }
    }

}



