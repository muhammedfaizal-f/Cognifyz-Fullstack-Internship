// ── Mobile nav toggle ────────────────────────────
const toggle = document.getElementById('navToggle')
const links  = document.getElementById('navLinks')

if (toggle && links) {
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('open')
    links.classList.toggle('open')
  })
  // Close on link click
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      toggle.classList.remove('open')
      links.classList.remove('open')
    })
  )
}

// ── Live char counter for message textarea ───────
const msgArea = document.getElementById('message')
if (msgArea) {
  const label = msgArea.previousElementSibling
  const counter = document.createElement('span')
  counter.style.cssText = 'float:right;font-size:.72rem;color:var(--muted);'
  label.appendChild(counter)

  const update = () => {
    const len = msgArea.value.length
    counter.textContent = `${len} chars${len < 20 ? ` (${20 - len} more needed)` : ' ✓'}`
    counter.style.color = len < 20 ? 'var(--red)' : 'var(--green)'
  }
  msgArea.addEventListener('input', update)
  update()
}

// ── Live password strength indicator ────────────
const pwInput = document.getElementById('password')
if (pwInput) {
  const wrap = pwInput.parentElement
  const bar  = document.createElement('div')
  bar.style.cssText = 'height:4px;background:rgba(255,255,255,.08);border-radius:4px;margin-top:6px;overflow:hidden;'
  const fill = document.createElement('div')
  fill.style.cssText = 'height:100%;width:0;border-radius:4px;transition:width .3s,background .3s;'
  bar.appendChild(fill)
  wrap.appendChild(bar)

  pwInput.addEventListener('input', () => {
    const v = pwInput.value
    let score = 0
    if (v.length >= 8)            score++
    if (/[A-Z]/.test(v))          score++
    if (/[0-9]/.test(v))          score++
    if (/[^A-Za-z0-9]/.test(v))   score++
    if (v.length >= 12)            score++

    const levels = [
      { w:'0%',   c:'transparent' },
      { w:'25%',  c:'#f85149' },
      { w:'50%',  c:'#d29922' },
      { w:'75%',  c:'#58a6ff' },
      { w:'100%', c:'#3fb950' },
    ]
    const l = levels[Math.min(score, 4)]
    fill.style.width      = l.w
    fill.style.background = l.c
  })
}

// ── Scroll fade-up for elements ──────────────────
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('fade-up')
  })
}, { threshold: 0.1 })

document.querySelectorAll('.stat-card, .step-card, .submission-row')
  .forEach(el => observer.observe(el))