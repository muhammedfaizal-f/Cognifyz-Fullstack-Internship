const stats = [
  { number: '6+', label: 'Page Sections' },
  { number: '5', label: 'CSS Animations' },
  { number: 'BS5', label: 'Framework Used' },
  { number: '100%', label: 'Responsive' },
]

export default function Stats() {
  return (
    <section className="stats-section" id="stats">
      <div className="container">
        <div className="text-center mb-5">
          <div className="section-eyebrow">By the Numbers</div>
          <h2 className="section-title">This page at a glance</h2>
        </div>
        <div className="row g-4">
          {stats.map((s, i) => (
            <div className="col-6 col-lg-3" key={i}>
              <div className="stat-card">
                <div className="stat-number gradient-text">{s.number}</div>
                <div className="stat-label">{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}