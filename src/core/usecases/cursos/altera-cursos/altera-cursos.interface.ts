import { CursoEntity } from "@core/entity/curso.entity";

export class AlteraCursoUseCaseParams {
    cursoId: string;
    descricao: string;
    dataInicio: string;                
}

export interface AlteraCursoInterface {
    
    execute(model: AlteraCursoUseCaseParams): Promise<CursoEntity>;

}
