import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, BookOpen, FileText, Video, Download, ExternalLink } from 'lucide-react'

// Sample library resources - ARP will provide actual content
const sampleResources = [
  {
    id: 1,
    title: 'Understanding IEPs and 504 Plans',
    category: 'Education',
    type: 'PDF Guide',
    description: 'Comprehensive guide to navigating special education services and advocating for your child.',
    url: '#',
    downloadable: true,
  },
  {
    id: 2,
    title: 'Sensory Processing Strategies',
    category: 'Daily Living',
    type: 'Article',
    description: 'Practical strategies for managing sensory sensitivities at home and in public spaces.',
    url: '#',
    downloadable: false,
  },
  {
    id: 3,
    title: 'Communication Tools for Non-Verbal Individuals',
    category: 'Communication',
    type: 'Video',
    description: 'Introduction to AAC devices and alternative communication methods.',
    url: '#',
    downloadable: false,
  },
  {
    id: 4,
    title: 'Employment Resources for Autistic Adults',
    category: 'Employment',
    type: 'Resource List',
    description: 'Directory of autism-friendly employers and job coaching services.',
    url: '#',
    downloadable: true,
  },
  {
    id: 5,
    title: 'Early Intervention Guide',
    category: 'Early Childhood',
    type: 'PDF Guide',
    description: 'Essential information for parents of newly diagnosed children.',
    url: '#',
    downloadable: true,
  },
  {
    id: 6,
    title: 'Social Skills Development Activities',
    category: 'Social Skills',
    type: 'Activity Guide',
    description: 'Age-appropriate activities to build social connections and understanding.',
    url: '#',
    downloadable: true,
  },
]

export default function Library() {
  const [resources, setResources] = useState(sampleResources)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  // Extract unique categories and types
  const categories = ['all', ...new Set(resources.map(r => r.category))]
  const types = ['all', ...new Set(resources.map(r => r.type))]

  // Filter resources
  const filteredResources = resources.filter(resource => {
    const matchesCategory = selectedCategory === 'all' || resource.category === selectedCategory
    const matchesType = selectedType === 'all' || resource.type === selectedType
    const matchesSearch = searchQuery === '' || 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    return matchesCategory && matchesType && matchesSearch
  })

  const getIcon = (type) => {
    switch(type) {
      case 'Video': return Video
      case 'PDF Guide': return FileText
      default: return BookOpen
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-blue-950/20 dark:via-indigo-950/20 dark:to-purple-950/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Resource Library
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Access our comprehensive library of articles, guides, and trusted information about autism, neurodiversity, and disability resources.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search Resources
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search by title or keyword..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter by Type
              </label>
              <Select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
              >
                {types.map(type => (
                  <option key={type} value={type}>
                    {type === 'all' ? 'All Types' : type}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Resources Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredResources.length} Resource{filteredResources.length !== 1 ? 's' : ''} Available
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => {
              const Icon = getIcon(resource.type)
              return (
                <Card key={resource.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-800">
                        {resource.category}
                      </span>
                      <Icon className="h-5 w-5 text-gray-400" />
                    </div>
                    <CardTitle className="text-xl">{resource.title}</CardTitle>
                    <CardDescription>
                      <span className="font-medium">{resource.type}</span>
                    </CardDescription>
                    <CardDescription className="mt-2">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <Button asChild className="w-full">
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View Resource
                        </a>
                      </Button>
                      {resource.downloadable && (
                        <Button variant="outline" className="w-full">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-600 to-yellow-600 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Download Our Impact Report</h2>
          <p className="text-xl mb-8 text-orange-100">
            Get our comprehensive guide and see how we're making a difference in the autism community
          </p>
          <Button size="lg" variant="secondary">
            <Download className="mr-2 h-5 w-5" />
            Download Free Report
          </Button>
        </div>
      </section>
    </div>
  )
}
