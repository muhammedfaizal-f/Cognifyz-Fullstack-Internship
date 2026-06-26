import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, navigate }) {
  const { user, loading } = useAuth()

  if (loading) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', minHeight:'80vh', gap:'1rem', color:'var(--muted)' }}>
      <div style={{ width:32, height:32, border:'3px solid var(--border)', borderTopColor:'var(--green)', borderRadius:'50%', animation:'spin .8s linear infinite' }} />
      Authenticating…
    </div>
  )

  if (!user) {
    navigate('/login')
    return null
  }

  return children
}