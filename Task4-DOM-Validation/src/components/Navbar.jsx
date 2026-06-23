export default function Navbar({ route, navigate, user, onLogout }) {
  return (
    <nav className="t4-navbar sticky-top">
      <div className="container d-flex align-items-center gap-3">
        <a className="t4-brand me-auto" onClick={() => navigate('/')}>
          <i className="bi bi-shield-fill-check me-1"></i>Cognifyz
        </a>
        {!user ? (
          <>
            <span
              className={`t4-nav-link ${route === '/' ? 'active' : ''}`}
              onClick={() => navigate('/')}
            >Register</span>
            <span
              className={`t4-nav-link ${route === '/login' ? 'active' : ''}`}
              onClick={() => navigate('/login')}
            >Login</span>
          </>
        ) : (
          <>
            <span
              className={`t4-nav-link ${route === '/dashboard' ? 'active' : ''}`}
              onClick={() => navigate('/dashboard')}
            >Dashboard</span>
            <button className="btn-logout" onClick={onLogout}>
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}