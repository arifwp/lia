import { create } from "zustand";

export interface SelectedVariantCheckout {
  id: string;
  price: number;
}

export interface VariantCheckout {
  id: string;
  selectedVariants: SelectedVariantCheckout[];
}

export interface FoodCheckout {
  idFood: string;
  qty: number;
  price: number;
  variants: VariantCheckout[];
}

interface CheckoutStore {
  items: FoodCheckout[];
  addItem: (item: FoodCheckout) => void;
  updateItem: (
    idFood: string,
    variants: VariantCheckout[],
    updates: Partial<FoodCheckout>
  ) => void;
  deleteItem: (idFood: string, variants?: VariantCheckout[]) => void;
  clear: () => void;
  getTotalPrice: () => number;
  getItemTotalPrice: (item: FoodCheckout) => number;
}

/**
 * Compare two SelectedVariantCheckout arrays
 */
const areSelectedVariantsEqual = (
  selected1: SelectedVariantCheckout[],
  selected2: SelectedVariantCheckout[]
): boolean => {
  if (selected1.length !== selected2.length) return false;

  // Sort by id for consistent comparison
  const sorted1 = [...selected1].sort((a, b) => a.id.localeCompare(b.id));
  const sorted2 = [...selected2].sort((a, b) => a.id.localeCompare(b.id));

  return sorted1.every((v1, index) => {
    const v2 = sorted2[index];
    return v1.id === v2.id && v1.price === v2.price;
  });
};

/**
 * Compare two variant arrays to check if they're identical
 * Compares variant IDs and their selectedVariants (id and price)
 */
const areVariantsEqual = (
  variants1: VariantCheckout[],
  variants2: VariantCheckout[]
): boolean => {
  if (variants1.length !== variants2.length) return false;

  // Sort variants by id for consistent comparison
  const sorted1 = [...variants1].sort((a, b) => a.id.localeCompare(b.id));
  const sorted2 = [...variants2].sort((a, b) => a.id.localeCompare(b.id));

  return sorted1.every((v1, index) => {
    const v2 = sorted2[index];
    if (v1.id !== v2.id) return false;

    return areSelectedVariantsEqual(v1.selectedVariants, v2.selectedVariants);
  });
};

/**
 * Find item index by idFood and variants
 */
const findItemIndex = (
  items: FoodCheckout[],
  idFood: string,
  variants: VariantCheckout[]
): number => {
  return items.findIndex(
    (item) =>
      item.idFood === idFood && areVariantsEqual(item.variants, variants)
  );
};

/**
 * Calculate total price for a single item (base price + variant prices) * qty
 */
const calculateItemTotalPrice = (item: FoodCheckout): number => {
  const variantTotal = item.variants.reduce((sum, variant) => {
    const variantPrice = variant.selectedVariants.reduce(
      (vSum, selected) => vSum + selected.price,
      0
    );
    return sum + variantPrice;
  }, 0);

  return (item.price + variantTotal) * item.qty;
};

export const useCheckoutStore = create<CheckoutStore>((set, get) => ({
  items: [],

  /**
   * Add item to cart
   * - If same idFood AND same variants exist: increment qty
   * - If same idFood BUT different variants: add as new item
   */
  addItem: (item) =>
    set((state) => {
      const existingIndex = findItemIndex(
        state.items,
        item.idFood,
        item.variants
      );

      // Same item with same variants found → increment qty
      if (existingIndex !== -1) {
        const updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          qty: updatedItems[existingIndex].qty + item.qty,
        };
        return { items: updatedItems };
      }

      // New item or different variants → add as new entry
      return { items: [...state.items, item] };
    }),

  /**
   * Update specific item by idFood and variants
   * Allows partial updates (qty, variants, price, etc.)
   *
   * @param idFood - Food ID to update
   * @param variants - Current variants to identify the exact item
   * @param updates - Partial updates to apply
   */
  updateItem: (idFood, variants, updates) =>
    set((state) => {
      const existingIndex = findItemIndex(state.items, idFood, variants);

      if (existingIndex === -1) {
        console.warn(
          `Item with idFood: ${idFood} and specified variants not found`
        );
        return state;
      }

      const updatedItems = [...state.items];
      const currentItem = updatedItems[existingIndex];

      // If variants are being updated, check for duplicates
      if (updates.variants) {
        const newVariants = updates.variants;
        const duplicateIndex = findItemIndex(
          state.items.filter((_, i) => i !== existingIndex),
          idFood,
          newVariants
        );

        // If updating variants creates a duplicate, merge them
        if (duplicateIndex !== -1) {
          const adjustedIndex =
            duplicateIndex >= existingIndex
              ? duplicateIndex + 1
              : duplicateIndex;
          updatedItems[adjustedIndex] = {
            ...updatedItems[adjustedIndex],
            qty:
              updatedItems[adjustedIndex].qty +
              (updates.qty ?? currentItem.qty),
          };
          // Remove the original item
          updatedItems.splice(existingIndex, 1);
          return { items: updatedItems };
        }
      }

      // Normal update
      updatedItems[existingIndex] = {
        ...currentItem,
        ...updates,
      };

      return { items: updatedItems };
    }),

  /**
   * Delete item from cart
   * - If variants provided: delete specific variant combination
   * - If variants not provided: delete ALL items with that idFood
   *
   * @param idFood - Food ID to delete
   * @param variants - Optional: specific variants to delete
   */
  deleteItem: (idFood, variants) =>
    set((state) => {
      if (variants) {
        // Delete specific item with matching variants
        const indexToDelete = findItemIndex(state.items, idFood, variants);
        if (indexToDelete === -1) return state;

        return {
          items: state.items.filter((_, index) => index !== indexToDelete),
        };
      }

      // Delete all items with matching idFood
      return {
        items: state.items.filter((item) => item.idFood !== idFood),
      };
    }),

  /**
   * Clear all items from cart
   */
  clear: () => set({ items: [] }),

  /**
   * Get total price of all items in cart
   * Calculates (base price + all variant prices) * qty for each item
   */
  getTotalPrice: () => {
    const state = get();
    return state.items.reduce((total, item) => {
      return total + calculateItemTotalPrice(item);
    }, 0);
  },

  /**
   * Get total price for a specific item
   * Calculates (base price + all variant prices) * qty
   */
  getItemTotalPrice: (item: FoodCheckout) => {
    return calculateItemTotalPrice(item);
  },
}));
