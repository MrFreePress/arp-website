import matter from 'gray-matter'

/**
 * Content Loader Utilities
 * Loads and parses markdown content from CMS collections
 */

/**
 * Load all podcast episodes from content/podcast directory
 * @returns {Promise<Array>} Array of podcast episode objects
 */
export async function loadPodcastEpisodes() {
  try {
    const modules = import.meta.glob('/content/podcast/*.md', { query: '?raw', import: 'default', eager: true })
    const episodes = []

    for (const [path, content] of Object.entries(modules)) {
      const { data } = matter(content)
      const slug = path.split('/').pop().replace('.md', '')
      
      episodes.push({
        ...data,
        slug: data.slug || slug,
        id: data.episode || episodes.length + 1,
      })
    }

    return episodes.sort((a, b) => b.episode - a.episode)
  } catch (error) {
    console.error('Error loading podcast episodes:', error)
    return []
  }
}

/**
 * Load a single podcast episode by slug
 * @param {string} slug - Episode slug
 * @returns {Promise<Object|null>} Episode object or null
 */
export async function loadPodcastEpisode(slug) {
  try {
    const modules = import.meta.glob('/content/podcast/*.md', { query: '?raw', import: 'default', eager: true })
    
    for (const [path, content] of Object.entries(modules)) {
      const { data, content: body } = matter(content)
      const fileSlug = path.split('/').pop().replace('.md', '')
      
      if (data.slug === slug || fileSlug === slug) {
        return {
          ...data,
          body,
          slug: data.slug || fileSlug,
          id: data.episode,
        }
      }
    }
    
    return null
  } catch (error) {
    console.error('Error loading podcast episode:', error)
    return null
  }
}

/**
 * Load all blog posts from content/blog directory
 * @returns {Promise<Array>} Array of blog post objects
 */
export async function loadBlogPosts() {
  try {
    const modules = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default', eager: true })
    const posts = []

    for (const [path, content] of Object.entries(modules)) {
      const { data } = matter(content)
      const slug = path.split('/').pop().replace('.md', '')
      
      posts.push({
        ...data,
        slug: data.slug || slug,
        id: data.slug || slug,
      })
    }

    return posts.sort((a, b) => new Date(b.date) - new Date(a.date))
  } catch (error) {
    console.error('Error loading blog posts:', error)
    return []
  }
}

/**
 * Load a single blog post by slug
 * @param {string} slug - Post slug
 * @returns {Promise<Object|null>} Post object or null
 */
export async function loadBlogPost(slug) {
  try {
    const modules = import.meta.glob('/content/blog/*.md', { query: '?raw', import: 'default', eager: true })
    
    for (const [path, content] of Object.entries(modules)) {
      const { data, content: body } = matter(content)
      const fileSlug = path.split('/').pop().replace('.md', '')
      
      if (data.slug === slug || fileSlug.includes(slug)) {
        return {
          ...data,
          body,
          slug: data.slug || fileSlug,
          id: data.slug || fileSlug,
        }
      }
    }
    
    return null
  } catch (error) {
    console.error('Error loading blog post:', error)
    return null
  }
}

/**
 * Load all community resources from content/community directory
 * @returns {Promise<Array>} Array of community resource objects
 */
export async function loadCommunityResources() {
  try {
    const modules = import.meta.glob('/content/community/*.md', { query: '?raw', import: 'default', eager: true })
    const resources = []

    for (const [path, content] of Object.entries(modules)) {
      const { data } = matter(content)
      const slug = path.split('/').pop().replace('.md', '')
      
      resources.push({
        ...data,
        slug: data.slug || slug,
        id: data.slug || slug,
      })
    }

    return resources.sort((a, b) => a.name.localeCompare(b.name))
  } catch (error) {
    console.error('Error loading community resources:', error)
    return []
  }
}

/**
 * Load all library resources from content/library directory
 * @returns {Promise<Array>} Array of library resource objects
 */
export async function loadLibraryResources() {
  try {
    const modules = import.meta.glob('/content/library/*.md', { query: '?raw', import: 'default', eager: true })
    const resources = []

    for (const [path, content] of Object.entries(modules)) {
      const { data } = matter(content)
      const slug = path.split('/').pop().replace('.md', '')
      
      resources.push({
        ...data,
        slug: data.slug || slug,
        id: data.slug || slug,
      })
    }

    return resources.sort((a, b) => a.title.localeCompare(b.title))
  } catch (error) {
    console.error('Error loading library resources:', error)
    return []
  }
}

/**
 * Load a single library resource by slug
 * @param {string} slug - Resource slug
 * @returns {Promise<Object|null>} Resource object or null
 */
export async function loadLibraryResource(slug) {
  try {
    const modules = import.meta.glob('/content/library/*.md', { query: '?raw', import: 'default', eager: true })
    
    for (const [path, content] of Object.entries(modules)) {
      const { data, content: body } = matter(content)
      const fileSlug = path.split('/').pop().replace('.md', '')
      
      if (data.slug === slug || fileSlug === slug) {
        return {
          ...data,
          body,
          slug: data.slug || fileSlug,
          id: data.slug || fileSlug,
        }
      }
    }
    
    return null
  } catch (error) {
    console.error('Error loading library resource:', error)
    return null
  }
}
