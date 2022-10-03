import { IsDateString, IsEmail, IsNotEmpty, IsString } from "class-validator";

export namespace AutoCadastroUsuarioDto {


    export class Body {

        @IsEmail()
        @IsNotEmpty()
        email: string;


        @IsString()
        @IsNotEmpty()
        nome: string;

        @IsDateString()
        @IsNotEmpty()
        dataNascimento: string;

    }

}

