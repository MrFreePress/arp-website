import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'
import { loadBlogPost, loadBlogPosts } from '@/lib/contentLoader'
import ReactMarkdown from 'react-markdown'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchPost() {
      const data = await loadBlogPost(slug)
      setPost(data)
      
      if (data) {
        const allPosts = await loadBlogPosts()
        const related = allPosts
          .filter(p => p.slug !== slug && p.category === data.category)
          .slice(0, 2)
        setRelatedPosts(related)
      }
      
      setLoading(false)
    }
    fetchPost()
  }, [slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-300">Loading article...</p>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-300 mb-4">Article not found</p>
          <Link to="/blog" className="text-primary hover:underline">Back to Blog</Link>
        </div>
      </div>
    )
  }

  const handleShare = (platform) => {
    const url = window.location.href
    const text = post.title
    
    switch(platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank')
        break
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank')
        break
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank')
        break
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        {/* Article Header */}
        <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-6">
          <div className="mb-6">
            <span className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800 mb-4">
              {post.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{post.title}</h1>
            
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <span>{post.readTime}</span>
            </div>

            <div className="flex flex-wrap gap-2 mb-6">
              {post.tags.map(tag => (
                <span key={tag} className="inline-flex items-center text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t dark:border-gray-700">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Share:</span>
              <Button variant="outline" size="sm" onClick={() => handleShare('facebook')}>
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('twitter')}>
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare('linkedin')}>
                <Linkedin className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Article Content */}
          <div className="prose prose-lg max-w-none dark:prose-invert">
            <ReactMarkdown>{post.body}</ReactMarkdown>
          </div>
        </article>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Related Articles</h2>
              <div className="space-y-4">
                {relatedPosts.map((relatedPost) => (
                  <Link 
                    key={relatedPost.slug}
                    to={`/blog/${relatedPost.slug}`} 
                    className="block hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-lg transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{relatedPost.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{relatedPost.excerpt}</p>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Newsletter CTA */}
        <div className="mt-8 bg-gradient-to-br from-indigo-600 to-purple-600 dark:from-indigo-700 dark:to-purple-700 rounded-lg p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Want More Articles Like This?</h2>
          <p className="mb-6">Subscribe to our newsletter for weekly insights and resources</p>
          <Button size="lg" variant="secondary">
            Subscribe Now
          </Button>
        </div>
      </div>
    </div>
  )
}
