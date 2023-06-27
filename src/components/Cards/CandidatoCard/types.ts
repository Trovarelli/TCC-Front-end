export interface VagaCardProps {
    title: string
    quantity: number
    onEdit?: () => void
    onDelete?: () => void
}