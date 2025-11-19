/**
 * Content Loader Utilities
 * 
 * These functions load content from Markdown files created by Decap CMS
 * and make them available to React components.
 */

import matter from 'gray-matter'

/**
 * Load all podcast episodes from the content folder
 * @returns {Array} Array of podcast episode objects
 */
export async function loadPodcastEpisodes() {
  try {
    // In production, this will load from the content folder
    // For now, we'll use a dynamic import approach
    const modules = import.meta.glob('/content/podcast/*.md', { as: 'raw' })
    const episodes = []

    for (const path in modules) {
      const content = await modules[path]()
      const { data, content: body } = matter(content)
      
      episodes.push({
        ...data,
        body,
        slug: data.slug || path.split('/').pop().replace('.md', '')
      })
    }

    // Sort by episode number (descending)
    return episodes.sort((a, b) => b.episode - a.episode)
  } catch (error) {
    console.error('Error loading podcast episodes:', error)
    return []
  }
}

/**
 * Load a single podcast episode by slug
 * @param {string} slug - The episode slug
 * @returns {Object|null} Episode object or null if not found
 */
export async function loadPodcastEpisode(slug) {
  try {
    const episodes = await loadPodcastEpisodes()
    return episodes.find(ep => ep.slug === slug) || null
  } catch (error) {
    console.error('Error loading podcast episode:', error)
    return null
  }
}

/**
 * Load all blog posts from the content folder
 * @returns {Array} Array of blog post objects
 */
export async function loadBlogPosts() {
  try {
    const modules = import.meta.glob('/content/blog/*.md', { as: 'raw' })
    const posts = []

    for (const path in modules) {
      const content = await modules[path]()
      const { data, content: body } = matter(content)
      
      posts.push({
        ...data,
        body,
        slug: data.slug || path.split('/').pop().replace('.md', '').replace(/^\d{4}-\d{2}-\d{2}-/, '')
      })
    }

    // Sort by date (descending)
    return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return []
  }
}

/**
 * Load a single blog post by slug
 * @param {string} slug - The post slug
 * @returns {Object|null} Post object or null if not found
 */
export async function loadBlogPost(slug) {
  try {
    const posts = await loadBlogPosts()
    return posts.find(post => post.slug === slug) || null
  } catch (error) {
    console.error('Error loading blog post:', error)
    return null
  }
}

/**
 * Load all community resources from the content folder
 * @returns {Array} Array of community resource objects
 */
export async function loadCommunityResources() {
  try {
    const modules = import.meta.glob('/content/community/*.md', { as: 'raw' })
    const resources = []

    for (const path in modules) {
      const content = await modules[path]()
      const { data } = matter(content)
      
      resources.push({
        ...data,
        id: data.slug || path.split('/').pop().replace('.md', '')
      })
    }

    // Sort by name
    return resources.sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error('Error loading community resources:', error)
    return []
  }
}

/**
 * Load all library resources from the content folder
 * @returns {Array} Array of library resource objects
 */
export async function loadLibraryResources() {
  try {
    const modules = import.meta.glob('/content/library/*.md', { as: 'raw' })
    const resources = []

    for (const path in modules) {
      const content = await modules[path]()
      const { data, content: body } = matter(content)
      
      resources.push({
        ...data,
        body,
        id: data.slug || path.split('/').pop().replace('.md', '')
      })
    }

    // Sort by title
    return resources.sort((a, b) => a.title.localeCompare(b.title))
  } catch (error) {
    console.error('Error loading library resources:', error)
    return []
  }
}

/**
 * Get featured content across all types
 * @returns {Object} Object with featured items from each content type
 */
export async function loadFeaturedContent() {
  try {
    const [podcasts, posts, communities, library] = await Promise.all([
      loadPodcastEpisodes(),
      loadBlogPosts(),
      loadCommunityResources(),
      loadLibraryResources()
    ])

    return {
      podcasts: podcasts.filter(ep => ep.featured).slice(0, 3),
      posts: posts.filter(post => post.featured).slice(0, 3),
      communities: communities.filter(c => c.featured).slice(0, 3),
      library: library.filter(r => r.featured).slice(0, 3)
    }
  } catch (error) {
    console.error('Error loading featured content:', error)
    return {
      podcasts: [],
      posts: [],
      communities: [],
      library: []
    }
  }
}

/**
 * Search across all content types
 * @param {string} query - Search query
 * @returns {Object} Search results by content type
 */
export async function searchContent(query) {
  if (!query || query.trim() === '') {
    return { podcasts: [], posts: [], communities: [], library: [] }
  }

  const searchTerm = query.toLowerCase()

  try {
    const [podcasts, posts, communities, library] = await Promise.all([
      loadPodcastEpisodes(),
      loadBlogPosts(),
      loadCommunityResources(),
      loadLibraryResources()
    ])

    return {
      podcasts: podcasts.filter(ep => 
        ep.title.toLowerCase().includes(searchTerm) ||
        ep.guest.toLowerCase().includes(searchTerm) ||
        ep.description.toLowerCase().includes(searchTerm) ||
        ep.topic.toLowerCase().includes(searchTerm)
      ),
      posts: posts.filter(post =>
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchTerm)) ||
        post.category.toLowerCase().includes(searchTerm)
      ),
      communities: communities.filter(c =>
        c.name.toLowerCase().includes(searchTerm) ||
        c.description.toLowerCase().includes(searchTerm) ||
        c.city.toLowerCase().includes(searchTerm) ||
        c.state.toLowerCase().includes(searchTerm)
      ),
      library: library.filter(r =>
        r.title.toLowerCase().includes(searchTerm) ||
        r.description.toLowerCase().includes(searchTerm) ||
        r.category.toLowerCase().includes(searchTerm) ||
        (r.tags && r.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
      )
    }
  } catch (error) {
    console.error('Error searching content:', error)
    return { podcasts: [], posts: [], communities: [], library: [] }
  }
}

/**
 * Get content statistics
 * @returns {Object} Statistics about content
 */
export async function getContentStats() {
  try {
    const [podcasts, posts, communities, library] = await Promise.all([
      loadPodcastEpisodes(),
      loadBlogPosts(),
      loadCommunityResources(),
      loadLibraryResources()
    ])

    return {
      totalPodcasts: podcasts.length,
      totalPosts: posts.length,
      totalCommunities: communities.length,
      totalLibrary: library.length,
      total: podcasts.length + posts.length + communities.length + library.length
    }
  } catch (error) {
    console.error('Error getting content stats:', error)
    return {
      totalPodcasts: 0,
      totalPosts: 0,
      totalCommunities: 0,
      totalLibrary: 0,
      total: 0
    }
  }
}
