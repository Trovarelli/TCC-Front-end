export interface VagaCardProps {
    onEdit?: () => void
    onDelete?: () => void
    candidato: {
        caracteristicas: string[]
        nome: string
        curriculo: string
    }
}