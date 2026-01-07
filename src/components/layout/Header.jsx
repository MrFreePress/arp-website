import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ThemeToggle'
import CommandPalette from '@/components/CommandPalette'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Podcast', href: '/podcast' },
    { name: 'Community', href: '/community' },
    { name: 'Library', href: '/library' },
    { name: 'Marketplace', href: '/marketplace' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ]

  const isActive = (href) => {
    if (href === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(href)
  }

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50 border-b dark:border-gray-800">
      {/* Skip to Main Content Link for Accessibility */}
      <a href="#main-content" className="skip-to-main">
        Skip to main content
      </a>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/arp-logo.jpg" 
                alt="Autism Resource Project Logo" 
                className="h-12 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {navigation.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? 'text-primary dark:text-primary font-semibold border-b-2 border-primary'
                    : 'text-gray-700 dark:text-gray-200 hover:text-primary dark:hover:text-primary'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search site"
              title="Search (Ctrl+K)"
            >
              <Search className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <Button asChild size="sm">
              <Link to="/donate">Donate</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSearchOpen(true)}
              aria-label="Search site"
            >
              <Search className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden pb-4">
            <div className="space-y-1">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md ${
                    isActive(link.href)
                      ? 'bg-primary/10 text-primary dark:text-primary font-semibold'
                      : 'text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-primary'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="px-3 pt-2">
                <Button asChild className="w-full">
                  <Link to="/donate">Donate</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Command Palette */}
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
    </header>
  )
}
