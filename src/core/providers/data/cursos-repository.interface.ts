import { CursoEntity } from "@core/entity/curso.entity";


export type CursoRespositorySearchParams = {
    descricao?: string;    
}


export type CursoRespositoryCreateParams = {
    cursoId: string;
    dataInicio: string;    
    descricao: string;    
}


export type CursoRespositoryUpdateParams = {
    cursoId: string;
    data: {
        dataInicio?: string;    
        descricao?: string;    
    }
}

export interface CursoRepositoryInterface {
    
    search(model: CursoRespositorySearchParams): Promise<CursoEntity[]>;
    
    findById(id: string): Promise<CursoEntity>;

    create(model: CursoRespositoryCreateParams): Promise<CursoEntity>;

    update(model: CursoRespositoryUpdateParams): Promise<CursoEntity>;


}
