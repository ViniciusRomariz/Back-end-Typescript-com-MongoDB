

import { CursoEntity } from "@core/entity/curso.entity";


export type CursoRespositorySearchParams = {
    descricao?: string;    
}


export type CursoRespositoryCreateParams = {
    dataInicio: string;    
    descricao: string;    
}

export interface CursoRepositoryInterface {
    
    search(model: CursoRespositorySearchParams): CursoEntity[];

    create(model: CursoRespositoryCreateParams): CursoEntity;

}