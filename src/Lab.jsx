import { useEffect, useRef, useState } from 'react'

const Frag = ({ title, children }) => (
  <section className="glass-lab rise rounded-2xl p-5">
    <h3 className="mb-4 text-[11px] uppercase tracking-[0.2em] text-sand">{title}</h3>
    {children}
  </section>
)

const Toggle = ({ label, on, set }) => (
  <button
    type="button"
    role="switch"
    aria-checked={on}
    onClick={() => set(!on)}
    className="flex w-full items-center justify-between gap-4 rounded-lg py-1 text-left text-sm text-fg/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage"
  >
    <span>{label}</span>
    <span className={`relative h-5 w-9 shrink-0 rounded-full transition ${on ? 'bg-sage/70' : 'bg-fg/15'}`}>
      <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-fg transition-all ${on ? 'left-[18px]' : 'left-0.5'}`} />
    </span>
  </button>
)

const Range = ({ label, value, min, max, step = 1, set, fmt = (v) => v }) => (
  <label className="block text-sm text-fg/90">
    <span className="mb-2 flex justify-between"><span>{label}</span><span className="text-sage">{fmt(value)}</span></span>
    <input className="lab-range w-full" type="range" min={min} max={max} step={step} value={value} onChange={(e) => set(Number(e.target.value))} />
  </label>
)

function RouteMap() {
  return (
    <Frag title="Route">
      <svg viewBox="0 0 240 110" className="w-full" role="img" aria-label="Simple route between three places" fill="none">
        <g stroke="#A5A7BD" strokeOpacity=".15"><path d="M0 28H240M0 62H240M0 92H240M50 0V110M120 0V110M190 0V110" /></g>
        <path d="M30 88 C 70 88, 80 50, 120 52 S 175 30, 205 24" stroke="#8DB9A8" strokeWidth="2" strokeLinecap="round" strokeDasharray="3 6" />
        {[[30, 88], [120, 52], [205, 24]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="5" fill={i === 2 ? '#D9C4A0' : '#8DB9A8'} />)}
      </svg>
      <p className="mt-3 text-xs text-muted">Three stops, roughly 12 minutes between each.</p>
    </Frag>
  )
}

function Itinerary() {
  const [quiet, setQuiet] = useState(false)
  const days = [
    ['Day 1', 'Temples and shrines', 'Early start at lesser-known shrines'],
    ['Day 2', 'Local food tour', 'Market stalls over the main street'],
    ['Day 3', 'Culture and shopping', 'Craft workshops and side streets'],
  ]
  return (
    <Frag title="Your itinerary">
      <ul className="mb-4 space-y-3 text-sm">
        {days.map(([d, a, b]) => (
          <li key={d} className="flex gap-3"><span className="w-12 shrink-0 text-muted">{d}</span><span className="text-fg/90">{quiet ? b : a}</span></li>
        ))}
      </ul>
      <Toggle label="Prefer quieter spots" on={quiet} set={setQuiet} />
    </Frag>
  )
}

function Budget() {
  const [budget, setBudget] = useState(1200)
  const [battery, setBattery] = useState(false)
  const opts = [
    { n: 'Option A', p: 899, w: 1.3, b: 10 },
    { n: 'Option B', p: 1299, w: 1.5, b: 16 },
    { n: 'Option C', p: 1799, w: 1.2, b: 20 },
  ]
  const fit = opts.filter((o) => o.p <= budget).sort((a, b) => (battery ? b.b - a.b : a.p - b.p))
  return (
    <>
      <Frag title="Your limits">
        <div className="space-y-5">
          <Range label="Budget" value={budget} min={700} max={2000} step={50} set={setBudget} fmt={(v) => `$${v}`} />
          <Toggle label="Prioritize battery life" on={battery} set={setBattery} />
        </div>
      </Frag>
      <Frag title="Comparison">
        {fit.length === 0 ? <p className="text-sm text-muted">Nothing fits this budget. Try raising it.</p> : (
          <ul className="space-y-2 text-sm">
            {fit.map((o) => (
              <li key={o.n} className="flex items-center justify-between rounded-lg border border-fg/10 px-3 py-2">
                <span>{o.n}</span><span className="text-muted">{o.w} kg · {o.b} h · <span className="text-fg">${o.p}</span></span>
              </li>
            ))}
          </ul>
        )}
      </Frag>
    </>
  )
}

function Split() {
  const [total, setTotal] = useState(120)
  const [people, setPeople] = useState(4)
  const [tip, setTip] = useState(10)
  const each = ((total * (1 + tip / 100)) / people).toFixed(2)
  return (
    <>
      <Frag title="The bill">
        <div className="space-y-5">
          <Range label="Total" value={total} min={20} max={400} step={5} set={setTotal} fmt={(v) => `$${v}`} />
          <Range label="Tip" value={tip} min={0} max={25} set={setTip} fmt={(v) => `${v}%`} />
          <div className="flex items-center justify-between text-sm">
            <span>People</span>
            <span className="flex items-center gap-3">
              <button aria-label="Fewer people" onClick={() => setPeople(Math.max(1, people - 1))} className="h-7 w-7 rounded-full border border-fg/20 hover:border-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage">-</button>
              <span className="w-4 text-center">{people}</span>
              <button aria-label="More people" onClick={() => setPeople(Math.min(12, people + 1))} className="h-7 w-7 rounded-full border border-fg/20 hover:border-sage focus-visible:outline focus-visible:outline-2 focus-visible:outline-sage">+</button>
            </span>
          </div>
        </div>
      </Frag>
      <Frag title="Each pays">
        <p className="text-4xl font-semibold tracking-tight text-sage" aria-live="polite">${each}</p>
      </Frag>
    </>
  )
}

const SCENARIOS = {
  'Plan a 3-day trip to Kyoto': [RouteMap, Itinerary],
  'Find a laptop under my budget': [Budget],
  'Split a dinner bill': [Split],
}
const intents = Object.keys(SCENARIOS)

export default function Lab() {
  const [intent, setIntent] = useState(() => intents[new URLSearchParams(window.location.search).get('intent')] ?? null)
  const [shown, setShown] = useState(0)
  const timer = useRef()
  const parts = intent ? SCENARIOS[intent] : []

  useEffect(() => {
    clearInterval(timer.current)
    if (!intent) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) { setShown(parts.length); return }
    setShown(0)
    let n = 0
    timer.current = setInterval(() => {
      n += 1
      setShown(n)
      if (n >= parts.length) clearInterval(timer.current)
    }, 650)
    return () => clearInterval(timer.current)
  }, [intent])

  return (
    <div className="min-h-screen bg-ink">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <a href="../" className="text-lg font-semibold tracking-tight">noui<span className="text-sage">.si</span></a>
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted sm:text-xs">Lab · experiment 01</p>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24 md:px-10">
        <div className="pt-10 text-center md:pt-16">
          <h1 className="text-balance text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl">Say what you need. <span className="text-sage">Get the interface for it.</span></h1>
          <p className="mx-auto mt-6 max-w-xl text-balance font-light text-muted md:text-lg">Pick an intent. Watch a screen assemble from a small, fixed set of parts.</p>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-3" role="group" aria-label="Choose an intent">
          {intents.map((t) => (
            <button
              key={t}
              onClick={() => setIntent(t)}
              aria-pressed={intent === t}
              className={`rounded-full border px-4 py-2 text-sm transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage ${intent === t ? 'border-sage bg-sage/15 text-fg' : 'border-fg/15 text-muted hover:border-sage/60 hover:text-fg'}`}
            >{t}</button>
          ))}
        </div>

        <div className="mt-12 min-h-[300px]" aria-live="polite">
          {!intent && <p className="pt-16 text-center text-sm text-muted">Nothing here yet. That is the point.</p>}
          {intent && (
            <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
              {parts.slice(0, shown).map((C, i) => <C key={intent + i} />)}
            </div>
          )}
        </div>

        <p className="mx-auto mt-16 max-w-xl text-balance text-center text-xs leading-relaxed text-muted">
          This is a scripted simulation. No AI model is running and nothing is generated live. It only illustrates the idea: an interface composed from your intent out of a fixed set of components. Early exploration, 2026.
        </p>
      </main>
    </div>
  )
}
