import React, { useState } from 'react'

export default function Meter({ remaining, isThinking, possibleWords = [], showDevButton = false }) {
  const [showSolutions, setShowSolutions] = useState(false)

  return (
    <section className="glass p-4 md:p-5 border border-[#00FF80]/40 rounded-lg w-full">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="font-mono">
          <div className="text-xs text-[#C0FFC0]/60 mb-1">RATIONALITY METER</div>
          <div className="text-lg">
            <span className="text-[#00FF80] font-bold text-glow">{remaining}</span>
            <span className="text-[#C0FFC0]/70 ml-2">worlds remain</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {showDevButton && (
            <button
              onClick={() => setShowSolutions(!showSolutions)}
              className="text-xs px-2 py-1 border border-[#00FF80]/30 rounded text-[#00FF80]/70 hover:bg-[#00FF80]/10 transition-all duration-200 font-mono"
            >
              {showSolutions ? '[HIDE]' : '[SHOW]'} DEV
            </button>
          )}
          <div className="text-xs text-[#00FF80]/80 font-mono italic">
            {isThinking ? (
              <span className="flex items-center gap-2 animate-pulse">
                <span>&gt;</span>
                <span>Computing maximal ambiguity...</span>
              </span>
            ) : (
              <span className="text-[#C0FFC0]/40">Ready</span>
            )}
          </div>
        </div>
      </div>
      


      {/* Developer Solutions Section */}
      {showDevButton && showSolutions && (
        <div className="mt-4 pt-4 border-t border-[#00FF80]/20">
          <div className="text-xs text-[#C0FFC0]/60 mb-2 font-mono">POSSIBLE SOLUTIONS ({possibleWords.length}):</div>
          <div className="max-h-[200px] overflow-y-auto text-xs text-[#00FF80]/80 font-mono space-y-1">
            <div className="flex flex-wrap gap-1">
              {possibleWords.map((word, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-[#00FF80]/10 border border-[#00FF80]/30 rounded"
                >
                  {word.toUpperCase()}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
