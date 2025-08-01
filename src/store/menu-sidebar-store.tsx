import { create } from "zustand"

type MenuSidebarStore = {
	open: boolean
	setOpen: (val: boolean) => void
	toggle: () => void
}

export const useMenuSidebarStore = create<MenuSidebarStore>((set) => ({
	open: false,
	setOpen: (val) => set({ open: val }),
	toggle: () => set((state) => ({ open: !state.open })),
}))
