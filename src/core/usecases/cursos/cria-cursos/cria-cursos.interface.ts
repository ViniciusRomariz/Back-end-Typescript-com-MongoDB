import { CursoEntity } from "@core/entity/curso.entity";


export class CriaCursoUseCaseParams {
    descricao: string;
    dataInicio: string;                
}



export interface CriaCursoInterface {
    
    execute(model: CriaCursoUseCaseParams): CursoEntity;

}