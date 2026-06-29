

document.querySelectorAll(".star").forEach((star) => {
  star.addEventListener("click", function () {
    setRating(Number(this.dataset.value));
  });

  star.addEventListener("mouseover", function () {
    hoverRating(Number(this.dataset.value));
  });

  star.addEventListener("mouseout", function () {
    resetRatingHover();
  });
});


// ── Mobile nav ────────────────────────────────────
const navToggle = document.getElementById('navToggle')
const navLinks = document.getElementById('navLinks')
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open')
    navLinks.classList.toggle('open')
  })
  navLinks.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
      navToggle.classList.remove('open')
      navLinks.classList.remove('open')
    })
  )
}

// ── Core field validator ──────────────────────────
// Called inline: oninput="validateField(this, val => ...)"
function validateField(input, ruleFn) {
  const errEl = document.getElementById(input.id + '-err')
    || input.parentElement.querySelector('.field-error')
  const msg = ruleFn(input.value)

  if (msg) {
    input.classList.remove('is-valid')
    input.classList.add('is-error')
    if (errEl) errEl.textContent = msg
  } else {
    input.classList.remove('is-error')
    input.classList.add('is-valid')
    if (errEl) errEl.textContent = ''
  }
  updateProgress()
  return !msg
}

// ── Checkbox group validator ──────────────────────
// Called inline: onchange="validateCheckboxGroup(...)"
function validateCheckboxGroup(groupId, errId, msg) {
  const group = document.getElementById(groupId)
  const errEl = document.getElementById(errId)
  const checked = group.querySelectorAll('input[type=checkbox]:checked').length

  if (checked === 0) {
    if (errEl) errEl.textContent = msg
    return false
  } else {
    if (errEl) errEl.textContent = ''
    return true
  }
}

// ── Radio group validator ─────────────────────────
function validateRadioGroup(groupId, errId, msg) {
  const group = document.getElementById(groupId)
  const errEl = document.getElementById(errId)
  const checked = group.querySelector('input[type=radio]:checked')

  if (!checked) {
    if (errEl) errEl.textContent = msg
    return false
  } else {
    if (errEl) errEl.textContent = ''
    return true
  }
}

// ── Salary range slider ───────────────────────────
function updateSalary(input) {
  const display = document.getElementById('salaryDisplay')
  if (!display) return
  const val = parseInt(input.value)
  const lakh = val / 100000
  display.textContent = lakh >= 10
    ? `₹${(lakh / 10).toFixed(1)}Cr`
    : `₹${lakh.toFixed(1)}L`
}

// ── Star rating ───────────────────────────────────
const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent']
let currentRating = 0

function setRating(val) {
  currentRating = val
  const hidden = document.getElementById('ratingInput')
  if (hidden) hidden.value = val
  updateStars(val)
  const errEl = document.getElementById('rating-err')
  if (errEl) errEl.textContent = ''
}

function hoverRating(val) { updateStars(val) }

function resetRatingHover() { updateStars(currentRating) }

function updateStars(val) {
  const stars = document.querySelectorAll('.star')
  const label = document.getElementById('ratingText')
  stars.forEach((s, i) => s.classList.toggle('active', i < val))
  if (label) label.textContent = val ? ratingLabels[val] : 'Click to rate'
}

// Init stars if old rating exists
; (function initRating() {
  const hidden = document.getElementById('ratingInput')
  if (hidden && hidden.value) {
    currentRating = parseInt(hidden.value)
    updateStars(currentRating)
  }
})()

// ── Char counter ──────────────────────────────────
function updateCharCount(textareaId, counterId, minLen) {
  const ta = document.getElementById(textareaId)
  const counter = document.getElementById(counterId)
  if (!ta || !counter) return
  const len = ta.value.trim().length
  const left = Math.max(0, minLen - len)
  counter.textContent = left > 0 ? `${len} / ${minLen} min (${left} more)` : `${len} ✓`
  counter.style.color = left > 0 ? 'var(--red)' : 'var(--green)'
}

