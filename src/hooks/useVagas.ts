import { useState, useEffect, useCallback } from 'react';
import { GetAllVagas, DeleteVaga } from '@/api/requests';
import { VagaModel } from '@/api/models';
import { useUserStore } from '@/store/user';
import { toast } from 'react-toastify';

export const useVagas = () => {
    const [vagas, setVagas] = useState<VagaModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [localLoading, setLocalLoading] = useState(false);
    const { id: userId } = useUserStore().user;

    const fetchVagas = useCallback(async () => {
        try {
            setLoading(true);
            const res = await GetAllVagas({ userId });
            setVagas(res.data);
        } catch (err: any) {
            console.error(err.message);
            toast.error('Erro ao carregar vagas');
        } finally {
            setLoading(false);
        }
    }, [userId]);

    const deleteVaga = useCallback(
        async (vagaId: string) => {
            try {
                setLocalLoading(true);
                await DeleteVaga({ vagaId, userId });
                setVagas((prev) => prev.filter((el) => el._id !== vagaId));
                toast.success('Vaga removida com sucesso');
            } catch (err: any) {
                toast.error(err.response?.data.message || 'Erro ao remover vaga');
            } finally {
                setLocalLoading(false);
            }
        },
        [userId]
    );

    const addVaga = useCallback((vaga: VagaModel) => {
        setVagas((prev) => [...prev, vaga]);
    }, []);

    const updateVaga = useCallback((vagaId: string, updatedVaga: Partial<VagaModel>) => {
        setVagas((prev) =>
            prev.map((el) => (el._id === vagaId ? { ...el, ...updatedVaga } : el))
        );
    }, []);

    useEffect(() => {
        if (userId) {
            fetchVagas();
        }
    }, [fetchVagas, userId]);

    return {
        vagas,
        loading,
        localLoading,
        deleteVaga,
        addVaga,
        updateVaga,
        refetch: fetchVagas,
    };
};


