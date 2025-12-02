import { generateAdversarialFeedback } from './logic.js'
import { FIVE_LETTER_WORDS } from './words.js'

// Evaluate each possible opening guess by the worst-case remaining candidates
// (size of the largest feedback bucket). Then print the top 5 with smallest worst case.

function scoreOpeners(words) {
  const results = []

  for (const guess of words) {
    const { nextCandidates } = generateAdversarialFeedback(guess, words)
    const worstCaseSize = nextCandidates.length
    results.push({ guess, worstCaseSize })
  }

  results.sort((a, b) => a.worstCaseSize - b.worstCaseSize || a.guess.localeCompare(b.guess))
  return results
}

function printTop(results, n = 5) {
  const top = results.slice(0, n)
  for (const { guess, worstCaseSize } of top) {
    console.log(`${guess}\t${worstCaseSize}`)
  }
}

const results = scoreOpeners(FIVE_LETTER_WORDS)
printTop(results, 10)


