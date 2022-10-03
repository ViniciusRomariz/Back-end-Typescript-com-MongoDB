import { CursoEntity } from "@core/entity/curso.entity";

export interface ListaCursoInterface {

    execute(filter: any): Promise<CursoEntity[]>;

}
