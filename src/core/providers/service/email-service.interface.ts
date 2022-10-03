export type SendEmailParams = {
    message: string;
    subject: string;
    fromAddress: string;
    toAddress: string;
}

export interface EmailServiceInterface {
    send(model: SendEmailParams): Promise<void>;
}
