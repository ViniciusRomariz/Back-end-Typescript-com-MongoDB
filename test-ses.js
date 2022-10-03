const aws = require('aws-sdk');

const init = async () => {
    
    try {

        aws.config.update({region: process.env.AWS_REGION ||'us-east-1' });

        const ses = new aws.SES({
            secretAccessKey: process.env.AWS_SECRET_KEY,
            accessKeyId: process.env.AWS_KEY_ID,
        });
          
        const params = {
            Destination: {
                ToAddresses: [
                    'vinicius.romariz@al.infnet.edu.br',
                ],
            },
            Message: { 
                    Body: { 
                    Text: {
                        Charset: "UTF-8",
                        Data: "TEST ENVIO DE EMAIL BODY TEXT"
                    }
                },
                Subject: {
                    Charset: 'UTF-8',
                    Data: `TEST ENVIO DE EMAIL Subject TEXT`
                }
            },
            Source: 'no-reply@vinicius_romariz.com.br', 
        }
        
        const result = await ses.sendEmail(params).promise();


        console.log(result);


    } catch (error) {

        console.log(error);
        
    }


}


init();
