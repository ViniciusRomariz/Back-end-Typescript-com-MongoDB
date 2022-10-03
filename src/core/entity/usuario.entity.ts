import { InscricaoEntity } from "./inscricao.entity";

export class UsuarioEntity {

    public id: string;
    public nome: string;
    public dataNascimento: string;
    public email: string;
    public inscricoes: InscricaoEntity[];
    public senha: string;
    
    constructor(
        nome: string,
        dataNascimento: string,
        email: string,
        inscricoes: InscricaoEntity[],
        id?: string
    ) {

        
        this.nome = nome
        this.dataNascimento = dataNascimento
        this.email = email
        this.inscricoes = inscricoes;
        this.id = id;

    }

    static build(
        nome: string,
        dataNascimento: string,
        email: string,
        inscricoes?: InscricaoEntity[],
        id?: string,
    ): UsuarioEntity {
        return new UsuarioEntity(
            nome,
            dataNascimento,
            email,
            inscricoes || [],
            id,
        );
    }

}
