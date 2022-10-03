import { AutoCadastroUsuarioInterface } from "../../core/usecases/usuarios/auto-cadastro-usuarios/auto-cadastro-usuarios.interface";
import * as express from "express";
import { inject } from "inversify";
import { httpGet, BaseHttpController, interfaces, controller, queryParam, requestParam, httpPost, requestBody, httpPut } from "inversify-express-utils";
import TYPES from "../../types";
import { ValidateDtoMiddleware } from "../middlewares/validate-dto.middleware";
import { AutoCadastroUsuarioDto } from "../dtos/auto-cadastro-usuario.dto";

@controller('/usuarios')
export class UsuariosController extends BaseHttpController implements interfaces.Controller {

    private _autoCadastroUsuarioUseCase: AutoCadastroUsuarioInterface;
    
    constructor(
        @inject(TYPES.AutoCadastroUsuarioInterface) autoCadastroUsuarioUseCase: AutoCadastroUsuarioInterface
    ) {
        super();
        this._autoCadastroUsuarioUseCase = autoCadastroUsuarioUseCase;
    }

    @httpPost(
        "/" 
    )
    public async cria(
        @requestBody() body: AutoCadastroUsuarioDto.Body,
    ): Promise<interfaces.IHttpActionResult> {

        const result = await this._autoCadastroUsuarioUseCase.execute({
            dataNascimento: body.dataNascimento,
            email: body.email,
            nome: body.nome
        });

        return this.json({});
    
    }
    
}