export class InscricaoEntity {

    public id: string;
    
    public alunoNome: string;
    public alunoId: string;
    public status: string;
    public dataCancelamento;

    constructor(
        id: string,
        alunoNome: string,
        alunoId: string,
        dataCancelamento?: string,
    ) {

        this.id = id;
        this.alunoNome = alunoNome;
        this.alunoId = alunoId;
        this.dataCancelamento = dataCancelamento;
        this.status = this.getInscricaoStatus();
    }

    private getInscricaoStatus() : string {
        return "status_mock";
    }

    static build(
        id: string,
        alunoNome: string,
        alunoId: string,
        dataCancelamento?: string,
    ): InscricaoEntity {
        return new InscricaoEntity(
            id,
            alunoNome,
            alunoId,
            dataCancelamento,
        );
    }

}

