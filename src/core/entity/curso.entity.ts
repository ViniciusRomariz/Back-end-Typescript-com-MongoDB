import { InscricaoEntity } from "./inscricao.entity";

export class CursoEntity {

    public id: string;
    public descricao: string;
    public dataInicio: string;
    public status: string;
    public inscricoes: InscricaoEntity[];
    
    constructor(
        cursoId: string,
        descricao: string,
        dataInicio: string,
        inscricoes: InscricaoEntity[]
    ) {

        
        this.id = cursoId;
        this.descricao = descricao;
        this.dataInicio = dataInicio;
        this.status = this.getCursoStatus();
        this.inscricoes = inscricoes;

    }

    private getCursoStatus() : string {
        return "status_mock";
    }

    static build(
        cursoId: string,
        descricao: string,
        dataInicio: string,
        inscricoes?: InscricaoEntity[],
    ): CursoEntity {
        return new CursoEntity(
            cursoId,
            descricao,
            dataInicio,
            inscricoes || []
        );
    }

}

