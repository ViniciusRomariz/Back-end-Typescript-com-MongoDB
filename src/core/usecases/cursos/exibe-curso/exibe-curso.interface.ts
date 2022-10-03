import { CursoEntity } from "@core/entity/curso.entity";

export interface ExibeCursoInterface {

    execute(id: string): Promise<CursoEntity>;

}
