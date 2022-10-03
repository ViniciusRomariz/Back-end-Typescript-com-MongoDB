import { UsuarioRepositoryInterface } from "../../../providers/data/usuario-repository.interface";
import { UsuarioEntity } from "../../../entity/usuario.entity";

import { inject, injectable } from "inversify";
import { AutoCadastroUseCaseParams, AutoCadastroUsuarioInterface } from "./auto-cadastro-usuarios.interface";
import TYPES from "../../../../types";
import { EmailServiceInterface } from "../../../providers/service/email-service.interface";

@injectable()
export class AutoCadastroUsuarioUseCase implements AutoCadastroUsuarioInterface {
    
    
    private _usuarioRepository: UsuarioRepositoryInterface;
    private _emailService: EmailServiceInterface;
    

    constructor(
        @inject(TYPES.UsuarioRepositoryInterface) usuarioRepository: UsuarioRepositoryInterface,
        @inject(TYPES.EmailServiceInterface) emailService: EmailServiceInterface
    ){

        this._usuarioRepository = usuarioRepository;
        this._emailService = emailService;

    }

    async execute(model: AutoCadastroUseCaseParams): Promise<any> {

        const modelToSave = UsuarioEntity.build(
           model.nome,
           model.dataNascimento,
           model.email
        )

        const newUsuario = await this._usuarioRepository.create(modelToSave);
        
        const emailParamns = {
            message: `olá: ${model.nome} sua nova senha é ${newUsuario.senha}`,
            subject: `Confirmação Novo Cadastro`,
            fromAddress: 'no-reply@tatamefinder.com.br',
            toAddress: newUsuario.email
        }

        await this._emailService.send(emailParamns)

        return;

    } 
}

