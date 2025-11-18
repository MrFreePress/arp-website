import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { MapPin, Users, Calendar, ExternalLink } from 'lucide-react'

// Sample community data - ARP will provide actual data
const sampleCommunities = [
  {
    id: 1,
    name: 'Los Angeles Autism Support Group',
    state: 'California',
    city: 'Los Angeles',
    type: 'Support Group',
    description: 'Monthly meetups for families and caregivers in the LA area.',
    contact: 'la-support@example.com',
    website: '#',
    meetingSchedule: 'First Saturday of each month',
  },
  {
    id: 2,
    name: 'Bay Area Neurodiversity Network',
    state: 'California',
    city: 'San Francisco',
    type: 'Network',
    description: 'Professional networking and social events for neurodivergent adults.',
    contact: 'bayarea@example.com',
    website: '#',
    meetingSchedule: 'Bi-weekly virtual meetups',
  },
  {
    id: 3,
    name: 'San Diego Autism Resource Center',
    state: 'California',
    city: 'San Diego',
    type: 'Resource Center',
    description: 'Comprehensive resources, workshops, and family events.',
    contact: 'sandiego@example.com',
    website: '#',
    meetingSchedule: 'Open Monday-Friday',
  },
]

export default function Community() {
  const [selectedState, setSelectedState] = useState('all')
  const [selectedCity, setSelectedCity] = useState('all')
  const [selectedType, setSelectedType] = useState('all')

  // Extract unique values
  const states = ['all', ...new Set(sampleCommunities.map(c => c.state))]
  const cities = ['all', ...new Set(sampleCommunities.map(c => c.city))]
  const types = ['all', ...new Set(sampleCommunities.map(c => c.type))]

  // Filter communities
  const filteredCommunities = sampleCommunities.filter(community => {
    const matchesState = selectedState === 'all' || community.state === selectedState
    const matchesCity = selectedCity === 'all' || community.city === selectedCity
    const matchesType = selectedType === 'all' || community.type === selectedType
    
    return matchesState && matchesCity && matchesType
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-yellow-50 via-orange-50 to-pink-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Community Connection
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600">
              Find local support groups, events, and resources in your area. Connect with families and individuals who understand your journey.
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
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
            <h2 className="text-2xl font-bold text-gray-900">
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
      <section className="py-16 bg-gradient-to-br from-orange-500 via-pink-600 to-purple-600 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Want to Add Your Community?</h2>
          <p className="text-xl mb-8 text-green-100">
            Help us grow our network by submitting your local support group or organization
          </p>
          <Button size="lg" variant="secondary">
            Submit Community Information
          </Button>
        </div>
      </section>
    </div>
  )
}
