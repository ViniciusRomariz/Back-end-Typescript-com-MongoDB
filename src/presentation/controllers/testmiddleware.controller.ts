import * as express from "express";
import { httpGet, controller } from "inversify-express-utils";
import TYPES from "../../types";
import { Container } from 'inversify';

export const testControllerFactory = (container: Container): any => {

    @controller('/')
    class TestController {

        @httpGet('/',
            container.get<express.RequestHandler>(TYPES.CustomMiddleware),
        )
        public getUserName(req: any, res: any) {

            

            res.send(req.user.username);

        }
    }

    return TestController;

}











