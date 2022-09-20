import "reflect-metadata";
import { injectable } from "inversify";
import { ListaCursoInterface } from "./lista-cursos.interface";
import { BusinessError } from "../../../erros/business.error";

@injectable()
export class ListaCursosUseCase implements ListaCursoInterface {
    
    execute(filter: any): any[] {


        throw new Error("ERRO QUALQUER NAO PREVISTO NA APLICAÇÃO");
                
    }

}