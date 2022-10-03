import "reflect-metadata";
import { inject, injectable } from "inversify";
import { AlteraCursoInterface, AlteraCursoUseCaseParams } from "./altera-cursos.interface";
import { BusinessError } from "../../../erros/business.error";
import TYPES from "../../../../types";

import { CursoRepositoryInterface } from "../../../providers/data/cursos-repository.interface";
import { uuid } from "uuidv4";
import { CursoEntity } from "../../../entity/curso.entity";


@injectable()
export class AlteraCursoUseCase implements AlteraCursoInterface {
    
    private _cursoRepository: CursoRepositoryInterface;

    constructor(
        @inject(TYPES.CursoRepositoryInterface) cursoRepository: CursoRepositoryInterface 
    ) {
        this._cursoRepository = cursoRepository;
        
    }

    async execute(model: AlteraCursoUseCaseParams): Promise<CursoEntity> {

        const cursoFromDb = await this._cursoRepository.findById(model.cursoId);
        
        if (!cursoFromDb)
            throw new BusinessError("Curso informado não encontrado!");
            
        
        const data: any = {};
        if (model.dataInicio && model.dataInicio != '' || model.dataInicio != ' ') {
            data.dataInicio = model.dataInicio;
        }

        if (model.descricao && model.descricao != '' || model.descricao != ' ') {
            data.descricao = model.descricao;
        }
        
        const result = await this._cursoRepository.update({
            cursoId: model.cursoId,
            data
        });

        cursoFromDb.descricao = model.descricao;
        cursoFromDb.dataInicio = model.dataInicio;

        return cursoFromDb;

    }

}
