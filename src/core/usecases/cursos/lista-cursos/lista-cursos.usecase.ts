import "reflect-metadata";

import { inject, injectable } from "inversify";
import { ListaCursoInterface } from "./lista-cursos.interface";

import { CursoRepositoryInterface } from "@core/providers/data/cursos-repository.interface";
import TYPES from "../../../../types";
import { CursoEntity } from "@core/entity/curso.entity";

@injectable()
export class ListaCursosUseCase implements ListaCursoInterface {
    
    private _cursoRepository: CursoRepositoryInterface;

    constructor(
        @inject(TYPES.CursoRepositoryInterface) cursoRepository: CursoRepositoryInterface 
    ) {
        this._cursoRepository = cursoRepository;
    }

    async execute(filter: any): Promise<CursoEntity[]> {

        const filterToMongo = {};

        const resultFromDB = await this._cursoRepository.search(filterToMongo);

        return resultFromDB;

    }

}
