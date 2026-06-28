// ── Temporary server-side in-memory storage ──────
// Simulates a database for Task 2 requirements

const store = {
  surveys:   [],
  feedbacks: [],

  // Helpers
  addSurvey(data) {
    const entry = { id: `SRV-${Date.now()}`, ...data, submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) }
    this.surveys.unshift(entry)
    return entry
  },

  addFeedback(data) {
    const entry = { id: `FBK-${Date.now()}`, ...data, submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) }
    this.feedbacks.unshift(entry)
    return entry
  },

  getStats() {
    const ratings    = this.feedbacks.map(f => parseInt(f.rating)).filter(Boolean)
    const avgRating  = ratings.length ? (ratings.reduce((a,b) => a+b, 0) / ratings.length).toFixed(1) : '—'
    const roleCount  = {}
    this.surveys.forEach(s => { roleCount[s.role] = (roleCount[s.role] || 0) + 1 })

    return {
      totalSurveys:   this.surveys.length,
      totalFeedbacks: this.feedbacks.length,
      avgRating,
      topRole: Object.entries(roleCount).sort((a,b) => b[1]-a[1])[0]?.[0] || '—',
    }
  },
}

module.exports = store