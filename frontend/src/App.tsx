import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Models from './pages/Models'
import Agents from './pages/Agents'
import Workflows from './pages/Workflows'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'

function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    // Check for system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else if (prefersDark) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <Routes>
      <Route path="/" element={<Layout theme={theme} toggleTheme={toggleTheme} />}>
        <Route index element={<Dashboard />} />
        <Route path="tasks" element={<Tasks />} />
        <Route path="models" element={<Models />} />
        <Route path="agents" element={<Agents />} />
        <Route path="workflows" element={<Workflows />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
