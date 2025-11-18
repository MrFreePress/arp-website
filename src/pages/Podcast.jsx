import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Play, Search, Share2, Star } from 'lucide-react'

// Sample podcast episodes data - replace with actual data
const sampleEpisodes = [
  {
    id: 1,
    title: 'Understanding Autism Spectrum Disorder',
    guest: 'Dr. Temple Grandin',
    topic: 'Autism Awareness',
    date: '2024-01-15',
    duration: '45:30',
    description: 'Join us for an insightful conversation with Dr. Temple Grandin about understanding autism from a personal and professional perspective.',
    audioUrl: '#',
  },
  {
    id: 2,
    title: 'Navigating Special Education',
    guest: 'Elizabeth Hamblet',
    topic: 'Education',
    date: '2024-01-08',
    duration: '38:20',
    description: 'Learn about IEPs, 504 plans, and advocating for your child in the education system.',
    audioUrl: '#',
  },
  {
    id: 3,
    title: 'Building Social Skills',
    guest: 'Elaine Hall',
    topic: 'Social Development',
    date: '2024-01-01',
    duration: '42:15',
    description: 'Discover practical strategies for helping neurodivergent individuals develop meaningful social connections.',
    audioUrl: '#',
  },
]

export default function Podcast() {
  const [episodes, setEpisodes] = useState(sampleEpisodes)
  const [selectedTopic, setSelectedTopic] = useState('all')
  const [selectedGuest, setSelectedGuest] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Extract unique topics and guests
  const topics = ['all', ...new Set(episodes.map(ep => ep.topic))]
  const guests = ['all', ...new Set(episodes.map(ep => ep.guest))]

  // Filter episodes
  const filteredEpisodes = episodes.filter(episode => {
    const matchesTopic = selectedTopic === 'all' || episode.topic === selectedTopic
    const matchesGuest = selectedGuest === 'all' || episode.guest === selectedGuest
    const matchesSearch = searchQuery === '' || 
      episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesTopic && matchesGuest && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 to-blue-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Autism Resource Podcast
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Explore the joys, challenges, and triumphs of being part of the neurodiverse community. Every story shared is an invitation to understand and connect.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Play className="mr-2 h-5 w-5" />
                Latest Episode
              </Button>
              <Button variant="outline" size="lg">
                Subscribe on Spotify
              </Button>
              <Button variant="outline" size="lg">
                Subscribe on Apple Podcasts
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Episodes
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by title, guest, or keyword..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Topic
              </label>
              <Select
                value={selectedTopic}
                onChange={(e) => setSelectedTopic(e.target.value)}
              >
                {topics.map(topic => (
                  <option key={topic} value={topic}>
                    {topic === 'all' ? 'All Topics' : topic}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Guest
              </label>
              <Select
                value={selectedGuest}
                onChange={(e) => setSelectedGuest(e.target.value)}
              >
                {guests.map(guest => (
                  <option key={guest} value={guest}>
                    {guest === 'all' ? 'All Guests' : guest}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              {filteredEpisodes.length} Episode{filteredEpisodes.length !== 1 ? 's' : ''}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEpisodes.map((episode) => (
              <Card key={episode.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                      {episode.topic}
                    </span>
                    <span className="text-sm text-gray-500">{episode.duration}</span>
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{episode.title}</CardTitle>
                  <CardDescription>
                    <span className="font-medium">Guest:</span> {episode.guest}
                  </CardDescription>
                  <CardDescription className="line-clamp-2">
                    {episode.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Button asChild className="w-full">
                      <Link to={`/podcast/${episode.id}`}>
                        <Play className="mr-2 h-4 w-4" />
                        Listen Now
                      </Link>
                    </Button>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Share2 className="mr-2 h-4 w-4" />
                        Share
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Star className="mr-2 h-4 w-4" />
                        Save
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss an Episode</h2>
          <p className="text-xl mb-8 text-blue-100">
            Subscribe to get notified about new episodes and exclusive content
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Subscribe to Newsletter
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              Rate & Review
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
