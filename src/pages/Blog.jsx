import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Calendar, User, Tag, Share2 } from 'lucide-react'

// Sample blog posts with SEO-rich content
const samplePosts = [
  {
    id: 1,
    title: '10 Essential Tips for Navigating Autism Diagnosis',
    slug: 'navigating-autism-diagnosis-tips',
    author: 'ARP Team',
    date: '2024-01-20',
    category: 'Getting Started',
    tags: ['diagnosis', 'early intervention', 'support'],
    excerpt: 'Receiving an autism diagnosis can be overwhelming. Here are ten essential tips to help you navigate this journey with confidence and support.',
    image: '/images/blog/diagnosis-tips.jpg',
    readTime: '8 min read',
  },
  {
    id: 2,
    title: 'Understanding Sensory Processing in Autism: A Complete Guide',
    slug: 'sensory-processing-autism-guide',
    author: 'Dr. Sarah Johnson',
    date: '2024-01-18',
    category: 'Education',
    tags: ['sensory processing', 'strategies', 'daily living'],
    excerpt: 'Learn about sensory processing differences in autism and discover practical strategies to create a sensory-friendly environment at home and school.',
    image: '/images/blog/sensory-guide.jpg',
    readTime: '12 min read',
  },
  {
    id: 3,
    title: 'Building Communication Skills: AAC Devices and Alternatives',
    slug: 'aac-devices-communication-alternatives',
    author: 'Emily Rodriguez',
    date: '2024-01-15',
    category: 'Communication',
    tags: ['AAC', 'communication', 'technology'],
    excerpt: 'Explore the world of augmentative and alternative communication (AAC) devices and learn how they can empower non-verbal individuals.',
    image: '/images/blog/aac-devices.jpg',
    readTime: '10 min read',
  },
]

export default function Blog() {
  const [posts, setPosts] = useState(samplePosts)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Extract unique categories
  const categories = ['all', ...new Set(posts.map(p => p.category))]

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              ARP Blog
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Read the latest articles, research updates, and personal stories from our community. Stay informed and inspired.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Articles
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by title, keyword, or tag..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Category
              </label>
              <Select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredPosts.length} Article{filteredPosts.length !== 1 ? 's' : ''}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow overflow-hidden">
                <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <span className="text-gray-400 text-sm">Featured Image</span>
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800">
                      {post.category}
                    </span>
                    <span className="text-sm text-gray-500">{post.readTime}</span>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">
                    <Link to={`/blog/${post.slug}`} className="hover:text-primary">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="inline-flex items-center text-xs text-gray-600">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button asChild className="flex-1">
                        <Link to={`/blog/${post.slug}`}>Read More</Link>
                      </Button>
                      <Button variant="outline" size="icon">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-8 text-indigo-100">
            Subscribe to our newsletter and never miss a new article or resource
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Your email address"
              className="bg-white text-gray-900"
            />
            <Button size="lg" variant="secondary">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
