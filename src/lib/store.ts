// Zustand store to manage list of subjects

import { create } from "zustand";

// Define shape of state
interface State {
  items: Note[];
  setItems: (items: Note[]) => void;

  // Could add school term if the application is way big
  // term: string | null;
  // setTerm: (term: string) => void;
}

// Interface for individual subject (note)
interface Note {
  _id: string;
  name: string;
  groupId: string;
  views: number;
  title: string;
  subjectId: {
    activeImage: string;
  };
  termId: {
    name: string;
  };
}

// Create the zustand store
const useStore = create<State>((set) => ({
  // Initialize state
  items: [],

  // Allow replacing all items
  setItems: (items) => set({ items }),

  // term: null,
  // setTerm: (term) => set({term})
}));

// Export hook to access state
export const subjectItems = useStore;
