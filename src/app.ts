import "reflect-metadata";
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";
import { connect } from 'mongoose';
import TYPES from "./types";
import "./presentation/controllers/cursos.controller";
import "./presentation/controllers/usuarios.controller";
import { testControllerFactory } from "./presentation/controllers/testmiddleware.controller";
import { CustomMiddleware } from "./presentation/middlewares/custom.middleware";
import { ListaCursoInterface } from "./core/usecases/cursos/lista-cursos/lista-cursos.interface";
import { ListaCursosUseCase } from "./core/usecases/cursos/lista-cursos/lista-cursos.usecase";
import { CriaCursoInterface } from "./core/usecases/cursos/cria-cursos/cria-cursos.interface";
import { CriaCursoUseCase } from "./core/usecases/cursos/cria-cursos/cria-curso.usecase";
import { CursoRepositoryInterface } from "./core/providers/data/cursos-repository.interface";
import { CursoRepository } from "./infra/data/repositories/curso.repository";
import { ExibeCursoInterface } from "@core/usecases/cursos/exibe-curso/exibe-curso.interface";
import { ExibeCursoUseCase } from "./core/usecases/cursos/exibe-curso/exibe-curso.usecase";
import { UsuarioRepositoryInterface } from "./core/providers/data/usuario-repository.interface";
import { UsuarioRepository } from "./infra/data/repositories/usuario.repository";
import { AlteraCursoInterface } from "./core/usecases/cursos/altera-cursos/altera-cursos.interface";
import { AlteraCursoUseCase } from "./core/usecases/cursos/altera-cursos/altera-curso.usecase";
import { AutoCadastroUsuarioUseCase } from "./core/usecases/usuarios/auto-cadastro-usuarios/auto-cadastro-usuarios.usecase";
import { AutoCadastroUsuarioInterface } from "./core/usecases/usuarios/auto-cadastro-usuarios/auto-cadastro-usuarios.interface";
import { CursoDbModel, ICursoDbModel } from "./infra/data/models/curso.model";
import { Model } from "mongoose";
import { EmailServiceInterface } from "./core/providers/service/email-service.interface";
import { EmailService } from "./infra/services/email.service";

const PORT = process.env.PORT || 3001;

const container = new Container();

export class App {
    
    constructor() {
        this.configDependencies();
        this.createService();
        
    }
    
    configDependencies(): void {

        container.bind<ListaCursoInterface>(TYPES.ListaCursoInterface).to(ListaCursosUseCase);
        container.bind<ExibeCursoInterface>(TYPES.ExibeCursoInterface).to(ExibeCursoUseCase);
        
        container.bind<AlteraCursoInterface>(TYPES.AlteraCursoInterface).to(AlteraCursoUseCase);
        container.bind<CriaCursoInterface>(TYPES.CriaCursoInterface).to(CriaCursoUseCase);
        container.bind<AutoCadastroUsuarioInterface>(TYPES.AutoCadastroUsuarioInterface).to(AutoCadastroUsuarioUseCase);
        container.bind<CursoRepositoryInterface>(TYPES.CursoRepositoryInterface).to(CursoRepository);
        container.bind<UsuarioRepositoryInterface>(TYPES.UsuarioRepositoryInterface).to(UsuarioRepository);

        container.bind<EmailServiceInterface>(TYPES.EmailServiceInterface).to(EmailService);

        container.bind<express.RequestHandler>(TYPES.CustomMiddleware).toConstantValue(CustomMiddleware);
        
        testControllerFactory(container);

    }

    async createService(): Promise<void> {
        
        const server: InversifyExpressServer = new InversifyExpressServer(container);        
        
        server.setConfig((app) => {
            
            app.use(express.json());    

        });
        
        server.setErrorConfig((app) => {

            app.use((err, req, res, next) => {

                if(err) {

                    if (err.name == 'BusinessError') {
                        return res.status(400).json({
                            mensagem: err.message,
                        });
                    }

                    return res.status(500).json({
                        mensagem: "Internal Server Error",
                    });

                }

                next();

            });
            
        });

        await connect(process.env.MONGO_URL);

        const app = server.build();

        app.listen(PORT, () => {
            console.log("Servidor iniciado na porta 3000");
        });

    }

}

export default new App();

