import "reflect-metadata";

import { inject, injectable } from "inversify";

import { ExibeCursoInterface } from "./exibe-curso.interface";

import { CursoRepositoryInterface } from "@core/providers/data/cursos-repository.interface";
import TYPES from "../../../../types";
import { CursoEntity } from "../../../entity/curso.entity";
import { UsuarioRepositoryInterface } from "../../../providers/data/usuario-repository.interface";
import { InscricaoEntity } from "../../../entity/inscricao.entity";

@injectable()
export class ExibeCursoUseCase implements ExibeCursoInterface {
    
    private _cursoRepository: CursoRepositoryInterface;
    private _usuarioRepository: UsuarioRepositoryInterface;

    constructor(
        @inject(TYPES.CursoRepositoryInterface) cursoRepository: CursoRepositoryInterface,
        @inject(TYPES.UsuarioRepositoryInterface) usuarioRepository: UsuarioRepositoryInterface 
    ) {
        this._cursoRepository = cursoRepository;
        this._usuarioRepository = usuarioRepository;
    }

    async execute(id: string): Promise<CursoEntity> {


        const cursoFromDB = await this._cursoRepository.findById(id);

        const usersFromDB = await this._usuarioRepository.search({
            cursoId: id,
        });  

        const inscricoes = usersFromDB.reduce((acc,item) => {

            return [ 
                ...acc, 
                ...item.inscricoes
                .filter(itemInscricaoFilter => itemInscricaoFilter.cursoId == id)
                .map(itemInscricao => { 
                    
                    console.log('###########aqui');
                    console.log(itemInscricao);
                    

                    return InscricaoEntity.build(
                        itemInscricao.id,
                        item.email,
                        item.id,
                        item.dataCancelamento
                    );

                }),
            ];

        }, [])

        
        return CursoEntity.build(
            cursoFromDB.id,
            cursoFromDB.descricao,
            cursoFromDB.dataInicio,
            inscricoes
        );

    }

}
