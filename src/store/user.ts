import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface User {
  id: string;
  email: string;
  token: string;
  nome: string;
  empresa: string;
  foto: string;
}

interface UserStore {
  user: User;
  apiKey: string;
  setUserState: (user: User) => void;
  removeUserState: () => void;
  setApiKey: (key: string) => void;
  removeApiKey: () => void;
}

const initialUserState: User = {
  id: '',
  email: '',
  token: '',
  nome: '',
  empresa: '',
  foto: '',
};

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: initialUserState,
      apiKey: '',
      setApiKey: (k) => set({ apiKey: k }),
      removeApiKey: () => set({ apiKey: '' }),
      setUserState: (u) => set({ user: u }),
      removeUserState: () => set({ user: initialUserState }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);


export type { User, UserStore };


