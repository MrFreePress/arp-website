import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function Footer() {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    // Newsletter signup logic will be integrated with email marketing system
    alert('Newsletter signup will be integrated with your email marketing platform')
  }

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white border-t dark:border-gray-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <div className="mb-4">
              <img 
                src="/arp-logo.jpg" 
                alt="Autism Resource Project" 
                className="h-16 w-auto brightness-0 invert"
              />
            </div>
            <p className="text-gray-400 text-sm">
              Your one-stop hub for autism, neurodiversity, and disabilities—offering 24/7 trusted information, support, and connections.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/podcast" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Podcast
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/library" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Resource Library
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/marketplace" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Accessibility
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to our newsletter for updates and resources.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <Input
                type="email"
                placeholder="Your email"
                className="bg-gray-800 border-gray-700 text-white"
                required
              />
              <Button type="submit" className="w-full">
                Subscribe
              </Button>
            </form>
            <div className="flex space-x-4 mt-6">
              <a
                href="https://www.facebook.com/autismresourcepodcast"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://www.instagram.com/TheAutismResourceProject"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="mailto:info@autismresourceproject.org"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Autism Resource Project. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
