import './Navbar.css'

export default function Navbar({ apiStatus, onAddTask }) {
  return (
    <nav className="navbar navbar-expand-lg t5-navbar sticky-top">
      <div className="container-fluid px-4">

        <span className="navbar-brand t5-brand">
          <i className="bi bi-lightning-charge-fill me-2" />
          Cognifyz <span className="t5-brand-sub">Task 5</span>
        </span>

        <div className="d-flex align-items-center gap-3 ms-auto">
          {/* API status pill */}
          <span className={`api-status-pill ${apiStatus}`}>
            <span className="api-dot" />
            {apiStatus === 'online' && 'API Online'}
            {apiStatus === 'offline' && 'API Offline'}
            {apiStatus === 'checking' && 'Checking…'}
          </span>

          <button className="btn t5-add-btn d-none d-md-flex align-items-center gap-2" onClick={onAddTask}>
            <i className="bi bi-plus-lg" /> New Task
          </button>

          {/* Mobile add */}
          <button className="btn t5-add-btn-icon d-md-none" onClick={onAddTask}>
            <i className="bi bi-plus-lg" />
          </button>
        </div>
      </div>
    </nav>
  )
}