import { create } from "zustand";

// Create a global store
const useStore = create((set) => ({
  count: 0, // initial state

  // actions
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  reset: () => set({ count: 0 }),
}));

export default useStore;