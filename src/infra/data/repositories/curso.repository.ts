import { CursoRepositoryInterface, CursoRespositoryCreateParams, CursoRespositorySearchParams, CursoRespositoryUpdateParams } from "../../../core/providers/data/cursos-repository.interface";
import { injectable } from "inversify";
import { CursoEntity } from "../../../core/entity/curso.entity";
import { CursoDbModel, ICursoDbModel } from "../models/curso.model";
import { Model } from "mongoose";

@injectable()
export class CursoRepository implements CursoRepositoryInterface {

    private _cursoDbModel: Model<ICursoDbModel>; 

    constructor(
    ) {

        this._cursoDbModel = CursoDbModel;
    }

    async update(model: CursoRespositoryUpdateParams): Promise<CursoEntity> {

        try {
            
            const filter = {
                cursoId: model.cursoId,
            }
            
            console.log(filter);
            
            const result = await this._cursoDbModel.updateOne(filter, model.data);
            
            return CursoEntity.build(model.cursoId, '', '');

        } catch (error) {
            
            throw new Error(error.message);
        }


    }


    async findById(id: string): Promise<CursoEntity> {

        try {
            
            const result = await this._cursoDbModel.findOne({ cursoId: id }).lean().exec();
    
            console.log(result);

            return result ? CursoEntity.build(
                result.cursoId,
                result.descricao,
                result.dataInicio,
            ) : undefined

        } catch (error) {

            console.log(error.message);

            throw new Error(error.message);
            
        }

        
        throw new Error("Method not implemented.");

    }

    async create(model: CursoRespositoryCreateParams): Promise<CursoEntity> {

        const { cursoId, dataInicio, descricao } = model;

        const dataModel = {
            cursoId,
            dataInicio,
            descricao
        }
        
        await new this._cursoDbModel(dataModel).save();
        
        return CursoEntity.build(
            cursoId,
            dataInicio,
            descricao
        );
    }

    async search(model: CursoRespositorySearchParams): Promise<CursoEntity[]> {

        const resultFromDb = await this._cursoDbModel.find({}).lean().exec();               

        return resultFromDb.map(item => {

            return CursoEntity.build(
                item.cursoId,
                item.descricao,
                item.dataInicio
            );

        });

    } 

}
