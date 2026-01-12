import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Share2, Star, Download, ExternalLink } from 'lucide-react'
import { loadPodcastEpisode } from '@/lib/contentLoader'

export default function PodcastEpisode() {
  const { slug } = useParams()
  const [episode, setEpisode] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEpisode() {
      const data = await loadPodcastEpisode(slug)
      setEpisode(data)
      setLoading(false)
    }
    fetchEpisode()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">Loading episode...</p>
      </div>
    )
  }

  if (!episode) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Episode not found</p>
          <Link to="/podcast" className="text-primary hover:underline">Back to Podcast</Link>
        </div>
      </div>
    )
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: episode.title,
        text: episode.description,
        url: window.location.href,
      })
    } else {
      alert('Share URL: ' + window.location.href)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/podcast" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Episodes
        </Link>

        {/* Episode Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
          <div className="flex items-start justify-between mb-4">
            <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {episode.topic}
            </span>
            <span className="text-sm text-gray-500 dark:text-gray-400">{new Date(episode.date).toLocaleDateString()}</span>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{episode.title}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Guest</p>
              <p className="font-medium text-gray-900 dark:text-white">{episode.guest}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
              <p className="font-medium text-gray-900 dark:text-white">{episode.duration}</p>
            </div>
          </div>

          {/* Audio Player */}
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-6 mb-6">
            <audio controls className="w-full">
              <source src={episode.audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share Episode
            </Button>
            <Button variant="outline">
              <Star className="mr-2 h-4 w-4" />
              Save for Later
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        {/* Guest Bio */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">About the Guest</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">{episode.guestBio}</p>
            {episode.guestWebsite && (
              <a
                href={episode.guestWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:underline"
              >
                Visit Website
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            )}
          </CardContent>
        </Card>

        {/* Episode Description */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Episode Description</h2>
            <p className="text-gray-600 dark:text-gray-300">{episode.description}</p>
          </CardContent>
        </Card>

        {/* Show Notes */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Show Notes</h2>
            <div className="prose prose-sm max-w-none dark:prose-invert text-gray-600 dark:text-gray-300">
              <div dangerouslySetInnerHTML={{ __html: episode.showNotes }} />
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        {episode.resources && episode.resources.length > 0 && (
          <Card className="mb-6">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">Resources Mentioned</h2>
              <ul className="space-y-2">
                {episode.resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      {resource.title}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                    {resource.description && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 ml-6 mt-1">{resource.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Enjoyed this episode?</h2>
          <p className="mb-6">Help us reach more people by subscribing, rating, and reviewing our podcast!</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="secondary" size="lg">
              Subscribe to Newsletter
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white text-white hover:bg-white hover:text-primary">
              Rate & Review
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