// ── Form progress bar ─────────────────────────────
function updateProgress() {
  const form = document.querySelector('form')
  if (!form) return
  const fill = document.getElementById('progressFill')
  const label = document.getElementById('progressLabel')
  if (!fill) return

  const required = form.querySelectorAll('input[required], select[required], textarea[required], input[oninput], select[onchange]')
  const validFields = form.querySelectorAll('.is-valid')
  const total = required.length || 1
  const pct = Math.round((validFields.length / total) * 100)

  fill.style.width = `${Math.min(pct, 100)}%`
  if (label) label.textContent = `${Math.min(pct, 100)}% complete`
}

// ── Survey form — full client-side validation ─────
function validateSurveyForm(e) {
  let valid = true
  const checks = [
    ['name', val => {
      if (!val.trim()) return 'Name is required.'
      if (val.trim().length < 3) return 'Min 3 characters.'
      if (!/^[A-Za-z\s]+$/.test(val)) return 'Letters only.'
      return ''
    }],
    ['email', val => {
      if (!val.trim()) return 'Email is required.'
      if (!/^\S+@\S+\.\S+$/.test(val)) return 'Enter a valid email.'
      return ''
    }],
    ['age', val => {
      if (!val) return 'Age is required.'
      if (val < 16 || val > 80) return 'Age must be 16–80.'
      return ''
    }],
    ['gender', val => val ? '' : 'Please select gender.'],
    ['occupation', val => val.trim() ? '' : 'Occupation is required.'],
    ['experience', val => val ? '' : 'Please select experience.'],
  ]

  checks.forEach(([id, fn]) => {
    const el = document.getElementById(id)
    if (el && !validateField(el, fn)) valid = false
  })

  if (!validateCheckboxGroup('skillsGroup', 'skills-err', 'Select at least one skill.')) valid = false

  if (!valid) {
    e.preventDefault()
    document.querySelector('.is-error')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  return valid
}

// ── Feedback form — full client-side validation ───
function validateFeedbackForm(e) {
  let valid = true
  const checks = [
    ['fname', val => val.trim().length >= 3 ? '' : 'Name must be at least 3 characters.'],
    ['femail', val => /^\S+@\S+\.\S+$/.test(val) ? '' : 'Enter a valid email.'],
    ['category', val => val ? '' : 'Please select a category.'],
    ['ftitle', val => val.trim().length >= 5 ? '' : 'Title must be at least 5 characters.'],
    ['feedback', val => val.trim().length >= 30 ? '' : `${30 - val.trim().length} more characters needed.`],
  ]

  checks.forEach(([id, fn]) => {
    const el = document.getElementById(id)
    if (el && !validateField(el, fn)) valid = false
  })

  // Rating
  const ratingVal = document.getElementById('ratingInput')?.value
  const ratingErr = document.getElementById('rating-err')
  if (!ratingVal) {
    if (ratingErr) ratingErr.textContent = 'Please provide a rating.'
    valid = false
  }

  // Recommend
  if (!validateRadioGroup('recommendGroup', 'recommend-err', 'Please answer this question.')) valid = false

  if (!valid) {
    e.preventDefault()
    document.querySelector('.is-error, #rating-err:not(:empty)')
      ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  return valid
}

// ── Dashboard tab switcher ────────────────────────
function switchTab(name, btn) {
  document.querySelectorAll('.tab-pane').forEach(p => p.style.display = 'none')
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'))
  const pane = document.getElementById(`tab-${name}`)
  if (pane) pane.style.display = 'block'
  btn.classList.add('active')
}

// ── Scroll reveal ─────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('fade-up') })
}, { threshold: 0.1 })

document.querySelectorAll('.stat-card, .feature-card, .recent-row').forEach(el =>
  observer.observe(el)
)

