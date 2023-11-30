export interface CandidatoModel {
    nome?: string
    _id: string;
    idade: number
    email: string;
    profissao?: string
    favorito?: boolean
    curriculo: string
    telefone?: string[]
    competencias?: string[]
    escolaridade?: string[]
    caracteristicas?: string[]
    genero?: 'M' | 'F'
    experiencia?: string[]
    pcd?: boolean
    lgbtq?: boolean
    nivelProfissional?: 'estagiario' | 'junior' | 'pleno' | 'senior'
    matchField: string[]
}
