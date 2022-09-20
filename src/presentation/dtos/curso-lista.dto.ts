
import { IsNotEmpty, IsString } from "class-validator";

export namespace ListaCursoDto {


    export class Query {

        @IsString()
        @IsNotEmpty()
        status: string

    }

}
