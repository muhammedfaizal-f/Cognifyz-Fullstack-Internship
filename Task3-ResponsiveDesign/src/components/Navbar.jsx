import { useState, useEffect } from 'react'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', onScroll)
        return () => window.removeEventListener('scroll', onScroll)
    }, [])

    const closeMenu = () => {
        const navMenu = document.getElementById('navMenu')
        if (navMenu.classList.contains('show')) {
            navMenu.classList.remove('show')
        }
    }

    return (
        <nav className={`navbar navbar-expand-lg custom-navbar fixed-top ${scrolled ? 'shadow-lg' : ''}`}>
            <div className="container">
                <a className="navbar-brand nav-brand-logo" href="#">
                    <i className="bi bi-lightning-charge-fill me-1"></i>Cognifyz
                </a>
                <button className="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
                    <i className="bi bi-list text-white fs-4"></i>
                </button>
                <div className="collapse navbar-collapse" id="navMenu">
                    <ul className="navbar-nav mx-auto gap-1">
                        {['Home', 'Features', 'Services', 'Stats', 'Testimonials'].map(item => (
                            <li className="nav-item" key={item}>
                                <a
                                    className="nav-link nav-link-custom px-3"
                                    href={`#${item.toLowerCase()}`}
                                    onClick={closeMenu}
                                >
                                    {item}
                                </a>
                            </li>
                        ))}
                    </ul>
                    <a href="#home" className="btn-nav-cta" onClick={closeMenu}>
                        Get Started
                    </a>
                </div>
            </div>
        </nav>
    )
}