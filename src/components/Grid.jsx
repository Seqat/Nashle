import React from 'react'

function Row({ row, rowIndex, isFilled, tileCount, tileSize }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: tileCount }).map((_, j) => {
        const char = row.word?.[j]?.toUpperCase?.() || ''
        const color = row.tiles?.[j]?.color || 'tile-gray'
        const hasChar = char !== ''
        return (
          <div 
            key={j} 
            className={`tile ${color} font-mono uppercase tracking-widest text-base md:text-lg`}
            style={{
              width: `${tileSize.w}px`,
              height: `${tileSize.h}px`,
              minWidth: `${tileSize.w}px`,
              maxWidth: `${tileSize.w}px`,
              minHeight: `${tileSize.h}px`,
              maxHeight: `${tileSize.h}px`,
              animationDelay: hasChar && isFilled ? `${j * 0.05}s` : '0s',
              ...(hasChar && isFilled ? { animationName: 'tile-reveal' } : {})
            }}
          >
            {char}
          </div>
        )
      })}
    </div>
  )
}

export default function Grid({ rows, tileCount = 5, tileSize = { w: 44, h: 48 }, maxGridWidth }) {
  // Compute the grid width dynamically if not provided
  const effectiveGridWidth = (tileSize.w + 4) * tileCount // 4 comes from .gap-1 (approx 0.25rem=4px)
  const sectionMaxWidth = maxGridWidth 
    ? maxGridWidth 
    : Math.max(180, effectiveGridWidth) + 'px'

  return (
    <section
      className="grid gap-1 place-items-center w-full mx-auto"
      style={{ maxWidth: sectionMaxWidth }}
    >
      {rows.map((row, i) => (
        <Row
          key={i}
          row={row}
          rowIndex={i}
          isFilled={row.word && row.word.length > 0}
          tileCount={tileCount}
          tileSize={tileSize}
        />
      ))}
    </section>
  )
}
