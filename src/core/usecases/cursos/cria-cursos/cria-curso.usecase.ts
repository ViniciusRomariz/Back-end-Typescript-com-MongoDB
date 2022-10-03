import "reflect-metadata";
import { inject, injectable } from "inversify";
import { CriaCursoInterface, CriaCursoUseCaseParams } from "./cria-cursos.interface";
import { CursoEntity } from "@core/entity/curso.entity";
import TYPES from "../../../../types";

import { CursoRepositoryInterface } from "../../../providers/data/cursos-repository.interface";
import { uuid } from "uuidv4";

@injectable()
export class CriaCursoUseCase implements CriaCursoInterface {
    
    private _cursoRepository: CursoRepositoryInterface;

    constructor(
        @inject(TYPES.CursoRepositoryInterface) cursoRepository: CursoRepositoryInterface 
    ) {
        this._cursoRepository = cursoRepository;
        
    }

    async execute(model: CriaCursoUseCaseParams): Promise<CursoEntity> {

        const cursoFromDb = this._cursoRepository.search({
            descricao: model.descricao
        });
        
        if (!cursoFromDb)
            throw new Error("");
        
        const result = await this._cursoRepository.create({
            cursoId: uuid(),
            dataInicio: model.dataInicio,
            descricao: model.descricao
        });

        return result;

    }

}
