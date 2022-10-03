import { CursoEntity } from "@core/entity/curso.entity";
import { UsuarioEntity } from "@core/entity/usuario.entity";


export type UsuarioRespositorySearchParams = {
    cursoId?: string;    
}

export interface UsuarioRepositoryInterface {
    
    create(model: UsuarioEntity): Promise<UsuarioEntity>;

    search(model: UsuarioRespositorySearchParams): Promise<any[]>;
    
}
