import { SiFacebook, SiInstagram, SiX } from "react-icons/si";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "Men's", href: "#men" },
  { label: "Women's", href: "#women" },
  { label: "About", href: "#about" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-charcoal-dark border-t border-border">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <img
              src="/assets/generated/logo-transparent.dim_300x100.png"
              alt="Fashion Fever Zone"
              className="h-12 w-auto object-contain mb-4"
            />
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-xs mb-6">
              Fashion Fever Zone — your premium destination for men's and
              women's clothing. Style for every season, crafted for every
              occasion.
            </p>
            {/* Social icons - decorative */}
            <div className="flex items-center gap-4">
              <span
                data-ocid="footer.instagram.link"
                aria-label="Instagram"
                className="w-9 h-9 rounded-sm border border-border flex items-center justify-center text-muted-foreground cursor-default"
              >
                <SiInstagram className="h-4 w-4" />
              </span>
              <span
                data-ocid="footer.facebook.link"
                aria-label="Facebook"
                className="w-9 h-9 rounded-sm border border-border flex items-center justify-center text-muted-foreground cursor-default"
              >
                <SiFacebook className="h-4 w-4" />
              </span>
              <span
                data-ocid="footer.twitter.link"
                aria-label="Twitter / X"
                className="w-9 h-9 rounded-sm border border-border flex items-center justify-center text-muted-foreground cursor-default"
              >
                <SiX className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground mb-5 tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    data-ocid={`footer.${link.label.toLowerCase().replace("'s", "")}.link`}
                    className="font-body text-sm text-muted-foreground hover:text-gold transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-bold text-sm text-foreground mb-5 tracking-wider uppercase">
              Contact Us
            </h4>
            <ul className="space-y-4 font-body text-sm text-muted-foreground">
              <li className="flex flex-col gap-1">
                <span className="text-xs font-medium text-foreground/60 uppercase tracking-wider">
                  Address
                </span>
                <span>
                  123 Fashion Street,
                  <br />
                  Style District, NY 10001
                </span>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-xs font-medium text-foreground/60 uppercase tracking-wider">
                  Phone
                </span>
                <a
                  href="tel:+15551234567"
                  className="hover:text-gold transition-colors"
                >
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex flex-col gap-1">
                <span className="text-xs font-medium text-foreground/60 uppercase tracking-wider">
                  Email
                </span>
                <a
                  href="mailto:hello@fashionfeverzone.com"
                  className="hover:text-gold transition-colors"
                >
                  hello@fashionfeverzone.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-muted-foreground">
            © {year} Fashion Fever Zone. All rights reserved.
          </p>
          <p className="font-body text-xs text-muted-foreground">
            Built with ❤️ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
