export default function Hero() {
    const codeLines = [
        { color: '#4caf50', label: 'React + Vite', icon: '⚛️' },
        { color: '#58a6ff', label: 'Bootstrap 5', icon: '🎨' },
        { color: '#ffd700', label: 'CSS Animations', icon: '✨' },
        { color: '#f78166', label: 'Responsive Design', icon: '📱' },
    ]

    return (
        <section className="hero-section" id="home">
            <div className="container">
                <div className="row align-items-center g-5">
                    <div className="col-lg-6 animate-fade-up">
                        <div className="hero-badge">
                            <span className="dot animate-pulse-ring"></span>
                            Cognifyz · Level 2 · Task 3
                        </div>
                        <h1 className="hero-title">
                            Advanced CSS &amp;<br />
                            <span className="shimmer-text">Responsive Design</span>
                        </h1>
                        <p className="hero-subtitle">
                            Complex layouts, CSS transitions, animations, and Bootstrap 5 — all combined into a production-ready, fully responsive interface.
                        </p>
                        <div className="d-flex flex-wrap gap-3">
                            <a href="#features" className="btn-primary-cta">
                                Explore Features <i className="bi bi-arrow-down-right"></i>
                            </a>
                            <a href="#services" className="btn-outline-cta">
                                View Services <i className="bi bi-grid-3x3-gap"></i>
                            </a>
                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="hero-visual-card animate-float">
                            <div className="d-flex align-items-center gap-2 mb-3">
                                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#f78166', display: 'inline-block' }}></span>
                                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ffd700', display: 'inline-block' }}></span>
                                <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#4caf50', display: 'inline-block' }}></span>
                                <span className="ms-2 text-muted" style={{ fontSize: '0.75rem', fontFamily: 'monospace' }}>stack.config.js</span>
                            </div>
                            {codeLines.map((line, i) => (
                                <div className="code-line" key={i} style={{ animationDelay: `${i * 0.1}s` }}>
                                    <span className="code-dot" style={{ background: line.color }}></span>
                                    <span style={{ color: line.color, fontWeight: 600 }}>{line.icon} {line.label}</span>
                                    <span className="ms-auto" style={{ color: '#8b949e', fontSize: '0.75rem' }}>✓ loaded</span>
                                </div>
                            ))}
                            <div className="mt-3 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                                <span style={{ color: '#4caf50', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                                    ▶ npm run dev <span style={{ color: '#8b949e' }}>// ready in 320ms</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}