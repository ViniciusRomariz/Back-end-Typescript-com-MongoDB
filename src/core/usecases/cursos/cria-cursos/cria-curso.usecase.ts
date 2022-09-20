import "reflect-metadata";
import { inject, injectable } from "inversify";
import { CriaCursoInterface, CriaCursoUseCaseParams } from "./cria-cursos.interface";
import { CursoEntity } from "@core/entity/curso.entity";
import TYPES from "../../../../types";

import { CursoRepositoryInterface } from "../../../providers/data/cursos-repository.interface";

@injectable()
export class CriaCursoUseCase implements CriaCursoInterface {
    
    private _cursoRepository: CursoRepositoryInterface;

    constructor(
        @inject(TYPES.CursoRepositoryInterface) cursoRepository: CursoRepositoryInterface 
    ) {
        // super();
        this._cursoRepository = cursoRepository;

    }

    execute(model: CriaCursoUseCaseParams): CursoEntity {

        //todo: validar regras de negocio
        //todo: 01 validar se ja existe curso com o nome informado
        const cursoFromDb = this._cursoRepository.search({
            descricao: model.descricao
        });
        
        if (!cursoFromDb)
            throw new Error("");
            
        
        //todo: 02 o inicio do curso não pode ser em uma data retroativa
        
        //todo: salvar o curso no banco
        const result = this._cursoRepository.create({
            dataInicio: model.dataInicio,
            descricao: model.descricao
        });


        //todo: montar saída do use case
        return result;

    }

}