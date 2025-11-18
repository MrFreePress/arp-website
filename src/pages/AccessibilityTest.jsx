import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function AccessibilityTest() {
  const [diagnostics, setDiagnostics] = useState({
    cssVariables: {},
    htmlClasses: [],
    htmlAttributes: {},
    computedStyles: {},
    localStorage: null,
    htmlFontSize: null,
    bodyFontSize: null,
  })

  const runDiagnostics = () => {
    const root = document.documentElement
    const body = document.body
    
    // Get CSS custom properties
    const styles = getComputedStyle(root)
    const cssVars = {
      fontScale: styles.getPropertyValue('--accessibility-font-scale'),
      letterSpacing: styles.getPropertyValue('--accessibility-letter-spacing'),
      lineHeight: styles.getPropertyValue('--accessibility-line-height'),
    }

    // Get HTML classes
    const classes = Array.from(root.classList)

    // Get HTML attributes
    const attrs = {
      cursorSize: root.getAttribute('data-cursor-size'),
      lang: root.getAttribute('lang'),
    }

    // Get computed styles
    const htmlStyles = getComputedStyle(root)
    const bodyStyles = getComputedStyle(body)
    const computed = {
      htmlFontSize: htmlStyles.fontSize,
      bodyFontSize: bodyStyles.fontSize,
      bodyLetterSpacing: bodyStyles.letterSpacing,
      bodyLineHeight: bodyStyles.lineHeight,
    }

    // Get localStorage
    const stored = localStorage.getItem('arp-accessibility-settings')
    let parsedStorage = null
    if (stored) {
      try {
        parsedStorage = JSON.parse(stored)
      } catch (e) {
        parsedStorage = { error: 'Failed to parse' }
      }
    }

    setDiagnostics({
      cssVariables: cssVars,
      htmlClasses: classes,
      htmlAttributes: attrs,
      computedStyles: computed,
      localStorage: parsedStorage,
      htmlFontSize: htmlStyles.fontSize,
      bodyFontSize: bodyStyles.fontSize,
    })

    console.log('=== ACCESSIBILITY DIAGNOSTICS ===')
    console.log('CSS Variables:', cssVars)
    console.log('HTML Classes:', classes)
    console.log('HTML Attributes:', attrs)
    console.log('Computed Styles:', computed)
    console.log('LocalStorage:', parsedStorage)
    console.log('================================')
  }

  useEffect(() => {
    runDiagnostics()
    
    // Re-run diagnostics every 2 seconds to catch changes
    const interval = setInterval(runDiagnostics, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Accessibility Widget Diagnostics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              This page monitors the accessibility widget in real-time. Open the accessibility 
              widget (purple gear icon) and make changes. The diagnostics below will update 
              automatically every 2 seconds.
            </p>
            <Button onClick={runDiagnostics}>Refresh Diagnostics Now</Button>
          </CardContent>
        </Card>

        {/* CSS Variables */}
        <Card>
          <CardHeader>
            <CardTitle>CSS Custom Properties</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <span>--accessibility-font-scale:</span>
                <span className="font-bold">{diagnostics.cssVariables.fontScale || 'NOT SET'}</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <span>--accessibility-letter-spacing:</span>
                <span className="font-bold">{diagnostics.cssVariables.letterSpacing || 'NOT SET'}</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <span>--accessibility-line-height:</span>
                <span className="font-bold">{diagnostics.cssVariables.lineHeight || 'NOT SET'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* HTML Classes */}
        <Card>
          <CardHeader>
            <CardTitle>HTML Element Classes</CardTitle>
          </CardHeader>
          <CardContent>
            {diagnostics.htmlClasses.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {diagnostics.htmlClasses.map((cls, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-100 dark:bg-purple-700 text-purple-800 dark:text-purple-200 rounded-full text-sm font-mono">
                    {cls}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300">No accessibility classes applied</p>
            )}
          </CardContent>
        </Card>

        {/* HTML Attributes */}
        <Card>
          <CardHeader>
            <CardTitle>HTML Element Attributes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <span>data-cursor-size:</span>
                <span className="font-bold">{diagnostics.htmlAttributes.cursorSize || 'NOT SET'}</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <span>lang:</span>
                <span className="font-bold">{diagnostics.htmlAttributes.lang || 'NOT SET'}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Computed Styles */}
        <Card>
          <CardHeader>
            <CardTitle>Computed Styles (Actual Applied Values)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 font-mono text-sm">
              <div className="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <span>HTML font-size:</span>
                <span className="font-bold">{diagnostics.computedStyles.htmlFontSize}</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <span>Body font-size:</span>
                <span className="font-bold">{diagnostics.computedStyles.bodyFontSize}</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <span>Body letter-spacing:</span>
                <span className="font-bold">{diagnostics.computedStyles.bodyLetterSpacing}</span>
              </div>
              <div className="flex justify-between p-2 bg-gray-100 dark:bg-gray-700 rounded">
                <span>Body line-height:</span>
                <span className="font-bold">{diagnostics.computedStyles.bodyLineHeight}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* LocalStorage */}
        <Card>
          <CardHeader>
            <CardTitle>LocalStorage Settings</CardTitle>
          </CardHeader>
          <CardContent>
            {diagnostics.localStorage ? (
              <pre className="bg-gray-100 dark:bg-gray-700 p-4 rounded overflow-x-auto text-sm">
                {JSON.stringify(diagnostics.localStorage, null, 2)}
              </pre>
            ) : (
              <p className="text-sm text-gray-600 dark:text-gray-300">No settings saved in localStorage</p>
            )}
          </CardContent>
        </Card>

        {/* Test Content */}
        <Card>
          <CardHeader>
            <CardTitle>Test Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Accessibility Widget Diagnostics</h1>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Heading 2 - Test Text</h2>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Heading 3 - Test Text</h3>
            
            <p className="text-base text-gray-600 dark:text-gray-300">
              This is a paragraph of test text. If the accessibility features are working, 
              this text should change size, spacing, and appearance when you adjust the 
              settings in the accessibility widget.
            </p>
            
            <p className="text-base">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
              nostrud exercitation ullamco laboris.
            </p>

            <a href="#" className="text-blue-600 underline">This is a test link</a>

            <ul className="list-disc list-inside space-y-2">
              <li>List item one</li>
              <li>List item two</li>
              <li>List item three</li>
            </ul>
          </CardContent>
        </Card>

        {/* Console Instructions */}
        <Card className="border-yellow-400 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-yellow-800">Console Monitoring</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-yellow-800 mb-2">
              Open your browser console (F12) to see detailed logs. You should see:
            </p>
            <ul className="list-disc list-inside text-yellow-800 space-y-1 text-sm">
              <li>"Applying accessibility settings" messages when you change settings</li>
              <li>"Font scale set to: X%" messages</li>
              <li>Diagnostic output every 2 seconds</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
