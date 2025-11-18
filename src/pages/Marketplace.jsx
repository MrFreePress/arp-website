import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ShoppingBag, ExternalLink, Heart } from 'lucide-react'

export default function Marketplace() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-pink-50 to-purple-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="h-16 w-16 rounded-full bg-primary flex items-center justify-center">
                <ShoppingBag className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              ARP Marketplace
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
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
              {/* Placeholder for Shopify/ThriveCart Embed */}
              <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-12 text-center min-h-[600px] flex flex-col items-center justify-center">
                <ShoppingBag className="h-24 w-24 text-gray-400 mb-6" />
                <h2 className="text-2xl font-bold text-gray-700 mb-4">
                  Marketplace Integration
                </h2>
                <p className="text-gray-600 mb-6 max-w-md">
                  This section will display your Shopify or ThriveCart storefront. 
                  Simply embed your store code below to showcase your products.
                </p>
                <div className="bg-white rounded-lg p-6 max-w-2xl w-full text-left">
                  <h3 className="font-semibold text-gray-900 mb-3">Integration Instructions:</h3>
                  <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600">
                    <li>Get your embed code from Shopify or ThriveCart</li>
                    <li>Replace the placeholder div in Marketplace.jsx</li>
                    <li>Add the embed code within the CardContent component</li>
                    <li>Test the integration to ensure proper display</li>
                  </ol>
                  <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
                    <code className="text-xs text-gray-700">
                      {`<!-- Example Shopify Embed -->\n<div id="shopify-embed"></div>\n<script src="your-shopify-embed.js"></script>`}
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Shop With Us?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every purchase supports our mission to provide free resources and support to families in need
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-pink-100 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-pink-600" fill="currentColor" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Community Curated
              </h3>
              <p className="text-gray-600">
                Products selected and recommended by our autism community
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Quality Products
              </h3>
              <p className="text-gray-600">
                Carefully vetted items that make a real difference
              </p>
            </div>
            <div className="text-center">
              <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Support Our Mission
              </h3>
              <p className="text-gray-600">
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
          <Button size="lg" variant="secondary">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  )
}
