import { useEffect, useRef, useState } from 'react'
import { SUBMIT_URL } from './config.js'

const Line = ({ w, strong }) => (
  <span className={`block h-1.5 rounded-full ${strong ? 'bg-fg/40' : 'bg-fg/20'}`} style={{ width: w }} />
)

// Each fragment is a deliberately messy piece of "traditional UI".
// --r: tilt, --jx/--jy: glitch offsets, --d: start delay.
const FRAGS = [
  {
    pos: 'left-[4%] top-[8%] w-[38%]', r: -4, jx: 8, jy: -6, d: 0,
    body: (
      <div className="space-y-2.5">
        <div className="h-10 rounded-md bg-gradient-to-br from-sage/40 to-sand/20" />
        <Line w="80%" strong /><Line w="55%" /><Line w="68%" />
      </div>
    ),
  },
  {
    pos: 'left-[30%] top-[2%] w-[30%]', r: 2, jx: -7, jy: 9, d: 0.05,
    body: (
      <div className="space-y-1.5 text-[10px] text-fg/70">
        <div className="flex justify-between rounded bg-fg/10 px-2 py-1.5"><span>Select option</span><span>v</span></div>
        {['Settings', 'Preferences', 'Advanced', 'More...', 'Even more...', 'Other'].map((t) => (
          <div key={t} className="rounded px-2 py-1 odd:bg-fg/5">{t}</div>
        ))}
      </div>
    ),
  },
  {
    pos: 'left-[52%] top-[22%] w-[38%]', r: 3, jx: 6, jy: 7, d: 0.1,
    body: (
      <div className="space-y-3">
        <div className="flex items-center justify-between"><Line w="45%" strong /><span className="text-[10px] text-muted">x</span></div>
        <Line w="90%" /><Line w="60%" />
        <div className="flex gap-2"><span className="rounded bg-sage/50 px-2.5 py-1 text-[10px]">OK</span><span className="rounded border border-fg/20 px-2.5 py-1 text-[10px] text-muted">Cancel</span><span className="rounded bg-sand/40 px-2.5 py-1 text-[10px]">Later</span></div>
      </div>
    ),
  },
  {
    pos: 'left-[8%] top-[60%] w-[46%]', r: -2, jx: -9, jy: 5, d: 0.15,
    body: (
      <div className="flex gap-2 text-[10px] text-fg/70">
        {['Home', 'Account', 'Billing', 'Help', 'Tools'].map((t, i) => (
          <span key={t} className={`rounded px-2 py-1 ${i === 2 ? 'bg-sage/40' : 'bg-fg/10'}`}>{t}</span>
        ))}
      </div>
    ),
  },
  {
    pos: 'left-[48%] top-[64%] w-[40%]', r: 1.5, jx: 7, jy: -8, d: 0.2,
    body: (
      <div className="space-y-2">
        {[70, 50, 62].map((w, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className={`h-3 w-3 rounded-sm border ${i === 1 ? 'border-sage bg-sage/40' : 'border-fg/30'}`} />
            <Line w={`${w}%`} />
          </div>
        ))}
      </div>
    ),
  },
  {
    pos: 'left-[70%] top-[4%] w-[24%]', r: -6, jx: -6, jy: 6, d: 0.25,
    body: (
      <div className="flex flex-wrap gap-1.5 text-[10px]">
        <span className="rounded bg-fg/15 px-2 py-1">Save</span><span className="rounded bg-sand/40 px-2 py-1">Share</span><span className="rounded bg-fg/10 px-2 py-1">Export</span>
      </div>
    ),
  },
  {
    pos: 'left-[1%] top-[38%] w-[26%]', r: 4, jx: 9, jy: -4, d: 0.3,
    body: (
      <div className="flex items-center gap-2 text-[10px] text-fg/80"><span className="h-2 w-2 rounded-full bg-sand" />3 new notifications</div>
    ),
  },
]

export default function Chaos() {
  const [run, setRun] = useState(0)
  const [ready, setReady] = useState(false)
  const [text, setText] = useState('')
  const inputRef = useRef(null)
  const honeypot = useRef(null)

  // The input only becomes usable once the intro has resolved into it.
  useEffect(() => {
    setReady(false)
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const t = setTimeout(() => setReady(true), reduce ? 0 : 3300)
    return () => clearTimeout(t)
  }, [run])

  const submit = (e) => {
    e.preventDefault()
    const value = text.trim().slice(0, 120)
    if (!value) return inputRef.current?.focus()
    try { sessionStorage.setItem('noui:intent', value) } catch { /* storage blocked: lab falls back to its pills */ }
    if (SUBMIT_URL) {
      // Fire and forget: a failed save must never block the visitor. keepalive lets it finish after navigation.
      const body = new URLSearchParams({ intent: value, hp: honeypot.current?.value ?? '', t: String(Math.round(performance.now())) })
      fetch(SUBMIT_URL, { method: 'POST', mode: 'no-cors', body, keepalive: true }).catch(() => {})
    }
    window.location.assign('lab/')
  }

  return (
    <div className="mx-auto w-full max-w-3xl">
      <div
        key={run}
        className="chaos-stage relative h-[250px] sm:h-[300px] md:h-[340px]"
        role="img"
        aria-label="A cluttered interface that glitches, then collapses into a single prompt line"
      >
        {FRAGS.map((f, i) => (
          <div
            key={i}
            className={`chaos-frag glass-lab absolute rounded-xl p-3 ${f.pos} ${i > 3 ? 'max-sm:hidden' : ''}`}
            style={{ '--r': `${f.r}deg`, '--jx': `${f.jx}px`, '--jy': `${f.jy}px`, '--d': `${f.d}s` }}
          >
            {f.body}
          </div>
        ))}
        <form
          onSubmit={submit}
          className="chaos-final glass-lab absolute left-1/2 top-1/2 flex w-[88%] max-w-md items-center gap-3 rounded-full py-2 pl-5 pr-2 focus-within:border-sage/70"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#8DB9A8" strokeWidth="1.5" aria-hidden="true"><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /></svg>
          <input
            ref={inputRef}
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={!ready}
            maxLength={120}
            autoComplete="off"
            aria-label="Say what you need, then press Enter to try it in the lab"
            placeholder="Just say what you need."
            className="min-w-0 flex-1 bg-transparent py-2 text-sm text-fg outline-none placeholder:text-fg/60 md:text-base"
          />
          <input ref={honeypot} type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />
          <button
            type="submit"
            disabled={!ready}
            aria-label="Try it in the lab"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-sage/70 text-ink transition hover:bg-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage"
          >→</button>
        </form>
      </div>
      <div className="mt-2 text-center">
        <button
          type="button"
          onClick={() => setRun((n) => n + 1)}
          className="text-[11px] uppercase tracking-[0.2em] text-muted transition hover:text-fg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage motion-reduce:hidden"
        >
          Replay
        </button>
      </div>
      <p className="mt-3 text-center text-xs text-muted">{SUBMIT_URL
          ? 'Press Enter to try it in the lab. We save what you type to learn what people ask for, so please leave out personal details.'
          : 'Press Enter to try it in the lab. Your text stays in your browser.'}</p>
    </div>
  )
}
