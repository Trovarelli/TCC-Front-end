import { useState, useEffect, useCallback } from 'react';
import { CandidatoModel } from '@/api/models';
import { GetAllCandidatos, DeleteCandidato } from '@/api/requests';
import { useUserStore } from '@/store/user';
import { toast } from 'react-toastify';

export const useCandidatos = () => {
    const [candidatos, setCandidatos] = useState<CandidatoModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [localLoading, setLocalLoading] = useState(false);
    const { id: userId } = useUserStore().user;

    const fetchCandidatos = useCallback(async () => {
        try {
            setLoading(true);
            const res = await GetAllCandidatos({ userId });
            setCandidatos(res.data);
        } catch (err: any) {
            console.error(err.message);
            toast.error('Erro ao carregar candidatos');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    const deleteCandidato = useCallback(
        async (candidatoId: string) => {
            try {
                setLocalLoading(true);
                await DeleteCandidato({ candidatoId, userId });
                setCandidatos((prev) => prev.filter((el) => el._id !== candidatoId));
                toast.success('Candidato removido com sucesso');
            } catch (err: any) {
                toast.error(err.response?.data.message || 'Erro ao remover candidato');
            } finally {
                setLocalLoading(false);
            }
        },
        [userId]
    );

    const updateFavorite = useCallback((id: string, favorite: boolean) => {
        setCandidatos((prev) =>
            prev.map((el) => (el._id === id ? { ...el, favorito: favorite } : el))
        );
    }, []);

    const addCandidate = useCallback((candidate: CandidatoModel) => {
        setCandidatos((prev) => [...prev, candidate]);
    }, []);

    useEffect(() => {
        if (userId) {
            fetchCandidatos();
        }
    }, [fetchCandidatos, userId]);

    return {
        candidatos,
        loading,
        localLoading,
        deleteCandidato,
        updateFavorite,
        addCandidate,
        refetch: fetchCandidatos,
    };
};


