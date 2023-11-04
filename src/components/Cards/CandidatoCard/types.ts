import { CandidatoModel } from "@/api/models"

export interface CandidatoCardProps {
    onEdit?: () => void
    onDelete?: () => void
    candidato: CandidatoModel
}