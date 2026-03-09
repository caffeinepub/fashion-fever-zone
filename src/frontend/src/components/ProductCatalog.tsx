import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SEED_PRODUCTS } from "@/hooks/useQueries";
import { motion } from "motion/react";
import { useState } from "react";
import { Category } from "../backend.d";
import ProductCard from "./ProductCard";

const TABS = [
  { value: "all", label: "All" },
  { value: Category.mens, label: "Men's" },
  { value: Category.womens, label: "Women's" },
];

export default function ProductCatalog() {
  const [activeTab, setActiveTab] = useState("all");

  const filteredProducts =
    activeTab === "all"
      ? SEED_PRODUCTS
      : SEED_PRODUCTS.filter((p) => p.category === activeTab);

  return (
    <section id="products" className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-gold font-body text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Catalog
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
            Our Products
          </h2>
        </motion.div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex justify-center mb-10">
            <TabsList className="bg-charcoal-light border border-border h-auto p-1 gap-1">
              {TABS.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  data-ocid="products.tab"
                  className="font-body text-sm font-medium px-6 py-2 rounded-sm data-[state=active]:gold-gradient data-[state=active]:text-charcoal data-[state=active]:shadow-none transition-all duration-200"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-0">
              {filteredProducts.length === 0 ? (
                <div
                  data-ocid="products.empty_state"
                  className="text-center py-20 text-muted-foreground"
                >
                  <p className="font-body text-lg">
                    No products in this category yet.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredProducts.map((product, index) => (
                    <ProductCard
                      key={product.id.toString()}
                      product={product}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
