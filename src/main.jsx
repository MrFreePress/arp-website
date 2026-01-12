// Polyfill Buffer for browser (required by gray-matter)
import { Buffer } from 'buffer'
globalThis.Buffer = Buffer

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider } from './components/ThemeProvider'
import './index.css'
import './accessibility.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
