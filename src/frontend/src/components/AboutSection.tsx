import { CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";

const VALUES = [
  {
    title: "Premium Quality",
    description:
      "Every garment is crafted from carefully selected materials. We partner with trusted manufacturers who share our commitment to quality construction and lasting durability.",
  },
  {
    title: "Timeless Style",
    description:
      "We curate collections that transcend seasonal trends — pieces that work across occasions and stand the test of time. Fashion that feels as current in five years as it does today.",
  },
  {
    title: "Accessible Luxury",
    description:
      "Exceptional fashion shouldn't break the bank. Fashion Fever Zone bridges the gap between high-end boutique quality and prices that let you build a wardrobe you love.",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left: decorative */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Layered background decoration */}
              <div className="absolute -top-6 -left-6 w-full h-full border border-gold/20 rounded-sm" />
              <div className="absolute -top-3 -left-3 w-full h-full border border-gold/10 rounded-sm" />
              {/* Main content box */}
              <div className="relative w-full h-full bg-gradient-to-br from-charcoal-light to-charcoal-dark rounded-sm overflow-hidden flex flex-col items-center justify-center p-12">
                {/* Geometric decoration */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, oklch(0.78 0.12 70 / 0.04) 0px, oklch(0.78 0.12 70 / 0.04) 1px, transparent 1px, transparent 24px)",
                  }}
                />
                <div className="relative z-10 text-center">
                  <div className="font-display text-8xl lg:text-9xl font-bold text-gold/10 leading-none mb-4 select-none">
                    FFZ
                  </div>
                  <div className="w-16 h-px bg-gold/30 mx-auto mb-6" />
                  <p className="font-display text-2xl lg:text-3xl font-bold text-foreground">
                    Est. 2020
                  </p>
                  <p className="font-body text-sm text-muted-foreground mt-2">
                    Serving Style Since Day One
                  </p>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-gold/30" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r border-t border-gold/30" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-gold/30" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r border-b border-gold/30" />
              </div>
            </div>
          </motion.div>

          {/* Right: text content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-gold font-body text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              Our Story
            </p>
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Where Fashion
              <br />
              <span className="text-gold-gradient italic">Meets Passion</span>
            </h2>
            <p className="font-body text-base text-muted-foreground mb-4 leading-relaxed">
              Fashion Fever Zone was born from a simple belief: everyone
              deserves to look and feel extraordinary. We're a premium clothing
              boutique for men and women, dedicated to bringing you curated
              collections that blend contemporary trends with timeless elegance.
            </p>
            <p className="font-body text-base text-muted-foreground mb-10 leading-relaxed">
              From sharp suiting to effortless casual wear, our inventory spans
              the full spectrum of modern style — because your wardrobe should
              be as dynamic and versatile as you are.
            </p>

            {/* Values */}
            <div className="space-y-6">
              {VALUES.map((value, idx) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-base text-foreground mb-1">
                      {value.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
