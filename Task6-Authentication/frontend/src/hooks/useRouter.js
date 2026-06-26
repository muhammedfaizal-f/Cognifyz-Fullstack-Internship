import { useState, useEffect } from 'react'

export function useRouter() {
  const get = () => window.location.hash.replace('#', '') || '/'
  const [route, setRoute] = useState(get)

  useEffect(() => {
    const h = () => setRoute(get())
    window.addEventListener('hashchange', h)
    return () => window.removeEventListener('hashchange', h)
  }, [])

  return { route, navigate: (p) => { window.location.hash = p } }
}