const services = [
    { title: 'Layout Architecture', desc: 'Hero, Features, Services, Stats, Testimonials, Footer — each a scoped section with its own visual identity.', tag: 'Structure' },
    { title: 'CSS Transitions', desc: 'Hover states with smooth color transitions, scale transforms, and box-shadow changes on cards and buttons.', tag: 'Animation' },
    { title: 'Keyframe Animations', desc: 'Custom @keyframes for fadeInUp, float, shimmer, and pulse-ring effects running across the page.', tag: 'Animation' },
    { title: 'Bootstrap Grid', desc: 'Responsive col-md/lg classes, gap utilities, and the Bootstrap 5 navbar with mobile hamburger toggle.', tag: 'Responsive' },
    { title: 'CSS Custom Properties', desc: 'All colors, fonts, and spacings defined as CSS variables enabling effortless global theming.', tag: 'Design System' },
    { title: 'Accessibility', desc: 'Keyboard-navigable navbar, focus-visible styles, semantic HTML5 landmarks, and reduced motion ready.', tag: 'A11y' },
]

export default function Services() {
    return (
        <section className="services-section" id="services">
            <div className="container">
                <div className="row align-items-end mb-5">
                    <div className="col-lg-6">
                        <div className="section-eyebrow">Task Requirements</div>
                        <h2 className="section-title mb-0">Every step, covered</h2>
                    </div>
                    <div className="col-lg-6">
                        <p className="section-sub text-lg-end ms-lg-auto mt-3 mt-lg-0">
                            Each service card maps directly to a step in the Cognifyz Level 2, Task 3 internship brief.
                        </p>
                    </div>
                </div>
                <div className="row g-4">
                    {services.map((s, i) => (
                        <div className="col-md-6" key={i}>
                            <div className="service-item">
                                <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                                <div>
                                    <div className="d-flex align-items-center gap-2 mb-1">
                                        <h5 className="mb-0">{s.title}</h5>
                                        <span className="service-badge">{s.tag}</span>
                                    </div>
                                    <p>{s.desc}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}