import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Command } from 'cmdk'
import { Search, FileText, Podcast, Users, BookOpen, ShoppingBag, MessageCircle, Heart, Home, Info } from 'lucide-react'

export default function CommandPalette({ open, onOpenChange }) {
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  // Keyboard shortcut handler
  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(true)
      }
    }

    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [onOpenChange])

  // Close on escape
  useEffect(() => {
    if (!open) {
      setSearch('')
    }
  }, [open])

  const handleSelect = (path) => {
    navigate(path)
    onOpenChange(false)
  }

  // Main navigation pages
  const pages = [
    { name: 'Home', path: '/', icon: Home, description: 'Return to homepage' },
    { name: 'About Us', path: '/about', icon: Info, description: 'Learn about our mission' },
    { name: 'Podcast', path: '/podcast', icon: Podcast, description: 'Listen to episodes' },
    { name: 'Community', path: '/community', icon: Users, description: 'Find local resources' },
    { name: 'Library', path: '/library', icon: BookOpen, description: 'Browse resources' },
    { name: 'Marketplace', path: '/marketplace', icon: ShoppingBag, description: 'Shop products' },
    { name: 'Blog', path: '/blog', icon: MessageCircle, description: 'Read articles' },
    { name: 'Contact', path: '/contact', icon: FileText, description: 'Get in touch' },
    { name: 'Donate', path: '/donate', icon: Heart, description: 'Support our mission' },
  ]

  // Sample blog posts for search
  const blogPosts = [
    { name: '10 Essential Tips for Navigating Autism Diagnosis', path: '/blog', type: 'Blog Post' },
    { name: 'Understanding Sensory Processing in Autism', path: '/blog', type: 'Blog Post' },
    { name: 'Building Communication Skills: AAC Devices', path: '/blog', type: 'Blog Post' },
  ]

  // Sample podcast episodes for search
  const podcastEpisodes = [
    { name: 'Understanding Autism Spectrum Disorder - Dr. Temple Grandin', path: '/podcast', type: 'Podcast' },
    { name: 'Navigating Special Education - Elizabeth Hamblet', path: '/podcast', type: 'Podcast' },
    { name: 'Building Social Skills - Elaine Hall', path: '/podcast', type: 'Podcast' },
  ]

  // Filter results based on search
  const filteredPages = pages.filter(page =>
    page.name.toLowerCase().includes(search.toLowerCase()) ||
    page.description.toLowerCase().includes(search.toLowerCase())
  )

  const filteredBlogPosts = blogPosts.filter(post =>
    post.name.toLowerCase().includes(search.toLowerCase())
  )

  const filteredPodcasts = podcastEpisodes.filter(episode =>
    episode.name.toLowerCase().includes(search.toLowerCase())
  )

  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in"
        onClick={() => onOpenChange(false)}
      />
      
      {/* Command Palette */}
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-2xl z-50 animate-in fade-in slide-in-from-top-4">
        <Command className="rounded-lg border shadow-2xl bg-white dark:bg-gray-900 dark:border-gray-700">
          <div className="flex items-center border-b dark:border-gray-700 px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <Command.Input
              value={search}
              onValueChange={setSearch}
              placeholder="Search pages, articles, episodes..."
              className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-gray-500 dark:placeholder:text-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <kbd className="pointer-events-none hidden h-5 select-none items-center gap-1 rounded border bg-gray-100 dark:bg-gray-800 px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
              <span className="text-xs">ESC</span>
            </kbd>
          </div>
          
          <Command.List className="max-h-[400px] overflow-y-auto overflow-x-hidden p-2">
            <Command.Empty className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
              No results found.
            </Command.Empty>

            {filteredPages.length > 0 && (
              <Command.Group heading="Pages" className="px-2 py-2">
                <div className="mb-1 px-2 text-xs font-medium text-gray-500 dark:text-gray-400">Pages</div>
                {filteredPages.map((page) => (
                  <Command.Item
                    key={page.path}
                    value={page.name}
                    onSelect={() => handleSelect(page.path)}
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-gray-100 dark:hover:bg-gray-800 data-[selected=true]:bg-gray-100 dark:data-[selected=true]:bg-gray-800"
                  >
                    <page.icon className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span className="font-medium">{page.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{page.description}</span>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {filteredBlogPosts.length > 0 && (
              <Command.Group heading="Blog Posts" className="px-2 py-2">
                <div className="mb-1 px-2 text-xs font-medium text-gray-500 dark:text-gray-400">Blog Posts</div>
                {filteredBlogPosts.map((post, index) => (
                  <Command.Item
                    key={index}
                    value={post.name}
                    onSelect={() => handleSelect(post.path)}
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-gray-100 dark:hover:bg-gray-800 data-[selected=true]:bg-gray-100 dark:data-[selected=true]:bg-gray-800"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span className="font-medium">{post.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{post.type}</span>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}

            {filteredPodcasts.length > 0 && (
              <Command.Group heading="Podcast Episodes" className="px-2 py-2">
                <div className="mb-1 px-2 text-xs font-medium text-gray-500 dark:text-gray-400">Podcast Episodes</div>
                {filteredPodcasts.map((episode, index) => (
                  <Command.Item
                    key={index}
                    value={episode.name}
                    onSelect={() => handleSelect(episode.path)}
                    className="relative flex cursor-pointer select-none items-center rounded-sm px-2 py-2 text-sm outline-none hover:bg-gray-100 dark:hover:bg-gray-800 data-[selected=true]:bg-gray-100 dark:data-[selected=true]:bg-gray-800"
                  >
                    <Podcast className="mr-2 h-4 w-4" />
                    <div className="flex flex-col">
                      <span className="font-medium">{episode.name}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{episode.type}</span>
                    </div>
                  </Command.Item>
                ))}
              </Command.Group>
            )}
          </Command.List>

          <div className="border-t dark:border-gray-700 px-3 py-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="flex items-center justify-between">
              <span>Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-100 dark:bg-gray-800 px-1.5 font-mono text-[10px] font-medium">↑↓</kbd> to navigate</span>
              <span>Press <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-gray-100 dark:bg-gray-800 px-1.5 font-mono text-[10px] font-medium">⏎</kbd> to select</span>
            </div>
          </div>
        </Command>
      </div>
    </>
  )
}
