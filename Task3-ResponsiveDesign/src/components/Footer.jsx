export default function Footer() {
  return (
    <footer className="footer-section">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-4">
            <div className="footer-brand">
              <i className="bi bi-lightning-charge-fill me-1"></i>Cognifyz
            </div>
            <p className="footer-desc">
              Level 2 · Task 3 — Advanced CSS Styling &amp; Responsive Design. Built with React, Vite, and Bootstrap 5 during the Cognifyz IT Solutions internship.
            </p>
            <div className="d-flex gap-3">
              {['github','linkedin','twitter-x'].map(icon => (
                <a href="#" key={icon} className="footer-link" style={{fontSize:'1.1rem'}}>
                  <i className={`bi bi-${icon}`}></i>
                </a>
              ))}
            </div>
          </div>

          {[
            { heading: 'Sections', links: ['Home','Features','Services','Stats','Testimonials'] },
            { heading: 'Stack', links: ['React 18','Vite 5','Bootstrap 5','Bootstrap Icons','CSS Variables'] },
          ].map(col => (
            <div className="col-6 col-lg-2" key={col.heading}>
              <div className="footer-heading">{col.heading}</div>
              {col.links.map(l => <a href="#" className="footer-link" key={l}>{l}</a>)}
            </div>
          ))}

          <div className="col-lg-3">
            <div className="footer-heading">Internship</div>
            <p style={{fontSize:'0.875rem', color:'var(--text-muted)', lineHeight:1.7}}>
              Cognifyz IT Solutions Pvt. Ltd.<br />
              Remote · June – July 2026<br />
              Full-Stack Development Track
            </p>
          </div>
        </div>

        <hr className="footer-divider" />
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-2">
          <span className="footer-copy">© 2026 Cognifyz Task 3 · Muhammed Faizal F</span>
          <span className="footer-copy">React + Vite + Bootstrap 5</span>
        </div>
      </div>
    </footer>
  )
}