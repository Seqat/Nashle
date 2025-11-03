import { useEffect, useMemo, useRef, useState } from 'react'
import { generateAdversarialFeedback, filterByFeedback, feedbackToTiles } from './logic.js'
import { FIVE_LETTER_WORDS } from './words.js'
import Header from './components/Header.jsx'
import Meter from './components/Meter.jsx'
import GuessInput from './components/GuessInput.jsx'
import Grid from './components/Grid.jsx'
import EndGameModal from './components/EndGameModal.jsx'

function NashleApp() {
  const [possibleWords, setPossibleWords] = useState(FIVE_LETTER_WORDS)
  const [guesses, setGuesses] = useState([]) // [{word, feedback:[0|1|2,...]}]
  const [input, setInput] = useState('')
  const [message, setMessage] = useState('Make your move, human.')
  const [isThinking, setIsThinking] = useState(false)
  const [gameOver, setGameOver] = useState(false)
  const [revealWord, setRevealWord] = useState(null)
  const [isWin, setIsWin] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const inputRef = useRef(null)

  const remaining = possibleWords.length
  const maxTries = 9
  const thinkingDelayMs = 450

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const onReset = () => {
    setPossibleWords(FIVE_LETTER_WORDS)
    setGuesses([])
    setInput('')
    setMessage('New game. I will not be cornered this time.')
    setIsThinking(false)
    setGameOver(false)
    setRevealWord(null)
    setIsWin(false)
    setShowModal(false)
    inputRef.current?.focus()
  }

  const onCloseModal = () => {
    setShowModal(false)
  }

  const normalized = (s) => s.toLowerCase().replace(/[^a-z]/g, '')

  const submitGuess = async () => {
    if (gameOver || isThinking) return
    const guess = normalized(input)
    if (guess.length !== 5) {
      setMessage('Guess must be 5 letters.')
      return
    }
    if (!FIVE_LETTER_WORDS.includes(guess)) {
      setMessage('Not in my lexicon.')
      return
    }

    setIsThinking(true)
    setMessage('AI thinking...')

    // Small delay to simulate adversary thinking
    await new Promise((r) => setTimeout(r, thinkingDelayMs))

    const { bestFeedback, nextCandidates } = generateAdversarialFeedback(guess, possibleWords)

    // If no candidates remain, this shouldn't happen in normal gameplay, but handle it
    if (nextCandidates.length === 0) {
      setMessage("Error: No consistent worlds remain.")
      setIsThinking(false)
      setGameOver(true)
      setRevealWord(null)
      setIsWin(false)
      return
    }

    const newGuesses = [...guesses, { word: guess, feedback: bestFeedback }]
    setGuesses(newGuesses)
    setPossibleWords(nextCandidates)
    setIsThinking(false)

    // Check if we've reached max tries first
    if (newGuesses.length >= maxTries) {
      // Check if user wins: exactly 1 word remaining AND guessed correctly
      if (nextCandidates.length === 1 && guess === nextCandidates[0]) {
        setMessage('Exact. You named the only remaining world. You win.')
        setGameOver(true)
        setRevealWord(nextCandidates[0])
        setIsWin(true)
        setShowModal(true)
      } else {
        // AI wins - max tries reached without correct guess
        setMessage(`${maxTries} moves used. I'm still elusive. Try again!`)
        setGameOver(true)
        setRevealWord(nextCandidates[Math.floor(Math.random() * nextCandidates.length)])
        setIsWin(false)
        setShowModal(true)
      }
    } else if (nextCandidates.length === 1) {
      // Exactly 1 word remaining - user must guess it correctly to win
      if (guess === nextCandidates[0]) {
        setMessage('Exact. You named the only remaining world. You win.')
        setGameOver(true)
        setRevealWord(nextCandidates[0])
        setIsWin(true)
        setShowModal(true)
      } else {
        setMessage('Cornered. Only one world remains consistent. Name it to win.')
        // Continue playing - user can still guess the correct word
      }
    } else {
      setMessage("You think I'm cornered?")
    }

    setInput('')
    inputRef.current?.focus()
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') submitGuess()
  }

  const rows = useMemo(() => {
    const filled = guesses.map((g) => ({ word: g.word, tiles: feedbackToTiles(g.word, g.feedback) }))
    const empties = Array.from({ length: Math.max(0, maxTries - filled.length) }, () => ({ word: '', tiles: Array(5).fill({ char: '', color: 'tile-gray' }) }))
    return [...filled, ...empties]
  }, [guesses])

  return (
    <div className="min-h-screen bg-[#050505] text-[#C0FFC0] font-mono flex flex-col relative overflow-hidden">
      <Header onReset={onReset} isThinking={isThinking} remaining={remaining} />

      <main className="flex-1 flex items-center justify-center px-4 py-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-5xl mx-auto">
          {/* Left Column: Game Grid + Input */}
          <div className="flex flex-col items-center space-y-6 w-full">
            <Grid rows={rows} />
          </div>

          {/* Right Column: Rationality Meter + AI Console */}
          <div className="flex flex-col items-center md:items-start w-full max-w-[400px] mx-auto md:mx-0">
            <GuessInput 
              input={input} 
              setInput={setInput} 
              onSubmit={submitGuess} 
              disabled={isThinking || gameOver} 
              inputRef={inputRef} 
              message={message}
              isThinking={isThinking}
            />
            <div className="h-4"/>
            <Meter 
              remaining={remaining} 
              isThinking={isThinking} 
              possibleWords={possibleWords}
              showDevButton={import.meta.env.VITE_DEV_MODE === 'true'}
            />
          </div>
        </div>
      </main>

      {/* End Game Modal */}
      <EndGameModal 
        showModal={showModal} 
        isWin={isWin} 
        finalWord={revealWord} 
        onReset={onReset}
        onClose={onCloseModal}
      />
    </div>
  )
}

export default NashleApp
