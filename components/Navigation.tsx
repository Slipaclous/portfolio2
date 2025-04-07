"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from '@/components/LanguageContext';
import { translations } from '@/lib/translations';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();
  const { language, setLanguage } = useLanguage();
  const t = translations[language].navigation;

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { href: "/", label: t.home },
    { href: "/about", label: t.about },
    { href: "/projects", label: t.projects },
    { href: "/contact", label: t.contact },
  ];

  const adminMenuItems = [
    { href: "/admin/dashboard", label: t.dashboard },
    { href: "/admin/projects", label: t.manageProjects },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-xl font-bold">
            Gminor
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-blue-500 ${
                  isActive(item.href)
                    ? "text-blue-500"
                    : "text-gray-600 dark:text-gray-300"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {session?.user && (
              <div className="relative group">
                <button className="flex items-center text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-500">
                  {t.admin}
                  <ChevronDown className="h-4 w-4 ml-1" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 hidden group-hover:block">
                  {adminMenuItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-4 py-2 text-sm ${
                        isActive(item.href)
                          ? "text-blue-500 bg-blue-50 dark:bg-blue-900/20"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ))}
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {t.logout}
                  </button>
                </div>
              </div>
            )}

            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === "fr" ? "en" : "fr")}
              >
                {language === "fr" ? "EN" : "FR"}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden"
            >
              <div className="px-2 pt-2 pb-3 space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block px-3 py-2 rounded-md text-base font-medium ${
                      isActive(item.href)
                        ? "text-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}

                {session?.user && (
                  <>
                    <div className="px-3 py-2 text-base font-medium text-gray-600 dark:text-gray-300">
                      {t.admin}
                    </div>
                    {adminMenuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`block px-6 py-2 rounded-md text-base font-medium ${
                          isActive(item.href)
                            ? "text-blue-500 bg-blue-50 dark:bg-blue-900/20"
                            : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                    <button
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {t.logout}
                    </button>
                  </>
                )}

                <div className="px-3 py-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={() => {
                      setLanguage(language === "fr" ? "en" : "fr");
                      setIsOpen(false);
                    }}
                  >
                    {language === "fr" ? "English" : "Français"}
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
} 