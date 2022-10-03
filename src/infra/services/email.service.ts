import { injectable } from "inversify";
import { EmailServiceInterface, SendEmailParams } from "../../core/providers/service/email-service.interface";
import { SES } from 'aws-sdk';

@injectable()
export class EmailService implements EmailServiceInterface {
    
    private _sdkSES: SES;   

    constructor() {

        this._sdkSES = new SES({
            region: 'us-east-1',  
            credentials: {
                accessKeyId: process.env.AWS_KEY_ID,
                secretAccessKey: process.env.AWS_SECRET_KEY,
            }
        });

    }

    async send(model: SendEmailParams): Promise<void> {

        try {
            
            const params = {
                Destination: {
                    ToAddresses: [
                        model.toAddress,
                    ],
                },
                Message: { 
                        Body: { 
                        
                        Text: {
                            Charset: "UTF-8",
                            Data: model.message
                        }
                    },
                    Subject: {
                        Charset: 'UTF-8',
                        Data: model.subject
                    }
                },
                Source: model.fromAddress, /* required */
            }

            const result = await this._sdkSES.sendEmail(params).promise();
    
            console.log(result);

            return;

        } catch (error) {
            
            console.log(error);

            throw new Error(error.message);

        }

    }

}
