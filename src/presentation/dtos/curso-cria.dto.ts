
import { IsNotEmpty, IsString } from "class-validator";

export namespace CriaCursoDto {


    export class Body {

        @IsString()
        @IsNotEmpty()
        descricao: string;

        @IsString()
        @IsNotEmpty()
        dataInicio: string;

    }

}
