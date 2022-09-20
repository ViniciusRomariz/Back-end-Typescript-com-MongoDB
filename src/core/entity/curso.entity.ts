export class CursoEntity {

    public id: number;
    public descricao: string;
    public dataInicio: string;
    public status: string;

    constructor(
        cursoId: number,
        descricao: string,
        dataInicio: string,
    ) {

        
        this.id = cursoId;
        this.descricao = descricao;
        this.dataInicio = dataInicio;
        this.status = this.getCursoStatus();

    }

    private getCursoStatus() : string {
        return "status_mock";
    }

    static build(
        cursoId: number,
        descricao: string,
        dataInicio: string,
    ): CursoEntity {
        return new CursoEntity(
            cursoId,
            descricao,
            dataInicio
        );
    }

}
