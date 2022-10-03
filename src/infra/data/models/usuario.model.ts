import mongoose, { Types, Schema, Model, model } from 'mongoose';
import { uuid } from 'uuidv4';

export interface IUsuarioDbModel {
    usuarioEmail: string,
    usuarioSenha: string,
    inscricoes?: [
        {
            id: string,                 
            cursoId: string,
            dataCadastro?: Date,
            datacancelamento?: Date,
        }
    ],
    dataNascimento: Date,
    dataCadatro?: Date,
}

const UsuarioSchema = new mongoose.Schema<IUsuarioDbModel>({

    usuarioEmail: { type: String, required: true },
    usuarioSenha: { type: String, required: true },
    inscricoes: [
        {
            id: { type: String, required: true, default: () => uuid() },                 
            cursoId: { type: String, required: true },
            dataCadastro: { type: Date, default: Date.now },
            datacancelamento: { type: Date, default: null }
        }
    ],
    dataNascimento: { type: Date },
    dataCadatro: { type: Date, default: Date.now },
});

export const UsuarioDbModel: Model<IUsuarioDbModel> = model('usuarios', UsuarioSchema);


