"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLocale, useTranslation } from "@/lib/locale-context";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { locale, setLocale } = useLocale();
  const { t } = useTranslation();

  const navLinks = [
    { href: "/", label: t("nav.about") },
    { href: "/ai-tool", label: t("nav.aiTool") },
    { href: "/contact", label: t("nav.contact") },
  ];

  const toggleLocale = () => {
    setLocale(locale === "en" ? "da" : "en");
  };

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="navbar-logo">
          SynthReport
        </Link>

        <button
          className="navbar-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={t("nav.toggleMenu")}
        >
          <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
          <span className={`hamburger-line ${menuOpen ? "open" : ""}`} />
        </button>

        <div className={`navbar-links ${menuOpen ? "navbar-links-open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`navbar-link ${pathname === link.href ? "navbar-link-active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <button
            className="navbar-link locale-toggle"
            onClick={toggleLocale}
            aria-label={`Switch to ${locale === "en" ? "Danish" : "English"}`}
          >
            {locale === "en" ? "DA" : "EN"}
          </button>
        </div>
      </div>
    </nav>
  );
}
