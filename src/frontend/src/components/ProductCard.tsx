import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import type { SeedProduct } from "@/hooks/useQueries";
import { cn } from "@/lib/utils";
import { ShoppingBag, Tag } from "lucide-react";
import { motion } from "motion/react";

const CATEGORY_LABELS: Record<string, string> = {
  mens: "Men's",
  womens: "Women's",
  unisex: "New Arrivals",
};

const CATEGORY_BADGE_COLORS: Record<string, string> = {
  mens: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  womens: "bg-rose-500/20 text-rose-300 border-rose-500/30",
  unisex: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

function formatPrice(priceInCents: bigint): string {
  return `$${(Number(priceInCents) / 100).toFixed(2)}`;
}

interface ProductCardProps {
  product: SeedProduct;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      price: product.price,
      category: product.category,
      imageGradient: product.imageGradient,
    });
  };

  return (
    <motion.article
      data-ocid={`products.item.${index + 1}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1 }}
      className="group relative bg-card border border-border rounded-sm overflow-hidden card-hover"
    >
      {/* Product Image Area */}
      <div
        className={cn(
          "relative aspect-[3/4] bg-gradient-to-br overflow-hidden",
          product.imageGradient,
        )}
      >
        {/* Texture overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 12px)",
          }}
        />

        {/* Category label decoration */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white/10 font-display text-6xl font-bold leading-none select-none text-center px-4">
            {CATEGORY_LABELS[product.category]}
          </div>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />

        {/* Category badge overlay */}
        <div className="absolute top-3 left-3">
          <Badge
            variant="outline"
            className={cn(
              "text-xs font-body font-medium border",
              CATEGORY_BADGE_COLORS[product.category],
            )}
          >
            <Tag className="h-2.5 w-2.5 mr-1" />
            {CATEGORY_LABELS[product.category]}
          </Badge>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-display font-bold text-base text-foreground mb-1 truncate">
          {product.name}
        </h3>
        <p className="font-body text-xs text-muted-foreground mb-3 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-bold text-gold">
            {formatPrice(product.price)}
          </span>
          <Button
            size="sm"
            onClick={handleAddToCart}
            data-ocid={`products.add_button.${index + 1}`}
            className="gold-gradient text-charcoal font-body font-bold text-xs tracking-wide border-0 hover:opacity-90 transition-opacity h-8 px-3"
          >
            <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
            Add
          </Button>
        </div>
      </div>
    </motion.article>
  );
}
