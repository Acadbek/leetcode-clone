import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Button } from './components/ui/button'
import { ThemeProvider } from './components/theme-provider'
import { ModeToggle } from './components/mode-toggle'
import { Routes, Route } from 'react-router-dom'
import Home from './_root/pages/Home'
import RootLayout from './_root/RootLayout'
import LeetCodeEditor from './components/shared/editor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <marquee direction='right' className='font-monospace'>
        🚧 This website is under development. Some features may not work as expected. 🚧
      </marquee>

      <Routes>
        <Route element={<RootLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/editor" element={<LeetCodeEditor />} />
        </Route>
      </Routes>
    </ThemeProvider>
  )
}

export default App
