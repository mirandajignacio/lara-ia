import { create } from "zustand";

interface BearState {
  toast: string | null;
  showToast: (text: string) => void;
}

const useGlobalStore = create<BearState>()((set) => ({
  toast: null,
  showToast: (text) =>
    set((state) => {
      return { ...state, toast: text };
    }),
}));

export { useGlobalStore };
