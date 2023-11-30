export interface VagaModel {
    userId: string,
    _id: string,
    empresa: string,
    descricao: string,
    titulo: string,
    caracteristicas: string[],
    ativo?: boolean,
    matchField: string[]
}