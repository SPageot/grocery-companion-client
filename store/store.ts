import { create } from 'zustand';

const useStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn: boolean) => set({ isLoggedIn }),
  setUser: (user: any) => set({ user }),
}));

export { useStore };
