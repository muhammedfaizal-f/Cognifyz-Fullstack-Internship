const features = [
  { icon: 'bi-grid-1x2', title: 'Multi-Section Layout', desc: 'Complex grid and flexbox layouts with properly scoped Bootstrap breakpoints across all screen sizes.' },
  { icon: 'bi-stars', title: 'CSS Animations', desc: 'Keyframe animations for fade-in, floating elements, shimmer text, and pulse rings with smooth transitions.' },
  { icon: 'bi-phone', title: 'Fully Responsive', desc: 'Mobile-first design using Bootstrap 5 grid with custom breakpoints, fluid typography, and adaptive spacing.' },
  { icon: 'bi-palette2', title: 'Design System', desc: 'CSS custom properties for a consistent token-based design with a dark theme and accent color scale.' },
  { icon: 'bi-lightning', title: 'Vite Powered', desc: 'Blazing-fast HMR and optimized build pipeline using Vite 5 with the React plugin.' },
  { icon: 'bi-bootstrap', title: 'Bootstrap 5', desc: 'Utility-first classes from Bootstrap 5 combined with custom CSS for maximum flexibility and consistency.' },
]

export default function Features() {
  return (
    <section className="features-section py-5" id="features">
      <div className="container py-5">
        <div className="text-center mb-5">
          <div className="section-eyebrow">What's Inside</div>
          <h2 className="section-title">Built with every requirement</h2>
          <p className="section-sub">Every step from the Cognifyz Level 2 Task 3 brief is implemented and visible.</p>
        </div>
        <div className="row g-4">
          {features.map((f, i) => (
            <div className="col-md-6 col-lg-4" key={i}>
              <div className="feature-card">
                <div className="feature-icon-wrap">
                  <i className={`bi ${f.icon}`}></i>
                </div>
                <h5>{f.title}</h5>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}