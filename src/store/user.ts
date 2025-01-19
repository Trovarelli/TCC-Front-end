import {StoreApi, UseBoundStore, create} from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

type userType = {
    id: string;
    email: string;
    token: string;
    nome: string;
    empresa: string;
    foto: string;
}

type userStoreType = UseBoundStore<StoreApi<{
    user: userType
    setUserState: (v: userType) => void;
    removeUserState: () => void;
    apiKey: string;
    setApiKey: (v: string) => void;
    removeApiKey: () => void;
}>>

  export const useUsertore: userStoreType = create(
    persist(
        (set) => ({
            user: {
              id: '',
              email: '',
              token: '',
              nome: '',
              empresa: '',
              foto: '',
            },
            apiKey: '',
            setApiKey: (k: string) => set((p) => ({...p, apiKey: k})),
            removeApiKey: () => set((p) => ({...p, apiKey: ''})),
            setUserState: (u: userType) => set((p) => ({...p, user: u })),
            removeUserState: () => set({ user: { id: '', email: '', token: '', nome: '', empresa: '', foto: ''} }),
          }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )