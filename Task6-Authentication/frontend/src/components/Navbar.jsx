import { useAuth } from '../context/AuthContext'
import { pushToast } from './Toast'
import './Navbar.css'

export default function Navbar({ navigate, onAddTask }) {
    const { user, logout } = useAuth()

    const handleLogout = () => {
        logout()
        pushToast({ type: 'info', title: 'Signed out', message: 'See you next time!' })
        navigate('/login')
    }

    return (
        <nav className="navbar navbar-expand-lg t6-navbar sticky-top">
            <div className="container-fluid px-4">
                <span className="navbar-brand t6-brand" onClick={() => navigate(user ? '/dashboard' : '/')}>
                    <i className="bi bi-shield-fill-check me-2" />
                    Cognifyz <span className="t6-brand-sub">Task 6</span>
                </span>

                <div className="d-flex align-items-center gap-3 ms-auto">
                    {user ? (
                        <>
                            <span className="t6-user-pill d-none d-md-flex">
                                <span className="t6-avatar">{user.name[0].toUpperCase()}</span>
                                {user.name.split(' ')[0]}
                            </span>
                            <button className="btn t6-add-btn d-none d-md-flex align-items-center gap-2" onClick={onAddTask}>
                                <i className="bi bi-plus-lg" /> New Task
                            </button>
                            <button className="btn t6-logout-btn" onClick={handleLogout}>
                                <i className="bi bi-box-arrow-right me-1" />
                                <span className="d-none d-md-inline">Logout</span>
                            </button>
                        </>
                    ) : (
                        <>
                            <span className="t6-nav-link" onClick={() => navigate('/login')}>Login</span>
                            <span className="t6-nav-link active" onClick={() => navigate('/register')}>Register</span>
                        </>
                    )}
                </div>
            </div>
        </nav>
    )
}