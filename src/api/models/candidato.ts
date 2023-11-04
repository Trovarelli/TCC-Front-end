export interface CandidatoModel {
    nome?: string
    id: string;
    idade: number
    favorito?: boolean
    curriculo: string
    telefone?: string[]
    genero?: 'M' | 'F'
    experiencia?: string[]
    pcd?: boolean
    lgbtq?: boolean
    nivelProfissional?: 'estagiario' | 'junior' | 'pleno' | 'senior'
}
