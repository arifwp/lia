import { create } from "zustand";
import { BasicData } from "../components/texts/TextRounded";

interface SearchFilterStore {
  categories: BasicData[];
  radius: number;
  setCategories: (category: BasicData) => void;
  setRadius: (radius: number) => void;
}

let radiusTimeout: NodeJS.Timeout | null = null;

export const useSearchFilterStore = create<SearchFilterStore>((set) => ({
  categories: [],
  radius: 25,
  setCategories: (category: BasicData) =>
    set((state) => {
      const exist = state.categories.find((item) => item.id === category.id);
      if (exist) {
        return {
          categories: state.categories.filter(
            (item) => item.id !== category.id
          ),
        };
      } else {
        return { categories: [...state.categories, category] };
      }
    }),
  setRadius: (radius: number) => {
    if (radiusTimeout) clearTimeout(radiusTimeout);
    radiusTimeout = setTimeout(() => {
      set({ radius });
    }, 300);
  },
}));
