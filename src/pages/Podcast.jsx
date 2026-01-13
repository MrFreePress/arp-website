import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Play, Search, Share2 } from 'lucide-react'
import { loadPodcastEpisodes } from '@/lib/contentLoader'

export default function Podcast() {
  const [episodes, setEpisodes] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedTopic, setSelectedTopic] = useState('all')
  const [selectedGuest, setSelectedGuest] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Load podcast episodes from CMS
    async function fetchEpisodes() {
      const data = await loadPodcastEpisodes()
      setEpisodes(data)
      setLoading(false)
    }
    fetchEpisodes()
  }, [])

  useEffect(() => {
    // Load the LeadConnector form embed script
    const script = document.createElement('script')
    script.src = 'https://link.msgsndr.com/js/form_embed.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
    }
  }, [])

  // Extract unique topics and guests
  const topics = ['all', ...new Set(episodes.map(ep => ep.topic))]
  const guests = ['all', ...new Set(episodes.map(ep => ep.guest))]

  // Filter episodes - only show featured episodes
  const filteredEpisodes = episodes.filter(episode => {
    // Only show episodes marked as featured
    if (!episode.featured) return false
    
    const matchesTopic = selectedTopic === 'all' || episode.topic === selectedTopic
    const matchesGuest = selectedGuest === 'all' || episode.guest === selectedGuest
    const matchesSearch = searchQuery === '' || 
      episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.guest.toLowerCase().includes(searchQuery.toLowerCase()) ||
      episode.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesTopic && matchesGuest && matchesSearch
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 dark:from-purple-950/20 dark:via-pink-950/20 dark:to-orange-950/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Autism Resource Podcast
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Explore the joys, challenges, and triumphs of being part of the neurodiverse community. Every story shared is an invitation to understand and connect.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <Play className="mr-2 h-5 w-5" />
                Latest Episode
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://open.spotify.com/show/0t8eITPUSCSZxRa2C1eyRE" target="_blank" rel="noopener noreferrer">
                  Subscribe on Spotify
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://podcasts.apple.com/us/podcast/autism-resource-podcast/id1566225919" target="_blank" rel="noopener noreferrer">
                  Subscribe on Apple Podcasts
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <a href="https://music.amazon.com/podcasts/df5d629a-2d51-466e-a236-dc1504627b18/autism-resource-podcast" target="_blank" rel="noopener noreferrer">
                  Subscribe on Amazon
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
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
                      <Link to={`/podcast/${episode.slug}`}>
                        <Play className="mr-2 h-4 w-4" />
                        Listen Now
                      </Link>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 dark:from-purple-700 dark:via-pink-700 dark:to-orange-600 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Never Miss an Episode</h2>
          <p className="text-xl mb-8 text-blue-100">
            Subscribe to get notified about new episodes and exclusive content
          </p>
          <div className="w-full max-w-2xl mx-auto" style={{ minHeight: '605px' }}>
            <iframe
              src="https://api.leadconnectorhq.com/widget/form/ZXoVFsNaaAFBNomYKyc8"
              style={{ width: '100%', height: '605px', border: 'none', borderRadius: '3px' }}
              id="inline-ZXoVFsNaaAFBNomYKyc8" 
              data-layout="{'id':'INLINE'}"
              data-trigger-type="alwaysShow"
              data-trigger-value=""
              data-activation-type="alwaysActivated"
              data-activation-value=""
              data-deactivation-type="neverDeactivate"
              data-deactivation-value=""
              data-form-name="Subscribe to Our List"
              data-height="605"
              data-layout-iframe-id="inline-ZXoVFsNaaAFBNomYKyc8"
              data-form-id="ZXoVFsNaaAFBNomYKyc8"
              title="Subscribe to Our List"
            />
          </div>
        </div>
      </section>
    </div>
  )
}
