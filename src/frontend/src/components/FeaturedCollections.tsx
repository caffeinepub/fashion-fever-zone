import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { Variants } from "motion/react";
import { motion } from "motion/react";

const COLLECTIONS = [
  {
    id: "mens",
    label: "Men's Collection",
    description:
      "Refined essentials and statement pieces for the modern gentleman.",
    image: "/assets/generated/mens-collection.dim_600x700.jpg",
    href: "#men",
    gradient: "from-charcoal/60 to-charcoal/90",
  },
  {
    id: "womens",
    label: "Women's Collection",
    description:
      "Timeless elegance meets contemporary silhouettes for every occasion.",
    image: "/assets/generated/womens-collection.dim_600x700.jpg",
    href: "#women",
    gradient: "from-charcoal/60 to-charcoal/90",
  },
  {
    id: "new",
    label: "New Arrivals",
    description:
      "Fresh drops and season-defining pieces — be the first to wear it.",
    image: null,
    href: "#products",
    gradient: "from-amber-900/80 to-charcoal/95",
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

export default function FeaturedCollections() {
  return (
    <section id="collections" className="py-24 lg:py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-gold font-body text-xs font-semibold tracking-[0.3em] uppercase mb-3">
            Explore
          </p>
          <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground">
            Shop by Collection
          </h2>
        </motion.div>

        {/* Collection cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {COLLECTIONS.map((col) => (
            <motion.div
              key={col.id}
              variants={cardVariants}
              className="group relative overflow-hidden rounded-sm cursor-pointer card-hover"
              style={{ aspectRatio: "6/7" }}
            >
              {/* Background */}
              {col.image ? (
                <img
                  src={col.image}
                  alt={col.label}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              ) : (
                /* New Arrivals: decorative gradient background */
                <div className="absolute inset-0 bg-gradient-to-br from-amber-800/60 via-charcoal to-charcoal-dark">
                  <div
                    className="absolute inset-0"
                    style={{
                      backgroundImage:
                        "repeating-linear-gradient(45deg, oklch(0.78 0.12 70 / 0.05) 0px, oklch(0.78 0.12 70 / 0.05) 1px, transparent 1px, transparent 20px)",
                    }}
                  />
                  {/* Decorative circles */}
                  <div className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full bg-gold/5 blur-3xl" />
                  <div className="absolute bottom-1/4 right-1/4 w-32 h-32 rounded-full bg-amber-500/10 blur-2xl" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="text-gold/20 font-display text-8xl font-bold leading-none select-none">
                      NEW
                    </div>
                  </div>
                </div>
              )}

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t ${col.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-6 lg:p-8">
                <h3 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-2">
                  {col.label}
                </h3>
                <p className="font-body text-sm text-foreground/70 mb-5 leading-relaxed">
                  {col.description}
                </p>
                <a href={col.href}>
                  <Button
                    variant="ghost"
                    className="w-fit border border-gold/50 text-gold hover:bg-gold hover:text-charcoal font-body text-xs font-bold tracking-widest uppercase px-5 py-2 h-auto transition-all duration-300 group/btn"
                    data-ocid={`collections.${col.id}.button`}
                  >
                    Shop Now
                    <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
