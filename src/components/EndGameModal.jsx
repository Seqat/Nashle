import React from 'react'

export default function EndGameModal({ showModal, isWin, finalWord, onReset, onClose }) {
  if (!showModal) return null

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-[#0A0A0A] border border-[#00FF80]/50 p-6 md:p-8 rounded-xl shadow-[0_0_30px_rgba(0,255,128,0.5)] text-center max-w-sm w-full mx-4 animate-fadeIn">
        <h2 className="text-2xl md:text-3xl font-bold font-display mb-4 text-[#00FF80] drop-shadow-[0_0_10px_#00FF80]">
          {isWin ? "🟢 SYSTEM OVERRIDDEN" : "🔴 AI REMAINS IN CONTROL"}
        </h2>
        <p className="text-[#C0FFC0] mb-6 font-mono text-sm md:text-base leading-relaxed">
          {isWin ? (
            <>
              You outsmarted the adversary!<br />
              {finalWord ? (
                <>The correct word was: <span className="text-[#00FF80] font-bold">{finalWord.toUpperCase()}</span></>
              ) : (
                <>You forced a contradiction. No consistent world remained.</>
              )}
            </>
          ) : (
            <>
              The adversary's chosen word was: <span className="text-[#FF0050] font-bold">{finalWord?.toUpperCase() || 'Unknown'}</span>
            </>
          )}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={onReset}
            className="border border-[#00FF80] px-6 py-3 rounded text-[#00FF80] font-mono font-bold hover:bg-[#00FF80] hover:text-black transition-all duration-200 shadow-[0_0_10px_#00FF80]"
          >
            {isWin ? "PLAY AGAIN" : "TRY AGAIN"}
          </button>
          <button
            onClick={onClose}
            className="border border-[#C0FFC0]/30 px-6 py-3 rounded text-[#C0FFC0]/70 font-mono font-bold hover:bg-[#C0FFC0]/10 hover:text-[#C0FFC0] transition-all duration-200"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  )
}

