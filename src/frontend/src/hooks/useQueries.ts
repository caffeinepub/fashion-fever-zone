import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { CartItem, Product } from "../backend.d";
import { Category } from "../backend.d";
import { useActor } from "./useActor";

// ── Sample seed data (frontend only, never passed to backend) ──────────────
export interface SeedProduct {
  id: bigint;
  name: string;
  description: string;
  category: Category;
  price: bigint;
  imageGradient: string;
}

export const SEED_PRODUCTS: SeedProduct[] = [
  // Men's
  {
    id: 1n,
    name: "Classic Oxford Shirt",
    description:
      "Timeless cotton oxford shirt with a regular fit and button-down collar.",
    category: Category.mens,
    price: 4500n,
    imageGradient: "from-slate-700 to-slate-900",
  },
  {
    id: 2n,
    name: "Slim Fit Chinos",
    description:
      "Modern slim-fit chinos crafted from stretch twill for all-day comfort.",
    category: Category.mens,
    price: 5500n,
    imageGradient: "from-stone-600 to-stone-800",
  },
  {
    id: 3n,
    name: "Casual Polo Shirt",
    description:
      "Premium pique polo shirt with a refined silhouette and contrast details.",
    category: Category.mens,
    price: 3500n,
    imageGradient: "from-indigo-700 to-indigo-900",
  },
  {
    id: 4n,
    name: "Denim Jacket",
    description:
      "Classic denim jacket with a modern cut, raw hem, and copper hardware.",
    category: Category.mens,
    price: 8500n,
    imageGradient: "from-blue-800 to-blue-950",
  },
  {
    id: 5n,
    name: "Formal Blazer",
    description:
      "Sharp single-breasted blazer in premium wool blend for formal occasions.",
    category: Category.mens,
    price: 12000n,
    imageGradient: "from-zinc-700 to-zinc-900",
  },
  // Women's
  {
    id: 6n,
    name: "Floral Wrap Dress",
    description:
      "Feminine wrap dress in a vibrant floral print with a flattering silhouette.",
    category: Category.womens,
    price: 6500n,
    imageGradient: "from-rose-600 to-rose-900",
  },
  {
    id: 7n,
    name: "High-Waist Jeans",
    description:
      "Elevated high-waist jeans with a straight leg cut and premium stretch denim.",
    category: Category.womens,
    price: 6000n,
    imageGradient: "from-sky-700 to-sky-900",
  },
  {
    id: 8n,
    name: "Elegant Blouse",
    description:
      "Silk-touch blouse with a relaxed drape, V-neckline, and mother-of-pearl buttons.",
    category: Category.womens,
    price: 4000n,
    imageGradient: "from-violet-600 to-violet-900",
  },
  {
    id: 9n,
    name: "Maxi Skirt",
    description:
      "Flowing maxi skirt in lightweight satin with an elastic waistband.",
    category: Category.womens,
    price: 5000n,
    imageGradient: "from-pink-600 to-pink-900",
  },
  {
    id: 10n,
    name: "Knit Cardigan",
    description:
      "Cozy chunky-knit cardigan in a relaxed oversized fit with deep-set pockets.",
    category: Category.womens,
    price: 5500n,
    imageGradient: "from-amber-700 to-amber-900",
  },
  // Unisex / New Arrivals
  {
    id: 11n,
    name: "Graphic Tee",
    description:
      "Artist-collaboration graphic tee in 100% organic cotton, unisex sizing.",
    category: Category.unisex,
    price: 2500n,
    imageGradient: "from-emerald-700 to-emerald-900",
  },
  {
    id: 12n,
    name: "Hoodie",
    description:
      "Heavyweight premium hoodie with a brushed fleece interior and kangaroo pocket.",
    category: Category.unisex,
    price: 7000n,
    imageGradient: "from-neutral-600 to-neutral-800",
  },
  {
    id: 13n,
    name: "Jogger Pants",
    description:
      "Tapered jogger pants in moisture-wicking fabric with side zip pockets.",
    category: Category.unisex,
    price: 4500n,
    imageGradient: "from-teal-700 to-teal-900",
  },
];

export const gradientMap: Record<string, string> = Object.fromEntries(
  SEED_PRODUCTS.map((p) => [p.id.toString(), p.imageGradient]),
);

// ── Queries ────────────────────────────────────────────────────────────────

export function useGetAllProducts() {
  const { actor, isFetching } = useActor();
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const products = await actor.getAllProducts();
        return products;
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useGetCart() {
  const { actor, isFetching } = useActor();
  return useQuery<CartItem[]>({
    queryKey: ["cart"],
    queryFn: async () => {
      if (!actor) return [];
      try {
        const items = await actor.getCart();
        return items;
      } catch {
        return [];
      }
    },
    enabled: !!actor && !isFetching,
    staleTime: 10_000,
  });
}

export function useAddToCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      productId,
      quantity,
    }: {
      productId: bigint;
      quantity: bigint;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.addToCart(productId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}

export function useClearCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Not connected");
      await actor.clearCart();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
}
