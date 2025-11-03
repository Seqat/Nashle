import React, { useState, useEffect } from 'react'

export default function Header({ onReset, isThinking, remaining }) {
  const [aiStatus, setAiStatus] = useState('ACTIVE')
  
  useEffect(() => {
    if (remaining === 1) {
      setAiStatus('CORNERED')
    } else {
      setAiStatus('ACTIVE')
    }
  }, [remaining])

  return (
    <header className="py-6 border-b border-[#00FF80]/20 bg-black/60 backdrop-blur-sm z-10">
      <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wider font-display text-[#00FF80] drop-shadow-[0_0_10px_#00FF80] flex items-center gap-2">
            <span>♟</span>
            <span>Nashle</span>
            <span className="text-[#1AFF9C]">—</span>
            <span className="text-[#C0FFC0] text-lg md:text-xl">Outsmart the Adversary</span>
          </h1>
          <p className="text-xs text-[#C0FFC0]/60 mt-2 flex items-center gap-2 font-mono">
            <span className="blink-caret">&gt;</span>
            <span>Terminal interface initialized</span>
            <span className="ml-3 flex items-center gap-1">
              {aiStatus === 'ACTIVE' ? (
                <>
                  <span className="text-[#00FF80]">🟢</span>
                  <span className="text-[#00FF80]">{aiStatus}</span>
                </>
              ) : (
                <>
                  <span className="text-[#FF0050]">🔴</span>
                  <span className="text-[#FF0050]">{aiStatus}</span>
                </>
              )}
            </span>
          </p>
        </div>
        <button className="btn-primary font-mono text-sm" onClick={onReset}>
          [RESET]
        </button>
      </div>
    </header>
  )
}
