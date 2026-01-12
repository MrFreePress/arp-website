import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { MapPin, Users, Calendar, ExternalLink } from 'lucide-react'
import { loadCommunityResources } from '@/lib/contentLoader'

export default function Community() {
  const [communities, setCommunities] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedState, setSelectedState] = useState('all')
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedType, setSelectedType] = useState('all')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    // Load community resources from CMS
    async function fetchCommunities() {
      const data = await loadCommunityResources()
      setCommunities(data)
      setLoading(false)
    }
    fetchCommunities()
  }, [])

  useEffect(() => {
    // Load the LeadConnector form embed script
    const script = document.createElement('script')
    script.src = 'https://link.msgsndr.com/js/form_embed.js'
    script.async = true
    document.body.appendChild(script)

    let observerCleanup = null

    // Listen for form submission messages from iframe
    const handleMessage = (event) => {
      console.log('Message received:', event.data)
      
      // Check for various LeadConnector/form submission event patterns
      if (event.data) {
        const isFormSubmission = 
          event.data.type === 'hsFormCallback' ||
          event.data.eventName === 'onFormSubmitted' ||
          event.data.type === 'form-submitted' ||
          event.data.event === 'form-submitted' ||
          event.data.message === 'form-submitted' ||
          (typeof event.data === 'string' && (event.data.includes('submit') || event.data.includes('success')))
        
        if (isFormSubmission) {
          console.log('Form submission detected via postMessage, scrolling and setting timer')
          
          // Scroll modal content to top when confirmation appears
          const modalContent = document.querySelector('[role="dialog"]')
          if (modalContent) {
            modalContent.scrollTop = 0
          }

          // Auto-close modal after 3 seconds
          setTimeout(() => {
            console.log('Closing modal after 3 seconds')
            setIsDialogOpen(false)
          }, 3000)
        }
      }
    }

    window.addEventListener('message', handleMessage)

    return () => {
      // Cleanup script and event listener on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script)
      }
      window.removeEventListener('message', handleMessage)
      if (observerCleanup) {
        observerCleanup()
      }
    }
  }, [])

  // Monitor iframe height changes as alternative detection method
  useEffect(() => {
    if (!isDialogOpen) return

    const iframe = document.getElementById('inline-9VayflYHGSuzPaYWM0cQ')
    if (!iframe) return

    let initialHeight = null
    let heightChangeDetected = false

    const checkHeightChange = () => {
      const currentHeight = iframe.offsetHeight
      
      if (initialHeight === null) {
        initialHeight = currentHeight
      } else if (!heightChangeDetected && currentHeight !== initialHeight && Math.abs(currentHeight - initialHeight) > 100) {
        // Significant height change detected (likely form replaced with confirmation)
        console.log('Form height change detected (form submission likely)', { initialHeight, currentHeight })
        heightChangeDetected = true
        
        // Scroll modal to top
        const modalContent = document.querySelector('[role="dialog"]')
        if (modalContent) {
          modalContent.scrollTop = 0
        }
        
        // Close after 3 seconds
        setTimeout(() => {
          console.log('Closing modal after 3 seconds (height change method)')
          setIsDialogOpen(false)
        }, 3000)
      }
    }

    // Check every 500ms for height changes
    const interval = setInterval(checkHeightChange, 500)

    return () => {
      clearInterval(interval)
    }
  }, [isDialogOpen])

  // Extract unique values
  const states = ['all', ...new Set(communities.map(c => c.state))]
  const cities = ['all', ...new Set(communities.map(c => c.city))]
  const types = ['all', ...new Set(communities.map(c => c.type))]

  // Filter communities
  const filteredCommunities = communities.filter(community => {
    const matchesState = selectedState === 'all' || community.state === selectedState
    const matchesCity = selectedCity === 'all' || community.city === selectedCity
    const matchesType = selectedType === 'all' || community.type === selectedType
    
    return matchesState && matchesCity && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 dark:from-yellow-950/20 dark:via-orange-950/20 dark:to-pink-950/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Community Connection
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Find local support groups, events, and resources in your area. Connect with families and individuals who understand your journey.
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
                Select State
              </label>
              <Select
                value={selectedState}
                onChange={(e) => {
                  setSelectedState(e.target.value)
                  setSelectedCity('all')
                }}
              >
                {states.map(state => (
                  <option key={state} value={state}>
                    {state === 'all' ? 'All States' : state}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Select City
              </label>
              <Select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
              >
                {cities.map(city => (
                  <option key={city} value={city}>
                    {city === 'all' ? 'All Cities' : city}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Community Type
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

      {/* Communities Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {filteredCommunities.length} Communit{filteredCommunities.length !== 1 ? 'ies' : 'y'} Found
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCommunities.map((community) => (
              <Card key={community.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                      {community.type}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{community.name}</CardTitle>
                  <CardDescription className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {community.city}, {community.state}
                  </CardDescription>
                  <CardDescription className="mt-2">
                    {community.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-500 mt-0.5" />
                      <span className="text-gray-600">{community.meetingSchedule}</span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <Users className="h-4 w-4 text-gray-500 mt-0.5" />
                      <a href={`mailto:${community.contact}`} className="text-primary hover:underline">
                        {community.contact}
                      </a>
                    </div>
                    <Button asChild variant="outline" className="w-full">
                      <a href={community.website} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit Website
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-orange-500 via-pink-600 to-purple-600 dark:from-orange-600 dark:via-pink-700 dark:to-purple-700 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Add Your Community?</h2>
          <p className="text-xl mb-8 text-green-100">
            Help us grow our network by submitting your local support group or organization
          </p>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" variant="secondary">
                Submit Community Information
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Add Your Community</DialogTitle>
                <DialogDescription>
                  Fill out the form below to submit your community information to our directory.
                </DialogDescription>
              </DialogHeader>
              <div className="w-full" style={{ minHeight: '1151px' }}>
                <iframe
                  src="https://api.leadconnectorhq.com/widget/form/9VayflYHGSuzPaYWM0cQ"
                  style={{ width: '100%', height: '1151px', border: 'none', borderRadius: '3px' }}
                  id="inline-9VayflYHGSuzPaYWM0cQ" 
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="Add My Community"
                  data-height="1151"
                  data-layout-iframe-id="inline-9VayflYHGSuzPaYWM0cQ"
                  data-form-id="9VayflYHGSuzPaYWM0cQ"
                  title="Add My Community"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  )
}
