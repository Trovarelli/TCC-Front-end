import { useMemo } from 'react';
import { CandidatoModel } from '@/api/models';
import { sanitizeTags } from '@/utils/formatters';

interface FilterOptions {
    tags: string[];
    onlyFavorites: boolean;
}

export const useCandidatoFilter = (
    candidatos: CandidatoModel[],
    { tags, onlyFavorites }: FilterOptions
) => {
    const filteredCandidatos = useMemo(() => {
        let filtered = candidatos;

        
        if (onlyFavorites) {
            filtered = filtered.filter((el) => el.favorito === true);
        }

        
        if (tags.length > 0) {
            const precisionTags = sanitizeTags(tags.filter((el) => el.includes(':')));
            const normalTags = sanitizeTags(tags.filter((el) => !el.includes(':')));

            filtered = filtered.filter((el) => {
                const matchesPrecision = el.matchField.some(
                    (filter) => precisionTags.includes(filter) && filter.split(':')[1]
                );
                const matchesNormal = el.matchField.some(
                    (filter) =>
                        normalTags.includes(filter.split(':')[1]) && filter.split(':')[1]
                );
                return matchesPrecision || matchesNormal;
            });
        }

        return filtered;
    }, [candidatos, tags, onlyFavorites]);

    return filteredCandidatos;
};


