import React, { useState, useEffect } from 'react'
import { 
  Settings, 
  X, 
  Type, 
  Contrast, 
  ZoomIn, 
  ZoomOut,
  Minus,
  Plus,
  Eye,
  Link as LinkIcon,
  Heading,
  AlignLeft,
  MousePointer,
  RotateCcw
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AccessibilityWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [settings, setSettings] = useState({
    fontSize: 100,
    letterSpacing: 0,
    lineHeight: 1.5,
    dyslexicFont: false,
    highContrast: false,
    cursorSize: 'normal',
    highlightLinks: false,
    highlightHeadings: false,
    grayscale: false,
    invertColors: false,
  })

  // Load saved preferences from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('arp-accessibility-settings')
    if (saved) {
      try {
        setSettings(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load accessibility settings:', e)
      }
    }
  }, [])

  // Save preferences to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('arp-accessibility-settings', JSON.stringify(settings))
    applySettings()
  }, [settings])

  const applySettings = () => {
    const root = document.documentElement

    // Font size
    root.style.setProperty('--accessibility-font-scale', `${settings.fontSize}%`)
    
    // Letter spacing
    root.style.setProperty('--accessibility-letter-spacing', `${settings.letterSpacing}px`)
    
    // Line height
    root.style.setProperty('--accessibility-line-height', settings.lineHeight)
    
    // Dyslexic font
    if (settings.dyslexicFont) {
      root.classList.add('dyslexic-font')
    } else {
      root.classList.remove('dyslexic-font')
    }
    
    // High contrast
    if (settings.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }
    
    // Cursor size
    root.setAttribute('data-cursor-size', settings.cursorSize)
    
    // Highlight links
    if (settings.highlightLinks) {
      root.classList.add('highlight-links')
    } else {
      root.classList.remove('highlight-links')
    }
    
    // Highlight headings
    if (settings.highlightHeadings) {
      root.classList.add('highlight-headings')
    } else {
      root.classList.remove('highlight-headings')
    }
    
    // Grayscale
    if (settings.grayscale) {
      root.classList.add('grayscale-mode')
    } else {
      root.classList.remove('grayscale-mode')
    }
    
    // Invert colors
    if (settings.invertColors) {
      root.classList.add('invert-colors')
    } else {
      root.classList.remove('invert-colors')
    }
  }

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  const increaseFontSize = () => {
    if (settings.fontSize < 150) {
      updateSetting('fontSize', settings.fontSize + 10)
    }
  }

  const decreaseFontSize = () => {
    if (settings.fontSize > 80) {
      updateSetting('fontSize', settings.fontSize - 10)
    }
  }

  const increaseLetterSpacing = () => {
    if (settings.letterSpacing < 5) {
      updateSetting('letterSpacing', settings.letterSpacing + 0.5)
    }
  }

  const decreaseLetterSpacing = () => {
    if (settings.letterSpacing > 0) {
      updateSetting('letterSpacing', settings.letterSpacing - 0.5)
    }
  }

  const increaseLineHeight = () => {
    if (settings.lineHeight < 2.5) {
      updateSetting('lineHeight', settings.lineHeight + 0.1)
    }
  }

  const decreaseLineHeight = () => {
    if (settings.lineHeight > 1.2) {
      updateSetting('lineHeight', settings.lineHeight - 0.1)
    }
  }

  const resetSettings = () => {
    const defaultSettings = {
      fontSize: 100,
      letterSpacing: 0,
      lineHeight: 1.5,
      dyslexicFont: false,
      highContrast: false,
      cursorSize: 'normal',
      highlightLinks: false,
      highlightHeadings: false,
      grayscale: false,
      invertColors: false,
    }
    setSettings(defaultSettings)
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-primary/50"
        aria-label="Open Accessibility Settings"
        title="Accessibility Settings"
      >
        <Settings className="h-6 w-6" />
      </button>

      {/* Widget Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-white rounded-lg shadow-2xl border border-gray-200 w-80 max-h-[600px] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              <h3 className="font-semibold">Accessibility Options</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 rounded p-1 transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* Font Size */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Type className="h-4 w-4" />
                Font Size: {settings.fontSize}%
              </label>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={decreaseFontSize}
                  disabled={settings.fontSize <= 80}
                  aria-label="Decrease font size"
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${((settings.fontSize - 80) / 70) * 100}%` }}
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={increaseFontSize}
                  disabled={settings.fontSize >= 150}
                  aria-label="Increase font size"
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Letter Spacing */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <AlignLeft className="h-4 w-4" />
                Letter Spacing: {settings.letterSpacing}px
              </label>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={decreaseLetterSpacing}
                  disabled={settings.letterSpacing <= 0}
                  aria-label="Decrease letter spacing"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${(settings.letterSpacing / 5) * 100}%` }}
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={increaseLetterSpacing}
                  disabled={settings.letterSpacing >= 5}
                  aria-label="Increase letter spacing"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Line Height */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <AlignLeft className="h-4 w-4 rotate-90" />
                Line Height: {settings.lineHeight.toFixed(1)}
              </label>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={decreaseLineHeight}
                  disabled={settings.lineHeight <= 1.2}
                  aria-label="Decrease line height"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${((settings.lineHeight - 1.2) / 1.3) * 100}%` }}
                  />
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={increaseLineHeight}
                  disabled={settings.lineHeight >= 2.5}
                  aria-label="Increase line height"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Toggle Options */}
            <div className="space-y-3">
              {/* Dyslexic Font */}
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Type className="h-4 w-4" />
                  Dyslexia-Friendly Font
                </span>
                <button
                  onClick={() => updateSetting('dyslexicFont', !settings.dyslexicFont)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.dyslexicFont ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={settings.dyslexicFont}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.dyslexicFont ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>

              {/* High Contrast */}
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Contrast className="h-4 w-4" />
                  High Contrast
                </span>
                <button
                  onClick={() => updateSetting('highContrast', !settings.highContrast)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.highContrast ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={settings.highContrast}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.highContrast ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>

              {/* Highlight Links */}
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" />
                  Highlight Links
                </span>
                <button
                  onClick={() => updateSetting('highlightLinks', !settings.highlightLinks)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.highlightLinks ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={settings.highlightLinks}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.highlightLinks ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>

              {/* Highlight Headings */}
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Heading className="h-4 w-4" />
                  Highlight Headings
                </span>
                <button
                  onClick={() => updateSetting('highlightHeadings', !settings.highlightHeadings)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.highlightHeadings ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={settings.highlightHeadings}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.highlightHeadings ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>

              {/* Grayscale */}
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Grayscale Mode
                </span>
                <button
                  onClick={() => updateSetting('grayscale', !settings.grayscale)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    settings.grayscale ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  role="switch"
                  aria-checked={settings.grayscale}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      settings.grayscale ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </label>

              {/* Cursor Size */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MousePointer className="h-4 w-4" />
                  Cursor Size
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {['normal', 'large', 'extra-large'].map((size) => (
                    <button
                      key={size}
                      onClick={() => updateSetting('cursorSize', size)}
                      className={`px-3 py-2 text-xs rounded border transition-colors ${
                        settings.cursorSize === size
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-700 border-gray-300 hover:border-primary'
                      }`}
                    >
                      {size === 'normal' ? 'Normal' : size === 'large' ? 'Large' : 'X-Large'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Reset Button */}
            <Button
              onClick={resetSettings}
              variant="outline"
              className="w-full"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset to Default
            </Button>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 p-3 rounded-b-lg border-t border-gray-200">
            <p className="text-xs text-gray-600 text-center">
              Settings are saved automatically
            </p>
          </div>
        </div>
      )}
    </>
  )
}
