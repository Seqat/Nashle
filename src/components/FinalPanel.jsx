import React from 'react'

export default function FinalPanel({ gameOver, revealWord }) {
  if (!gameOver) return null
  return (
    <section className="glass p-4 md:p-5 border border-[#00FF80]/30 max-w-[400px] mx-auto">
      <div className="text-xs text-[#C0FFC0]/60 mb-3 font-mono">FINAL RECKONING</div>
      {revealWord ? (
        <div className="font-mono">
          <div className="text-sm text-[#C0FFC0]/70 mb-3">AI's consistent world revealed:</div>
          <div className="text-3xl tracking-widest text-[#00FF80] font-bold text-glow text-center py-4 border border-[#00FF80]/30 rounded">
            {revealWord.toUpperCase()}
          </div>
        </div>
      ) : (
        <div className="font-mono text-[#C0FFC0]/70">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[#00FF80]">&gt;</span>
            <span>No consistent world remained.</span>
          </div>
          <div className="flex items-center gap-2 text-[#00FF80]">
            <span>&gt;</span>
            <span>You forced a contradiction.</span>
          </div>
        </div>
      )}
    </section>
  )
}
