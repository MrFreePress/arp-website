import React from 'react'
import { Link } from 'react-router-dom'

export default function Accessibility() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-950/20 dark:to-indigo-950/20 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
              Accessibility Statement
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-300">
              Our commitment to making our website accessible to everyone
            </p>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-4 mb-4">Our Commitment</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                The Autism Resource Project is committed to ensuring digital accessibility for people of all abilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to ensure we provide equal access to all users.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Conformance Status</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 at Level AA. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone. The guidelines have three levels of accessibility: A, AA, and AAA. We have chosen Level AA as our target compliance level.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Accessibility Features</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">Our website includes the following accessibility features:</p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li><strong>Keyboard Navigation:</strong> All functionality is available using a keyboard</li>
                <li><strong>Screen Reader Compatibility:</strong> Our website is designed to work with popular screen readers</li>
                <li><strong>Alternative Text:</strong> Images include descriptive alternative text</li>
                <li><strong>Color Contrast:</strong> We maintain sufficient color contrast ratios for readability</li>
                <li><strong>Resizable Text:</strong> Text can be resized up to 200% without loss of content or functionality</li>
                <li><strong>Clear Navigation:</strong> Consistent and predictable navigation throughout the site</li>
                <li><strong>Focus Indicators:</strong> Visible focus indicators for keyboard navigation</li>
                <li><strong>Skip Links:</strong> Skip navigation links to bypass repetitive content</li>
                <li><strong>Semantic HTML:</strong> Proper heading structure and semantic markup</li>
                <li><strong>Dark Mode:</strong> Support for light and dark color schemes</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Accessibility Widget</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We provide an accessibility widget on our website that allows you to customize your browsing experience. Look for the accessibility icon in the corner of your screen to access features such as:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>Increase or decrease text size</li>
                <li>Adjust color contrast</li>
                <li>Toggle dark mode</li>
                <li>Highlight links</li>
                <li>Enable dyslexia-friendly fonts</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Assistive Technologies</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Our website is designed to be compatible with the following assistive technologies:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>Screen readers (JAWS, NVDA, VoiceOver, TalkBack)</li>
                <li>Screen magnification software</li>
                <li>Speech recognition software</li>
                <li>Alternative input devices</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Known Limitations</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                While we strive to ensure accessibility of the Autism Resource Project website, some content may not yet be fully accessible. We are actively working to address these issues. Known limitations include:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li>Some older PDF documents may not be fully accessible; we are working to update these</li>
                <li>Third-party embedded content (such as podcast players) may have varying levels of accessibility</li>
                <li>Some videos may not yet have captions or audio descriptions</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Feedback</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We welcome your feedback on the accessibility of the Autism Resource Project website. If you encounter any accessibility barriers or have suggestions for improvement, please let us know:
              </p>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <p className="text-gray-700 dark:text-gray-200 font-medium">Contact Us About Accessibility:</p>
                <p className="text-gray-600 dark:text-gray-300">Email: info@autismresourceproject.org</p>
                <p className="text-gray-600 dark:text-gray-300">Phone: (818) 451-9485</p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Or use our <Link to="/contact" className="text-primary hover:underline">contact form</Link>
                </p>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We try to respond to accessibility feedback within 2 business days.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Continuous Improvement</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We are committed to continuously improving the accessibility of our website. Our team regularly reviews our website for accessibility issues and works to fix them promptly. We also conduct periodic accessibility audits to ensure we meet current standards.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">Additional Resources</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                For more information about web accessibility, please visit:
              </p>
              <ul className="list-disc pl-6 text-gray-600 dark:text-gray-300 mb-6 space-y-2">
                <li><a href="https://www.w3.org/WAI/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">W3C Web Accessibility Initiative (WAI)</a></li>
                <li><a href="https://www.ada.gov/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">ADA.gov - Americans with Disabilities Act</a></li>
                <li><a href="https://webaim.org/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">WebAIM - Web Accessibility In Mind</a></li>
              </ul>

              <p className="text-gray-500 dark:text-gray-400 text-sm mt-8">
                This accessibility statement was last updated in January 2024.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
