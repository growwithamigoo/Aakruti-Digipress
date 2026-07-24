"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Albums", href: "/albums" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Occasions", href: "/occasions" },
  { name: "Photo Printing", href: "/photo-printing" },
  { name: "For Photographers", href: "/for-photographers" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-black/5 ${
        isScrolled ? "bg-brand-ivory/95 backdrop-blur-md py-3 shadow-sm" : "bg-brand-ivory py-5"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative h-14 w-44 shrink-0 scale-[1.2] md:scale-[1.35] origin-left transition-transform">
          <Image
            src="/aklogo.png"
            alt="Aakruti Digipress Logo"
            fill
            sizes="(max-width: 768px) 176px, 176px"
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden xl:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-wide text-brand-charcoal/80 hover:text-brand-charcoal transition-colors hover:underline decoration-brand-gold underline-offset-4"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden xl:flex items-center gap-4">
          <Button asChild className="bg-brand-charcoal text-white hover:bg-black rounded-none px-6 tracking-wide">
            <Link href="https://wa.me/919177888499" target="_blank">
              WhatsApp Enquiry
            </Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="xl:hidden p-2 -mr-2 text-brand-charcoal relative z-[100] cursor-pointer"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[70px] bg-brand-ivory z-40 flex flex-col pt-10 px-6 xl:hidden overflow-y-auto">
          <nav className="flex flex-col gap-6 mb-10">
            {navLinks.map((link) => (
               <Link
               key={link.name}
               href={link.href}
               onClick={() => setMobileMenuOpen(false)}
               className="text-2xl font-heading text-brand-charcoal border-b border-black/10 pb-4"
             >
               {link.name}
             </Link>
            ))}
          </nav>
          <Button asChild className="bg-brand-charcoal text-white rounded-none py-6 text-lg w-full mb-10">
            <Link href="https://wa.me/919177888499" target="_blank">
              WhatsApp Enquiry
            </Link>
          </Button>
        </div>
      )}
    </header>
  );
}
