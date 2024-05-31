import { create } from "zustand"

export type AdminStoreStateType = {
  isDark: boolean
  toggleTheme: () => void
}

export const useAdminStore = create<AdminStoreStateType>((set) => ({
  isDark: false,
  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}))
