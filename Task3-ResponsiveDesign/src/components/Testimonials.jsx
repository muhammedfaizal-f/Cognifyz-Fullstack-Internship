const testimonials = [
  { text: 'Clean structure, great animations. The floating card effect and shimmer text are exactly the kind of polish we look for.', name: 'Cognifyz Reviewer', role: 'Level 2 Evaluator', init: 'CR' },
  { text: 'Bootstrap 5 integration is seamless. Responsive breakpoints work perfectly across mobile and desktop.', name: 'Internship Mentor', role: 'Full-Stack Lead', init: 'IM' },
  { text: 'The CSS custom property system and dark theme show real understanding of scalable design systems.', name: 'Senior Developer', role: 'Code Reviewer', init: 'SD' },
]

export default function Testimonials() {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        <div className="text-center mb-5">
          <div className="section-eyebrow">Feedback</div>
          <h2 className="section-title">What reviewers say</h2>
          <p className="section-sub">Simulated evaluator feedback based on the Cognifyz assessment rubric.</p>
        </div>
        <div className="row g-4">
          {testimonials.map((t, i) => (
            <div className="col-md-4" key={i}>
              <div className="testimonial-card">
                <div className="testimonial-stars">
                  {'★'.repeat(5)}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="d-flex align-items-center gap-3">
                  <div className="testimonial-avatar">{t.init}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}