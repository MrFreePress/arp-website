import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import AccessibilityWidget from './components/AccessibilityWidget'
import Home from './pages/Home'
import About from './pages/About'
import Podcast from './pages/Podcast'
import PodcastEpisode from './pages/PodcastEpisode'
import Community from './pages/Community'
import Library from './pages/Library'
import ResourceDetail from './pages/ResourceDetail'
import Marketplace from './pages/Marketplace'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Contact from './pages/Contact'
import Donate from './pages/Donate'
import AccessibilityTest from './pages/AccessibilityTest'
import PrivacyPolicy from './pages/PrivacyPolicy'

function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow" id="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/podcast" element={<Podcast />} />
            <Route path="/podcast/:slug" element={<PodcastEpisode />} />
            <Route path="/community" element={<Community />} />
            <Route path="/library" element={<Library />} />
            <Route path="/library/:slug" element={<ResourceDetail />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/accessibility-test" element={<AccessibilityTest />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
        <AccessibilityWidget />
      </div>
    </Router>
  )
}

export default App
