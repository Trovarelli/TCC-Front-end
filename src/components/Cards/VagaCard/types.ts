import { VagaModel } from "@/api/models"

export interface VagaCardProps {
    vaga: VagaModel
    quantity: number
    userId: string
}