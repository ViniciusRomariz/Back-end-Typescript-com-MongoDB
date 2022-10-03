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
import { CursoEntity } from "../../core/entity/curso.entity";
import { ExibeCursoInterface } from "../../core/usecases/cursos/exibe-curso/exibe-curso.interface";
import { AlteraCursoInterface } from "../../core/usecases/cursos/altera-cursos/altera-cursos.interface";

@controller('/cursos')
export class CursosController extends BaseHttpController implements interfaces.Controller {

    private _listCursoService: ListaCursoInterface;
    private _criaCursoService: CriaCursoInterface;
    private _alteraCursoService: AlteraCursoInterface;
    private _exibeCursoUseCase: ExibeCursoInterface;

    constructor(
        @inject(TYPES.ListaCursoInterface) listaCursoUseCase: ListaCursoInterface,
        @inject(TYPES.CriaCursoInterface) criaCursoUseCase: CriaCursoInterface,
        @inject(TYPES.AlteraCursoInterface) alteraCursoUseCase: AlteraCursoInterface,
        @inject(TYPES.ExibeCursoInterface) exibeCursoUseCase: ExibeCursoInterface, 
    ) {
        super();
        this._listCursoService = listaCursoUseCase;
        this._criaCursoService = criaCursoUseCase;
        this._exibeCursoUseCase = exibeCursoUseCase;
        this._alteraCursoService = alteraCursoUseCase;
    }

    @httpGet("/")
    public async lista(
        @queryParam() query: ListaCursoDto.Query,
    ): Promise<interfaces.IHttpActionResult> {
        
        console.log(query);

        const resultado: CursoEntity[] = await this._listCursoService.execute({});

        return this.json(resultado.map(item => {
            return {
                id: item.id,
                descricao: item.descricao,
                dataInicio: item.dataInicio
            }
        }));

    }
    
    @httpGet("/:id")
    public async buscaPorId(
        @requestParam('id') id: string,
    ): Promise<interfaces.IHttpActionResult> {
        
        try {
            
            console.log(id);
            
            const result = await this._exibeCursoUseCase.execute(id);
    
            return this.json({
                id: result.id,
                descricao: result.descricao,
                status: result.status, 
                inscricoesQtd: result.inscricoes.length,
                inscricoes: [
                    
                    ...result.inscricoes.map(item => {

                        console.log(item);

                        return { 
                            id: item.id,
                            alunoId: item.alunoId,
                            alunoEmail: item.alunoNome,
                            inscricaoStatus: item.status,
                        }
                    })
                ]
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
        
        const result = await this._criaCursoService.execute({
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
        @requestParam('id') params: string,
        @requestBody() body: AlteraCursoDto.Body,
    ): Promise<interfaces.IHttpActionResult> {
        
        console.log(params);
        console.log(body);
        
        const result = await this._alteraCursoService.execute({
            cursoId: params,
            descricao: body.descricao,
            dataInicio: body.dataInicio
        });


        return this.json({
            mensagem:  'sucesso',
            data: {
                id: result.id,
                descricao: result.descricao,
                status: result.status
            }
        })
    }

}