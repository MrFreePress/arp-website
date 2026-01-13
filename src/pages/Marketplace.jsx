import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ShoppingBag, ExternalLink, Heart } from 'lucide-react'

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-indigo-950/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              ARP Marketplace
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Discover helpful products, tools, and resources curated specifically for the autism and neurodiversity community.
            </p>
          </div>
        </div>
      </section>

      {/* Marketplace Integration Section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              {/* Coming Soon Placeholder */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 p-12 text-center min-h-[600px] flex flex-col items-center justify-center">
                <ShoppingBag className="h-24 w-24 text-gray-400 dark:text-gray-500 mb-6" />
                <div className="inline-flex items-center justify-center px-6 py-3 mb-4 rounded-full bg-yellow-100 dark:bg-yellow-900/30 border-2 border-yellow-400 dark:border-yellow-600">
                  <span className="text-lg font-bold text-yellow-800 dark:text-yellow-300">Coming Soon</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  Marketplace Opening Soon
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-lg text-lg">
                  We're curating a collection of quality products and resources specifically for the autism and neurodiversity community. Check back soon!
                </p>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-8 max-w-2xl w-full shadow-lg">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-4 text-xl">What to Expect:</h3>
                  <ul className="space-y-3 text-left text-gray-600 dark:text-gray-300">
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>
                      <span>Community-curated products and tools</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>
                      <span>Sensory-friendly items and resources</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>
                      <span>Educational materials and learning aids</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-primary mr-3 mt-1">✓</span>
                      <span>Proceeds supporting our free community programs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Shop With Us?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Every purchase supports our mission to provide free resources and support to families in need
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-pink-600" fill="currentColor" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Community Curated
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Products selected and recommended by our autism community
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Quality Products
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Carefully vetted items that make a real difference
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Support Our Mission
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Proceeds help fund free resources and community programs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-pink-600 to-purple-600 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Questions About Our Products?</h2>
          <p className="text-xl mb-8 text-pink-100">
            Our team is here to help you find the right resources for your needs
          </p>
          <Button asChild size="lg" variant="secondary">
            <Link to="/contact">Contact Us</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
