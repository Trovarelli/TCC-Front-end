import { CandidatoModel } from "@/api/models"

export interface CandidatoCardProps {
    onDelete?: () => void
    candidato: CandidatoModel
    onFavoriteClientCandidato?: (id: string, favorite: boolean) => void
}