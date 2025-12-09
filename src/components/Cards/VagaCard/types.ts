import { CandidatoModel, VagaModel } from "@/api/models"

export interface VagaCardProps {
    vaga: VagaModel;
    candidatos: CandidatoModel[]
    userId: string;
    setOpenModal: () => void;
    onDelete: () => Promise<void>; 
  }

