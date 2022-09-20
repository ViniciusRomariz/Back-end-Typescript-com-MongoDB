import { CursoRepositoryInterface, CursoRespositoryCreateParams, CursoRespositorySearchParams } from "../../../core/providers/data/cursos-repository.interface";
import { injectable } from "inversify";
import { CursoEntity } from "../../../core/entity/curso.entity";

const data = [];

@injectable()
export class CursoRepository implements CursoRepositoryInterface {



    create(model: CursoRespositoryCreateParams): CursoEntity {

        const id = 0;

        const dataModel = {
            id,
            curso_data_inicio: model.dataInicio,
            curso_descricao: model.descricao
        }


        data.push(dataModel);

        return CursoEntity.build(
            dataModel.id,
            dataModel.curso_descricao,
            dataModel.curso_data_inicio
        );
    }

    search(model: CursoRespositorySearchParams): CursoEntity[] {
        throw new Error("Method not implemented.");
    } 

}