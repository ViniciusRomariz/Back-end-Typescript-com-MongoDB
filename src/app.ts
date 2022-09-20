import "reflect-metadata";

import * as bodyParser from 'body-parser';
import * as express from 'express';

import { Container } from "inversify";
import { InversifyExpressServer } from "inversify-express-utils";

import TYPES from "./types";

import "./presentation/controllers/cursos.controller";


import { testControllerFactory } from "./presentation/controllers/testmiddleware.controller";
import { CustomMiddleware } from "./presentation/middlewares/custom.middleware";

import { ListaCursoInterface } from "./core/usecases/cursos/lista-cursos/lista-cursos.interface";
import { ListaCursosUseCase } from "./core/usecases/cursos/lista-cursos/lista-cursos.usecase";

import { CriaCursoInterface } from "./core/usecases/cursos/cria-cursos/cria-cursos.interface";
import { CriaCursoUseCase } from "./core/usecases/cursos/cria-cursos/cria-curso.usecase";

import { CursoRepositoryInterface } from "./core/providers/data/cursos-repository.interface";
import { CursoRepository } from "./infra/data/repositories/curso.repository";

const PORT = process.env.PORT || 3000;

const container = new Container();

export class App {
    
    constructor() {
        this.configDependencies();
        this.createService();
        
    }
    
    configDependencies(): void {

        container.bind<ListaCursoInterface>(TYPES.ListaCursoInterface).to(ListaCursosUseCase);
        container.bind<CriaCursoInterface>(TYPES.CriaCursoInterface).to(CriaCursoUseCase);
        container.bind<CursoRepositoryInterface>(TYPES.CursoRepositoryInterface).to(CursoRepository);
        container.bind<express.RequestHandler>(TYPES.CustomMiddleware).toConstantValue(CustomMiddleware);

        testControllerFactory(container);

    }

    createService(): void {
        
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
            
        })

        const app = server.build();

        app.listen(PORT, () => {
            console.log("Servidor iniciado na porta 3000");
        });

    }

}

export default new App();
