import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { Lock, Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

const CATEGORY_LABELS: Record<string, string> = {
  mens: "Men's",
  womens: "Women's",
  unisex: "New Arrivals",
};

function formatPrice(priceInCents: bigint): string {
  return `$${(Number(priceInCents) / 100).toFixed(2)}`;
}

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeItem,
    clearAll,
    subtotal,
  } = useCart();

  return (
    <TooltipProvider delayDuration={200}>
      <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
        <SheetContent
          side="right"
          data-ocid="cart.sheet"
          className="w-full sm:max-w-md bg-charcoal-dark border-l border-border flex flex-col p-0"
        >
          {/* Header */}
          <SheetHeader className="px-6 py-5 border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <ShoppingBag className="h-5 w-5 text-gold" />
                <SheetTitle className="font-display text-xl text-foreground">
                  Your Cart
                </SheetTitle>
              </div>
              <button
                type="button"
                onClick={closeCart}
                data-ocid="cart.close_button"
                className="text-muted-foreground hover:text-foreground transition-colors rounded p-1 focus-visible:ring-2 focus-visible:ring-gold outline-none"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <SheetDescription className="font-body text-sm text-muted-foreground mt-1">
              {items.length === 0
                ? "Your cart is empty"
                : `${items.length} item${items.length > 1 ? "s" : ""} in your cart`}
            </SheetDescription>
          </SheetHeader>

          {/* Empty State */}
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-16 px-6">
              <div className="w-20 h-20 rounded-full bg-charcoal-light border border-border flex items-center justify-center mb-5">
                <ShoppingBag className="h-8 w-8 text-muted-foreground" />
              </div>
              <p className="font-display text-xl font-semibold text-foreground mb-2">
                Empty Cart
              </p>
              <p className="font-body text-sm text-muted-foreground text-center mb-6">
                Looks like you haven't added anything yet.
              </p>
              <Button
                onClick={closeCart}
                className="gold-gradient text-charcoal font-body font-bold text-sm border-0"
                data-ocid="cart.continue_button"
              >
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <ScrollArea className="flex-1 px-6">
                <div className="py-4 space-y-4">
                  <AnimatePresence initial={false}>
                    {items.map((item, index) => (
                      <motion.div
                        key={item.productId.toString()}
                        data-ocid={`cart.item.${index + 1}`}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: -20,
                          height: 0,
                          marginBottom: 0,
                        }}
                        transition={{ duration: 0.25 }}
                        className="flex gap-3"
                      >
                        {/* Image swatch */}
                        <div
                          className={cn(
                            "w-16 h-20 rounded-sm flex-shrink-0 bg-gradient-to-br relative overflow-hidden",
                            item.imageGradient,
                          )}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-white/20 font-display text-xs font-bold">
                              {CATEGORY_LABELS[item.category]?.[0]}
                            </span>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-body font-semibold text-sm text-foreground leading-tight line-clamp-2">
                              {item.productName}
                            </h4>
                            <button
                              type="button"
                              onClick={() => removeItem(item.productId)}
                              data-ocid={`cart.delete_button.${index + 1}`}
                              className="flex-shrink-0 text-muted-foreground hover:text-destructive transition-colors mt-0.5"
                              aria-label={`Remove ${item.productName}`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>

                          <p className="font-body text-xs text-muted-foreground mt-0.5">
                            {CATEGORY_LABELS[item.category]}
                          </p>

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity controls */}
                            <div className="flex items-center gap-2 bg-charcoal-light rounded-sm border border-border">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.productId, -1)
                                }
                                className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="font-body text-sm font-medium text-foreground w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.productId, 1)
                                }
                                className="w-7 h-7 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Increase quantity"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>

                            <span className="font-display font-bold text-sm text-gold">
                              {formatPrice(item.price * BigInt(item.quantity))}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </ScrollArea>

              {/* Footer */}
              <div className="flex-shrink-0 border-t border-border px-6 py-5">
                {/* Subtotal */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-body text-sm text-muted-foreground">
                    Subtotal
                  </span>
                  <span className="font-display text-2xl font-bold text-foreground">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <Separator className="mb-4 bg-border" />

                {/* Actions */}
                <div className="space-y-3">
                  {/* Checkout (disabled with tooltip) */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="w-full">
                        <Button
                          disabled
                          data-ocid="cart.checkout_button"
                          className="w-full gold-gradient text-charcoal font-body font-bold text-sm tracking-wide uppercase h-12 opacity-60 cursor-not-allowed border-0"
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          Checkout
                        </Button>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent
                      side="top"
                      className="bg-charcoal-light border border-border text-foreground font-body text-xs"
                    >
                      Coming Soon — Online checkout launching shortly!
                    </TooltipContent>
                  </Tooltip>

                  {/* Clear cart */}
                  <button
                    type="button"
                    onClick={clearAll}
                    className="w-full font-body text-xs text-muted-foreground hover:text-destructive transition-colors py-1"
                    aria-label="Clear cart"
                  >
                    Clear all items
                  </button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}
