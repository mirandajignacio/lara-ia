import { create } from "zustand";

interface GlobalState {
  toast: string | null;
  showToast: (text: string) => void;
}

const useGlobalStore = create<GlobalState>()((set) => ({
  toast: null,
  showToast: (text) =>
    set((state) => {
      return { ...state, toast: text };
    }),
}));

export { useGlobalStore };
