import * as express from "express";
import { inject } from "inversify";
import { httpGet, BaseHttpController, interfaces, controller, queryParam, requestParam, httpPost, requestBody, httpPut } from "inversify-express-utils";
import TYPES from "../../types";

import { ListaCursoInterface } from "../../core/usecases/cursos/lista-cursos/lista-cursos.interface";
import { ListaCursoDto } from "../../presentation/dtos/curso-lista.dto";
import { CriaCursoDto } from "../../presentation/dtos/curso-cria.dto";
import { CriaCursoInterface } from "../../core/usecases/cursos/cria-cursos/cria-cursos.interface";
import { AlteraCursoDto } from "../../presentation/dtos/curso-altera.dto";


import { ValidateDtoMiddleware } from "../middlewares/validate-dto.middleware";


@controller('/cursos')
export class CursosController extends BaseHttpController implements interfaces.Controller {

    private _listCursoService: ListaCursoInterface;
    private _criaCursoService: CriaCursoInterface;

    constructor(
        @inject(TYPES.ListaCursoInterface) listaCursoUseCase: ListaCursoInterface,
        @inject(TYPES.CriaCursoInterface) criaCursoUseCase: CriaCursoInterface 
    ) {
        super();
        this._listCursoService = listaCursoUseCase;
        this._criaCursoService = criaCursoUseCase;
    }

    @httpGet("/")
    public async lista(
        @queryParam() query: ListaCursoDto.Query,
    ): Promise<interfaces.IHttpActionResult> {
        
        console.log(query);

        const resultado: any[] = this._listCursoService.execute({});

        return this.json(resultado);

    }
    
    @httpGet("/:id")
    public async buscaPorId(
        @requestParam('id') id: string,
    ): Promise<interfaces.IHttpActionResult> {
        
        try {
            
            console.log(id);
            
            return this.json({
                id: 1,
                descricao: 'teste curso 1',
                status: 'inativo'
            });

        } catch (error) {
            
            if (error.name == 'BusinessError') {

                return this.badRequest(error.message);

            }
                
            return this.internalServerError(error.message);

        }


    }

    @httpPost(
        "/", 
        ValidateDtoMiddleware(CriaCursoDto.Body, "body"),
    )
    public async cria(
        @requestBody() body: CriaCursoDto.Body,
    ): Promise<interfaces.IHttpActionResult> {
        
        const result = this._criaCursoService.execute({
            dataInicio: body.dataInicio,
            descricao: body.descricao
        });

        return this.json(result);
    
    }
    

    @httpPut(
        "/:id",
        ValidateDtoMiddleware(AlteraCursoDto.Params, "params"),
        ValidateDtoMiddleware(AlteraCursoDto.Body, "body"),
    )
    public async altera(
        @requestParam(':id') params: string,
        @requestBody() body: AlteraCursoDto.Body,
    ): Promise<interfaces.IHttpActionResult> {
        
        console.log(params);
        console.log(body);
        
        return this.json({
            mensagem: 'sucesso',
            data: {
                id: 'string',
                descricao: 'string',
                status: 'ativo'
            }
        })
    }



}







