// Abstract stream of self-assembling interface fragments. Pure HTML/CSS/SVG.
const Bar = ({ w, className = '' }) => (
  <span className={`block h-1.5 rounded-full bg-fg/20 ${className}`} style={{ width: w }} />
)

export default function Visual() {
  return (
    <div
      className="relative mx-auto h-[420px] w-full max-w-5xl sm:h-[480px] md:h-[560px]"
      role="img"
      aria-label="Abstract illustration of interface fragments assembling along a flowing path"
    >
      {/* ambient illumination */}
      <div className="glow pointer-events-none absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sage/20 blur-[110px]" />
      <div className="glow pointer-events-none absolute right-[10%] top-[55%] h-[35%] w-[35%] rounded-full bg-sand/10 blur-[100px]" style={{ animationDelay: '-3s' }} />

      {/* connecting paths */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1000 560" preserveAspectRatio="none" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="g" x1="0" x2="1">
            <stop offset="0" stopColor="#8DB9A8" />
            <stop offset="1" stopColor="#D9C4A0" />
          </linearGradient>
        </defs>
        <path d="M120 440 C 300 560, 420 300, 520 290 S 760 330, 880 120" stroke="url(#g)" strokeOpacity=".55" strokeWidth="1.2" vectorEffect="non-scaling-stroke" className="path-flow" />
        <path d="M60 300 C 260 220, 380 420, 560 380 S 800 200, 940 300" stroke="#8DB9A8" strokeOpacity=".35" strokeWidth="1" vectorEffect="non-scaling-stroke" className="path-flow" style={{ animationDuration: '20s' }} />
        <path d="M200 90 C 330 150, 360 240, 520 290" stroke="#D9C4A0" strokeOpacity=".3" strokeWidth="1" vectorEffect="non-scaling-stroke" className="path-flow" style={{ animationDuration: '18s' }} />
      </svg>

      {/* intent / prompt fragment */}
      <div className="frag glass absolute left-[4%] top-[4%] flex w-[62%] items-center gap-3 rounded-2xl p-3.5 sm:w-[44%] md:left-[12%] md:top-[6%] md:p-4" style={{ '--r': '-3deg', '--d': '0.1s' }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#8DB9A8" strokeWidth="1.5" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /></svg>
        <div className="flex flex-1 flex-col gap-2"><Bar w="90%" /><Bar w="55%" /></div>
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sage/70 text-xs text-fg" aria-hidden="true">→</span>
      </div>

      {/* map fragment (hidden on small screens to simplify) */}
      <div className="frag glass absolute left-[2%] top-[34%] hidden h-[26%] w-[30%] overflow-hidden rounded-2xl sm:block md:left-[8%]" style={{ '--r': '2deg', '--d': '0.35s' }}>
        <svg viewBox="0 0 200 120" className="h-full w-full" fill="none" aria-hidden="true">
          <g stroke="#A5A7BD" strokeOpacity=".15"><path d="M0 30H200M0 70H200M0 100H200M40 0V120M100 0V120M160 0V120" /><path d="M0 110L80 50L200 90" /></g>
          <path d="M30 95 C 60 95, 70 55, 110 55 S 150 40, 160 30" stroke="#D9C4A0" strokeWidth="2" strokeLinecap="round" />
          <circle cx="30" cy="95" r="4" fill="#8DB9A8" />
          <circle cx="160" cy="30" r="5" fill="#D9C4A0" /><circle cx="160" cy="30" r="10" stroke="#D9C4A0" strokeOpacity=".4" />
        </svg>
      </div>

      {/* contextual card */}
      <div className="frag glass absolute right-[3%] top-[22%] w-[58%] rounded-2xl p-4 sm:w-[40%] md:right-[6%] md:top-[18%] md:p-5" style={{ '--r': '3deg', '--d': '0.55s' }}>
        <div className="mb-4 h-16 rounded-lg bg-gradient-to-br from-sage/50 via-sage/15 to-sand/30 md:h-24" />
        <Bar w="45%" className="mb-4 !bg-fg/35" />
        {[70, 55, 62].map((w, i) => (
          <div key={i} className="mb-2.5 flex items-center gap-3 last:mb-0">
            <span className={`h-1.5 w-1.5 rounded-full ${i === 1 ? 'bg-sand' : 'bg-sage'}`} />
            <Bar w={`${w}%`} />
          </div>
        ))}
      </div>

      {/* interactive-looking control */}
      <div className="frag glass absolute bottom-[16%] left-[6%] flex w-[52%] items-center gap-3 rounded-2xl p-4 sm:left-[28%] sm:w-[34%] md:bottom-[12%]" style={{ '--r': '-2deg', '--d': '0.8s' }}>
        <div className="relative h-1.5 flex-1 rounded-full bg-fg/15">
          <span className="absolute inset-y-0 left-0 w-3/5 rounded-full bg-gradient-to-r from-sage to-sand" />
          <span className="absolute left-3/5 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border border-fg/40 bg-ink shadow-[0_0_14px_#8DB9A8]" style={{ left: '60%' }} />
        </div>
        <span className="relative h-5 w-9 rounded-full bg-sage/60"><span className="absolute right-0.5 top-0.5 h-4 w-4 rounded-full bg-fg" /></span>
      </div>

      {/* small chip fragment */}
      <div className="frag glass absolute bottom-[4%] right-[4%] flex w-[44%] items-center gap-2 rounded-xl px-3.5 py-3 sm:bottom-[8%] sm:w-[26%] md:right-[10%]" style={{ '--r': '4deg', '--d': '1.05s' }}>
        <span className="h-2 w-2 rounded-full bg-sand" aria-hidden="true" />
        <Bar w="70%" />
        <span className="caret ml-auto h-3 w-px bg-fg/70" aria-hidden="true" />
      </div>
    </div>
  )
}
