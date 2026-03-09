import { Button } from "@/components/ui/button";
import { SEED_PRODUCTS } from "@/hooks/useQueries";
import { motion } from "motion/react";
import { Category } from "../backend.d";
import ProductCard from "./ProductCard";

const mensProducts = SEED_PRODUCTS.filter((p) => p.category === Category.mens);
const womensProducts = SEED_PRODUCTS.filter(
  (p) => p.category === Category.womens,
);

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7 }}
      className="mb-10"
    >
      <p className="text-gold font-body text-xs font-semibold tracking-[0.3em] uppercase mb-2">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground">
        {title}
      </h2>
    </motion.div>
  );
}

export function MensSection() {
  return (
    <section id="men" className="py-20 bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader eyebrow="For Him" title="Men's Collection" />
          <Button
            variant="ghost"
            className="hidden sm:flex border border-border text-muted-foreground hover:text-gold hover:border-gold font-body text-xs tracking-widest uppercase px-4 py-2 h-auto transition-all duration-200"
            data-ocid="mens.view_all.button"
            onClick={() => {
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {mensProducts.map((product, index) => (
            <ProductCard
              key={product.id.toString()}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export function WomensSection() {
  return (
    <section id="women" className="py-20 bg-charcoal border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <SectionHeader eyebrow="For Her" title="Women's Collection" />
          <Button
            variant="ghost"
            className="hidden sm:flex border border-border text-muted-foreground hover:text-gold hover:border-gold font-body text-xs tracking-widest uppercase px-4 py-2 h-auto transition-all duration-200"
            data-ocid="womens.view_all.button"
            onClick={() => {
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            View All
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {womensProducts.map((product, index) => (
            <ProductCard
              key={product.id.toString()}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
