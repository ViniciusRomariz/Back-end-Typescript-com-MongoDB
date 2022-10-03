export type AutoCadastroUseCaseParams = {
    nome: string;
    email: string;
    dataNascimento: string;                
}



export interface AutoCadastroUsuarioInterface {
    
    execute(model: AutoCadastroUseCaseParams): Promise<any>;

}
