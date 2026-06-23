import { useState, useEffect } from 'react'

// Lightweight client-side hash router (no React Router dependency)
export function useRouter() {
  const getRoute = () => window.location.hash.replace('#', '') || '/'

  const [route, setRoute] = useState(getRoute)

  useEffect(() => {
    const handler = () => setRoute(getRoute())
    window.addEventListener('hashchange', handler)
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  const navigate = (path) => {
    window.location.hash = path
  }

  return { route, navigate }
}