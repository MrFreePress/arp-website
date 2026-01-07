import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Users, BookOpen, Podcast, Check } from 'lucide-react'

export default function Donate() {
  const donationTiers = [
    {
      name: 'Friend',
      amount: '$25',
      description: 'Help us maintain our resource library',
      benefits: [
        'Monthly newsletter',
        'Recognition on our website',
        'Tax-deductible receipt',
      ],
    },
    {
      name: 'Supporter',
      amount: '$100',
      description: 'Support our podcast production',
      benefits: [
        'All Friend benefits',
        'Exclusive podcast content',
        'Early access to resources',
        'Quarterly impact reports',
      ],
      featured: true,
    },
    {
      name: 'Champion',
      amount: '$500',
      description: 'Fund community programs and events',
      benefits: [
        'All Supporter benefits',
        'Invitation to annual donor event',
        'Direct consultation opportunity',
        'Custom sponsorship recognition',
      ],
    },
  ]

  const impactStats = [
    { icon: Users, value: '10,000+', label: 'Families Served' },
    { icon: Podcast, value: '200+', label: 'Podcast Episodes' },
    { icon: BookOpen, value: '500+', label: 'Resources Shared' },
    { icon: Heart, value: '$250K+', label: 'In Free Services' },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-950/20 dark:to-pink-950/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="h-16 w-16 text-primary mx-auto mb-6" fill="currentColor" />
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Your Support Changes Lives
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Help us provide free resources, support, and connections to families navigating autism and neurodiversity.
            </p>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {impactStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Donation Tiers */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Choose Your Impact Level</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Every contribution makes a difference</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {donationTiers.map((tier) => (
              <Card 
                key={tier.name} 
                className={tier.featured ? 'border-primary border-2 shadow-lg' : ''}
              >
                {tier.featured && (
                  <div className="bg-primary text-white text-center py-2 text-sm font-medium rounded-t-lg">
                    Most Popular
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="text-4xl font-bold text-primary my-4">{tier.amount}</div>
                  <CardDescription className="text-base">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full" variant={tier.featured ? 'default' : 'outline'}>
                    Donate {tier.amount}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600 dark:text-gray-300 mb-4">Want to make a custom donation?</p>
            <Button size="lg" variant="outline">
              Choose Custom Amount
            </Button>
          </div>
        </div>
      </section>

      {/* Corporate Sponsorship */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Corporate Sponsorship</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Partner with us to make a lasting impact in the autism community. We offer customized sponsorship packages for businesses and organizations.
          </p>
          <Button size="lg">
            Download Sponsorship Kit
          </Button>
        </div>
      </section>

      {/* Alternative Platforms */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Alternative Platforms</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">Choose your preferred payment method</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Venmo */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle>Venmo</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <img 
                    src="/venmo-qr.webp" 
                    alt="Venmo QR Code" 
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Scan to donate via Venmo</p>
              </CardContent>
            </Card>

            {/* PayPal */}
            <Card className="text-center">
              <CardHeader>
                <CardTitle>PayPal</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center mb-4">
                  <img 
                    src="/paypal-qr.webp" 
                    alt="PayPal QR Code" 
                    className="w-48 h-48 object-contain"
                  />
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Scan to donate via PayPal</p>
              </CardContent>
            </Card>

            {/* Zelle */}
            <Card className="text-center flex flex-col justify-center">
              <CardHeader>
                <CardTitle>Zelle</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center">
                <div className="py-8">
                  <p className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Send to:</p>
                  <p className="text-base text-primary font-medium break-all">
                    info@autismresourceproject.org
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

    </div>
  )
}
