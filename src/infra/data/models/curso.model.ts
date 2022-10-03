import mongoose, { Types, Schema, Model, model } from 'mongoose';

export interface ICursoDbModel {
    cursoId: string,
    descricao: string,
    dataInicio: string,
    dataCadatro?: Date,
}

const CursoSchema = new mongoose.Schema<ICursoDbModel>({

    cursoId: { type: String, required: true },
    descricao: { type: String, required: true },
    dataInicio: { type: String, required: true },
    dataCadatro: { type: Date, default: Date.now }

});

export const CursoDbModel: Model<ICursoDbModel> = model('cursos', CursoSchema);




