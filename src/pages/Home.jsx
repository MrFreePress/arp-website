import React from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Heart, Users, BookOpen, Podcast, ShoppingBag, MessageCircle } from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: Podcast,
      title: 'Autism Resource Podcast',
      description: 'Listen to inspiring stories from experts, professionals, and neurodivergent individuals sharing their journeys.',
      link: '/podcast',
    },
    {
      icon: Users,
      title: 'Community Connection',
      description: 'Find local support groups, events, and resources in your area. Connect with families who understand.',
      link: '/community',
    },
    {
      icon: BookOpen,
      title: 'Resource Library',
      description: 'Access our comprehensive library of articles, guides, and trusted information about autism and neurodiversity.',
      link: '/library',
    },
    {
      icon: ShoppingBag,
      title: 'Marketplace',
      description: 'Discover helpful products, tools, and resources curated specifically for the autism community.',
      link: '/marketplace',
    },
    {
      icon: MessageCircle,
      title: 'Blog & Insights',
      description: 'Read the latest articles, research updates, and personal stories from our community.',
      link: '/blog',
    },
    {
      icon: Heart,
      title: 'Support Our Mission',
      description: 'Your donation helps us provide free resources and support to families in need.',
      link: '/donate',
    },
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block">It's a small, neurodiverse world!</span>
              <span className="block text-primary mt-2">Together, We Build Community</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              We are your one-stop hub for autism, neurodiversity, and disabilities—offering 24/7 trusted information, support, and connections to empower individuals and families.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link to="/library">Explore Resources</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/podcast">Listen to Podcast</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link to="/donate">Support Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Welcome Message */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Welcome to the Autism Resource Project
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Here, we are more than just a website—we're a warm community of families, caregivers, educators, service providers and individuals on their own neurodiverse journeys. We know what it feels like to celebrate the little victories, face the big challenges, and sometimes feel alone in it all. We want you to know that you are never alone. ARP is here to be your companion, offering helpful resources, support, and encouragement whenever you need it.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">How We Can Help</h2>
            <p className="mt-4 text-lg text-gray-600">
              Discover the resources and support available to you
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="ghost" className="w-full">
                    <Link to={feature.link}>Learn More →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* The Problem */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Problem</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Finding the right help for someone you love with autism, other neurodiversity or disability can be tough. It's not just the day-to-day care, but also the endless search for resources, many of which are expensive or difficult to access. We understand the stress of waiting on insurance approvals, the frustration when resources don't quite fit, and the exhaustion of it all. Sometimes, it can feel like you are climbing a mountain with no clear path. But you are not alone in that climb.
              </p>
            </div>

            {/* The Solution */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">The Solution</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                At ARP, our goal is to make sure you feel welcome and supported every step of the way. Our website is a safe place filled with real information about autism, neurodiversity, and disability. It's like having a big library and a caring friend all rolled into one—with facts, stories, and support from people who understand what you're going through. We offer a place where you can connect with others who know the ups and downs of this journey, share what you've learned, and find new ways to help your loved ones thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Your Support Changes Lives!</h2>
          <p className="text-xl mb-8 text-blue-100">
            Help families access essential resources and support
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary">
              <Link to="/donate">Make a Difference Today</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">Connect with Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
