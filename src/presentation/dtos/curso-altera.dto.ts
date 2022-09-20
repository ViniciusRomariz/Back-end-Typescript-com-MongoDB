
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export namespace AlteraCursoDto {

    export class Params {
        @IsString()
        id: string;
    }

    export class Body {
        @IsString()
        @IsNotEmpty()
        descricao: string;
        
        @IsString()
        @IsNotEmpty()
        status: string;
    }

}
