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
    removeUserState: () => void
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
            setUserState: (u: userType) => set({ user: u }),
            removeUserState: () => set({ user: { id: '', email: '', token: '', nome: '', empresa: '', foto: '' } }),
          }),
      {
        name: 'user-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )