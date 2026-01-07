import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Download, ExternalLink, BookOpen, AlertCircle } from 'lucide-react'

export default function ResourceDetail() {
  const { id } = useParams()

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/30 mb-4">
              <BookOpen className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Sample Resource Page
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              This is a placeholder page for resource details. Content will be added soon.
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <Button asChild variant="ghost">
              <Link to="/library">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Library
              </Link>
            </Button>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                <span className="inline-flex items-center rounded-full bg-blue-100 dark:bg-blue-900/30 px-3 py-1 text-sm font-medium text-blue-800 dark:text-blue-300">
                  Sample Resource
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  Resource ID: {id}
                </span>
              </div>
              <CardTitle className="text-3xl">Sample Resource Title</CardTitle>
              <CardDescription className="text-lg mt-2">
                This is a sample resource detail page. Actual resource content will be populated when connected to the CMS.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose dark:prose-invert max-w-none">
                <h2>About This Resource</h2>
                <p>
                  This page serves as a placeholder for individual resource details. When the content management system is fully integrated, each resource will have its own dedicated page with:
                </p>
                <ul>
                  <li>Full resource description and details</li>
                  <li>Downloadable files or external links</li>
                  <li>Related resources and recommendations</li>
                  <li>User reviews and ratings</li>
                  <li>Categories and tags for easy discovery</li>
                </ul>

                <h2>Coming Soon</h2>
                <p>
                  We're working on populating our resource library with valuable content for the autism and neurodiversity community. Check back soon for updates!
                </p>
              </div>

              <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-start">
                  <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-yellow-800 dark:text-yellow-300 mb-1">
                      Sample Content Notice
                    </h3>
                    <p className="text-sm text-yellow-700 dark:text-yellow-400">
                      This is a sample page. Actual resource content will be available once the content management system is fully configured and populated with real resources.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button asChild className="flex-1">
                  <Link to="/library">
                    <BookOpen className="mr-2 h-4 w-4" />
                    Browse All Resources
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1" disabled>
                  <Download className="mr-2 h-4 w-4" />
                  Download (Coming Soon)
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Related Resources Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Related Resources
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Related resources will appear here once the library is fully populated.
            </p>
            <Button asChild variant="outline">
              <Link to="/library">
                View All Resources
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
