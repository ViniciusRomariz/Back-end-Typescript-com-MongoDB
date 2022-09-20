import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";

export const ValidateDtoMiddleware = (model: any, httpContext: string) => { 

    return async (req: any, res: any, next: any) => { 
        
        const output: any = plainToInstance(model, req[httpContext]);
        
        const validationResult: ValidationError[] = await validate(output, {});
        
        if (validationResult.length > 0) {
            const mensagens = validationResult.map((error: ValidationError) => 
                (Object as any).values(error.constraints).join(", "));

            return res.status(400).json({
                mensagens
            });
        }

        return next();
    
    }

}