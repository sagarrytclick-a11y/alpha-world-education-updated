"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, Phone, Mail, MapPin, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { SITE_IDENTITY } from "@/site-identity";
import { useContactInfo } from "@/hooks/useContactInfo";
import { useFormModal } from "@/context/FormModalContext";
import { useDropdownData } from "@/hooks/useDropdownData";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const { emails, phones, address } = useContactInfo();
  const pathname = usePathname();
  const { openModal } = useFormModal();
  const { colleges, exams, countries, loading } = useDropdownData();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Colleges", href: "/colleges", hasDropdown: true },
    { name: "Exams", href: "/exams", hasDropdown: true },
    { name: "Countries", href: "/countries", hasDropdown: true },
    { name: "Blog", href: "/blogs" },
    { name: "Services", href: "/service" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const dropdownContent = {
    Colleges: colleges.map(college => ({
      title: college.name,
      href: `/colleges/${college.slug}`
    })),
    Exams: exams.map(exam => ({
      title: exam.name,
      href: `/exams/${exam.slug}`
    })),
    Countries: countries.map(country => ({
      title: `Study in ${country.name}`,
      href: `/countries/${country.slug}`,
      flag: country.flag
    })),
  };

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname?.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/98 backdrop-blur-lg shadow-xl border-b border-green-100 transform scale-[1.01]"
          : "bg-white/90 backdrop-blur-sm shadow-sm transform scale-100"
      }`}
    >
      {/* TOP CONTACT BAR */}
      <div className="hidden bg-gradient-to-r from-slate-900 to-slate-800 text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 text-sm">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${phones.primaryRaw}`}
              className="flex items-center gap-2 hover:text-green-400 transition-colors duration-200"
            >
              <Phone size={14} />
              <span className="hidden xl:inline">
                {phones.primary}
              </span>
              <span className="xl:hidden">Call Us</span>
            </a>
            <a
              href={`mailto:${emails.info}`}
              className="flex items-center gap-2 hover:text-green-400 transition-colors duration-200"
            >
              <Mail size={14} />
              <span className="hidden xl:inline">
                {emails.info}
              </span>
              <span className="xl:hidden">Email</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-slate-300">
            <MapPin size={14} />
            <span className="hidden xl:inline">
              {address.office}, {address.city}
            </span>
            <span className="xl:hidden">
              {address.city}, {address.country}
            </span>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION */}
      <div className="border-b border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 lg:h-20 items-center justify-between">
            {/* LOGO */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Image
                  src={SITE_IDENTITY.assets.logo.main}
                  alt={SITE_IDENTITY.name}
                  width={60}
                  height={60}
                  className="transition-transform duration-300 group-hover:scale-110"
                  priority
                />
              </div>
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 text-md font-semibold transition-all duration-200 rounded-lg flex items-center gap-1 ${
                      isActive(item.href)
                        ? "text-green-600 bg-green-50"
                        : "text-slate-700 hover:text-green-500 hover:bg-slate-50"
                    }`}
                  >
                    {item.name}
                    {item.hasDropdown && <ChevronDown size={14} className="transition-transform duration-200" />}
                  </Link>
                  
                  {/* Dropdown Menu */}
                  {item.hasDropdown && hoveredItem === item.name && (
                    <div className="absolute top-full left-0 mt-1 w-64 bg-white rounded-lg shadow-lg border border-slate-100 py-2 z-50">
                      {loading ? (
                        <div className="px-4 py-3 text-sm text-slate-500">Loading...</div>
                      ) : dropdownContent[item.name as keyof typeof dropdownContent].length > 0 ? (
                        dropdownContent[item.name as keyof typeof dropdownContent].map((dropdownItem) => (
                          <Link
                            key={dropdownItem.title}
                            href={dropdownItem.href}
                            className="block px-4 py-3 text-sm font-medium text-slate-700 hover:text-green-600 hover:bg-green-50 transition-all duration-200"
                          >
                            <div className="flex items-center gap-3">
                              {'flag' in dropdownItem && dropdownItem.flag && (
                                <span className="text-lg">{dropdownItem.flag}</span>
                              )}
                              <span>{dropdownItem.title}</span>
                            </div>
                          </Link>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-slate-500">No items found</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA BUTTONS */}
            <div className="hidden lg:flex items-center gap-3">
              <button 
                onClick={openModal}
                className="px-6 py-3 text-green-600 font-semibold border-2 border-green-500 rounded-full hover:bg-green-50 transition-all duration-300"
              >
                Book Consultation
              </button>
              {/* <Link
                href="/login"
                className="inline-flex items-center px-6 py-3 text-green-600 font-semibold border-2 border-green-500 rounded-full hover:bg-green-50 transition-all duration-300"
              >
                Login
              </Link>
              <Link
                href="/sign-up"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Sign up
              </Link> */}
            </div>

            {/* MOBILE MENU BUTTON */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X size={24} className="text-slate-700" />
              ) : (
                <Menu size={24} className="text-slate-700" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`lg:hidden transition-all duration-300 overflow-hidden overflow-y-auto ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-slate-100 px-4 py-6">
          {/* Mobile Contact Info */}
          <div className="mb-6 space-y-3 pb-4 border-b border-slate-100">
            <a
              href={`tel:${phones.primaryRaw}`}
              className="flex items-center gap-3 text-slate-700 hover:text-green-500 transition-colors duration-200"
            >
              <Phone size={16} />
              <span className="text-sm">
                {phones.primary}
              </span>
            </a>
            <a
              href={`mailto:${emails.info}`}
              className="flex items-center gap-3 text-slate-700 hover:text-green-500 transition-colors duration-200"
            >
              <Mail size={16} />
              <span className="text-sm">
                {emails.info}
              </span>
            </a>
            <div className="flex items-start gap-3 text-slate-600">
              <MapPin size={16} className="mt-0.5 flex-shrink-0" />
              <span className="text-sm">
                {address.office}, {address.city}
              </span>
            </div>
          </div>

          {/* Mobile Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 ${
                  isActive(item.href)
                    ? "text-green-600 bg-green-50 "
                    : "text-slate-700 hover:text-green-500 hover:bg-green-50"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Mobile CTA */}
          <div className="mt-6 pt-4 border-t border-slate-100 space-y-3">
            <button 
              onClick={openModal}
              className="w-full px-6 py-3 text-green-600 font-semibold border-2 border-green-500 rounded-full hover:bg-green-50 transition-all duration-300"
            >
              Book Consultation
            </button>
            {/* <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block w-full text-green-600 font-semibold border-2 border-green-500 text-center px-6 py-3 rounded-full hover:bg-green-50 transition-all duration-300"
            >
              Login
            </Link>
            <Link
              href="/sign-up"
              onClick={() => setIsOpen(false)}
              className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold text-center px-6 py-3 rounded-full transition-all duration-300"
            >
              Sign up
            </Link> */}
          </div>
        </div>
      </div>

    </header>
  );
}