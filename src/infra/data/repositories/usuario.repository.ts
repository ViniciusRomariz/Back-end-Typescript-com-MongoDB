import { CursoRepositoryInterface, CursoRespositoryCreateParams, CursoRespositorySearchParams } from "../../../core/providers/data/cursos-repository.interface";
import { injectable } from "inversify";
import { CursoEntity } from "../../../core/entity/curso.entity";
import { CursoDbModel, ICursoDbModel } from "../models/curso.model";
import { Model } from "mongoose";
import { IUsuarioDbModel, UsuarioDbModel } from "../models/usuario.model";
import { UsuarioRepositoryInterface, UsuarioRespositorySearchParams } from "@core/providers/data/usuario-repository.interface";
import { UsuarioEntity } from "@core/entity/usuario.entity";

const data = [];

@injectable()
export class UsuarioRepository implements UsuarioRepositoryInterface {

    private _usuarioDbModel: Model<IUsuarioDbModel>; 

    constructor(
    ) {

        this._usuarioDbModel = UsuarioDbModel;
    }

    async create(model: UsuarioEntity): Promise<UsuarioEntity> {

        const fake = "sdsdfsdfsdfds";

        const newUsuario = new this._usuarioDbModel({
            dataNascimento: model.dataNascimento,
            usuarioEmail: model.email,
            usuarioSenha: fake
        });

        await newUsuario.save();
        
        model.id = newUsuario._id.toString();
        model.senha = newUsuario.usuarioSenha;

        return model;
        
    }
    
    async search(model: UsuarioRespositorySearchParams): Promise<any[]> {

        const mongoFilter = {};

        if (model.cursoId) {

            const elementMatch = {};
            
            elementMatch["$elemMatch"] = {
                cursoId: model.cursoId
            }

            mongoFilter["inscricoes"] =  elementMatch;
        }

        const resultFromDb = await this._usuarioDbModel.find(mongoFilter).lean().exec();               

        return resultFromDb.map(item => {

            return {
                id: item._id.toString(),
                email: item.usuarioEmail,
                inscricoes: item.inscricoes.map(itemInscricao => { 
                    return {
                        id: itemInscricao.id,
                        cursoId: itemInscricao.cursoId,
                        dataCadastro: itemInscricao.dataCadastro,
                        datacancelamento: itemInscricao.datacancelamento,
                    }
                })
            }
        
        });

    } 

}
