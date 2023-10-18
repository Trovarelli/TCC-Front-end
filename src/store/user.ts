import {StoreApi, UseBoundStore, create} from 'zustand';

type userType = {
    token: string;
    nome: string;
    empresa: string;
    foto?: string;
}

type userStoreType = UseBoundStore<StoreApi<{
    token: string;
    nome: string;
    empresa: string;
    foto: string;
    setUserState: (v: userType) => void;
    setUserFoto: (v: string) => void;
    removeUserState: () => void
}>>

export const useUsertore: userStoreType = create((set) => ({
    token: '',
    nome: '',
    empresa: '',
    foto: '',
    setUserState: (u: userType) => set(() => ({ token: u.token, nome: u.nome, empresa: u.empresa })),
    setUserFoto: (f: string) => set((state) => ({...state, foto: f})),
    removeUserState: () => set({ token: '', nome: '', empresa: '' }),
  }))