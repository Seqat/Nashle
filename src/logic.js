// Feedback encoding: 2 = green, 1 = yellow, 0 = gray

export function computeFeedback(guess, target) {
  const g = guess.split('')
  const t = target.split('')
  const feedback = Array(5).fill(0)

  // Count letters in target for yellow assignment
  const targetCounts = new Map()
  for (const ch of t) targetCounts.set(ch, (targetCounts.get(ch) || 0) + 1)

  // First pass: greens
  for (let i = 0; i < 5; i++) {
    if (g[i] === t[i]) {
      feedback[i] = 2
      targetCounts.set(g[i], targetCounts.get(g[i]) - 1)
    }
  }

  // Second pass: yellows
  for (let i = 0; i < 5; i++) {
    if (feedback[i] !== 0) continue
    const ch = g[i]
    const cnt = targetCounts.get(ch) || 0
    if (cnt > 0) {
      feedback[i] = 1
      targetCounts.set(ch, cnt - 1)
    }
  }

  return feedback
}

export function feedbackKey(feedback) {
  return feedback.join('')
}

export function filterByFeedback(guess, feedback, words) {
  return words.filter((w) => feedbackKey(computeFeedback(guess, w)) === feedbackKey(feedback))
}

export function generateAdversarialFeedback(guess, possibleWords) {
  // Group words by the feedback they would produce; choose the largest group
  const groups = new Map() // key -> {feedback, words[]}

  for (const w of possibleWords) {
    const fb = computeFeedback(guess, w)
    const key = feedbackKey(fb)
    if (!groups.has(key)) groups.set(key, { feedback: fb, words: [] })
    groups.get(key).words.push(w)
  }

  if (groups.size === 0) {
    return { bestFeedback: [0, 0, 0, 0, 0], nextCandidates: [] }
  }

  // Pick max remaining. Tiebreak: prefer fewer greens to reveal less info.
  let best = null
  for (const g of groups.values()) {
    if (!best) { best = g; continue }
    if (g.words.length > best.words.length) {
      best = g
    } else if (g.words.length === best.words.length) {
      const greensG = g.feedback.filter((v) => v === 2).length
      const greensB = best.feedback.filter((v) => v === 2).length
      if (greensG < greensB) best = g
    }
  }

  return { bestFeedback: best.feedback, nextCandidates: best.words }
}

export function feedbackToTiles(guess, feedback) {
  return feedback.map((v, i) => ({
    char: guess[i]?.toUpperCase?.() || '',
    color: v === 2 ? 'tile-green' : v === 1 ? 'tile-yellow' : 'tile-gray',
  }))
}
