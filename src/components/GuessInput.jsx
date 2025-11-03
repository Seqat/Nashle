import React, { useState, useEffect } from 'react'

export default function GuessInput({ input, setInput, onSubmit, disabled, inputRef, message, isThinking }) {
  const [aiFeedback, setAiFeedback] = useState('')
  
  useEffect(() => {
    if (isThinking) {
      setAiFeedback('> Analyzing your move…')
      const timer = setTimeout(() => {
        setAiFeedback('> Processing input...')
      }, 150)
      const timer2 = setTimeout(() => {
        setAiFeedback('> Recalibrating equilibrium vectors...')
      }, 300)
      return () => {
        clearTimeout(timer)
        clearTimeout(timer2)
      }
    } else {
      setAiFeedback('')
    }
  }, [isThinking])

  const onKeyDown = (e) => {
    if (e.key === 'Enter') onSubmit()
  }

  const isError = message.includes('must be 5') || message.includes('Not in my lexicon')

  return (
    <section className="space-y-4 w-full">
      {/* AI Console Feedback */}
      <div className="space-y-2 min-h-[60px]">
        {isThinking && aiFeedback && (
          <div className="text-xs text-[#00FF80]/80 font-mono italic animate-pulse">
            {aiFeedback}
          </div>
        )}
        <div className={`text-sm font-mono min-h-5 ${
          isError 
            ? 'text-[#FF0050] animate-pulse' 
            : 'text-[#C0FFC0]/70'
        }`}>
          {message && !isThinking && (
            <span className="flex items-center gap-2">
              <span>&gt;</span>
              <span>{message}</span>
            </span>
          )}
        </div>
      </div>
            
      {/* Guess Input */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative w-full h-[48px]">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value.toUpperCase())}
            onKeyDown={onKeyDown}
            disabled={disabled}
            maxLength={5}
            placeholder="Type your guess…"
            className={`w-full h-full px-4 py-3 rounded bg-transparent border-2 ${
              isError 
                ? 'border-[#FF0050] shadow-[0_0_15px_#FF0050]' 
                : 'border-[#00FF80]/50 focus:border-[#00FF80] focus:shadow-[0_0_15px_#00FF80]'
            } focus:outline-none uppercase tracking-widest text-center text-[#C0FFC0] font-mono text-lg transition-all duration-200`}
          />
        </div>        
        <button 
          className="btn-primary w-full md:w-auto font-mono text-sm px-6 h-[48px] flex items-center justify-center" 
          onClick={onSubmit} 
          disabled={disabled}
          style={{ minWidth: '110px' }} // ensures visual symmetry with input height, adjust as needed
        >
          [SUBMIT]
        </button>
      </div>
      
    </section>
  )
}
