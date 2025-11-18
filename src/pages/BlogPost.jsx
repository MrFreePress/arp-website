import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Calendar, User, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react'

export default function BlogPost() {
  const { slug } = useParams()

  // Sample blog post - replace with actual data fetching
  const post = {
    title: '10 Essential Tips for Navigating Autism Diagnosis',
    author: 'ARP Team',
    date: '2024-01-20',
    category: 'Getting Started',
    tags: ['diagnosis', 'early intervention', 'support'],
    readTime: '8 min read',
    content: `
      <p>Receiving an autism diagnosis can be overwhelming for families. Whether you're a parent, caregiver, or individual receiving a diagnosis, it's natural to feel a mix of emotions—from relief at finally having answers to uncertainty about what comes next.</p>

      <p>At the Autism Resource Project, we've supported thousands of families through this journey. Here are ten essential tips to help you navigate the path forward with confidence and support.</p>

      <h2>1. Take Time to Process</h2>
      <p>Give yourself permission to feel whatever emotions arise. There's no "right" way to react to a diagnosis. Some families feel relief, others feel grief, and many experience both. All of these feelings are valid.</p>

      <h2>2. Educate Yourself from Reliable Sources</h2>
      <p>Seek information from reputable organizations and medical professionals. Be cautious of outdated information or sources that promote harmful "cures." Focus on understanding your child's unique strengths and challenges.</p>

      <h2>3. Connect with the Community</h2>
      <p>You're not alone on this journey. Connect with other families, join support groups, and engage with the autism community. Hearing from others who've walked this path can provide invaluable insights and emotional support.</p>

      <h2>4. Start Early Intervention Services</h2>
      <p>Early intervention can make a significant difference. Contact your local early intervention program or school district to learn about available services. Don't wait—the sooner you start, the better.</p>

      <h2>5. Build Your Support Team</h2>
      <p>Assemble a team of professionals who understand autism and can support your family. This might include therapists, educators, medical professionals, and advocates.</p>

      <h2>6. Focus on Your Child's Strengths</h2>
      <p>Every child has unique abilities and interests. Celebrate these strengths and use them as building blocks for learning and development.</p>

      <h2>7. Learn About Your Rights</h2>
      <p>Familiarize yourself with special education laws, insurance coverage, and disability rights. Knowledge is power when advocating for your child's needs.</p>

      <h2>8. Take Care of Yourself</h2>
      <p>Self-care isn't selfish—it's essential. You can't pour from an empty cup. Make time for your own physical and mental health.</p>

      <h2>9. Be Patient with the Process</h2>
      <p>Progress isn't always linear. Celebrate small victories and be patient with setbacks. Every child develops at their own pace.</p>

      <h2>10. Maintain Hope and Optimism</h2>
      <p>While the journey may have challenges, there's so much reason for hope. With the right support and resources, individuals with autism can thrive and lead fulfilling lives.</p>

      <h2>Moving Forward</h2>
      <p>Remember, receiving a diagnosis is just the beginning of your journey. With time, support, and resources, you'll find your way. The Autism Resource Project is here to support you every step of the way.</p>
    `,
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
          <div 
            className="prose prose-lg max-w-none dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Related Articles */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Related Articles</h2>
            <div className="space-y-4">
              <Link to="/blog/sensory-processing-autism-guide" className="block hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-lg transition-colors">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Understanding Sensory Processing in Autism</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Learn about sensory processing differences and practical strategies...</p>
              </Link>
              <Link to="/blog/aac-devices-communication-alternatives" className="block hover:bg-gray-50 dark:hover:bg-gray-700 p-4 rounded-lg transition-colors">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Building Communication Skills with AAC</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Explore augmentative and alternative communication devices...</p>
              </Link>
            </div>
          </CardContent>
        </Card>

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
