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

// Schematic street map: blocks sit between streets, route follows the street grid.
const PX = 42, PY = 36
const PARK = [2, 1]
const BLOCKS = []
for (let i = 0; i < 8; i++) {
  for (let j = 0; j < 7; j++) {
    if (i === PARK[0] && j === PARK[1]) continue
    BLOCKS.push({ x: i * PX + 3, y: j * PY + 3, k: (i * 7 + j * 13 + i * j) % 4 })
  }
}
const BLOCK_FILL = ['rgb(255 255 255 / .055)', 'rgb(255 255 255 / .035)', 'rgb(217 196 160 / .06)', 'rgb(255 255 255 / .02)']
const DAYS = [
  {
    name: 'Day 1', title: 'Temples and shrines', quiet: 'Early start at lesser-known shrines',
    walk: 35, km: 2.6, route: 'M42 180 V108 H168 V36 H252',
    stops: [{ x: 42, y: 180, label: 'Shrine' }, { x: 168, y: 108, label: 'Temple' }, { x: 252, y: 36, label: 'Garden' }],
  },
  {
    name: 'Day 2', title: 'Local food tour', quiet: 'Market stalls over the main street',
    walk: 25, km: 1.9, route: 'M84 36 H168 V144 H294',
    stops: [{ x: 84, y: 36, label: 'Market' }, { x: 168, y: 144, label: 'Noodle bar' }, { x: 294, y: 144, label: 'Tea house', above: true }],
  },
  {
    name: 'Day 3', title: 'Culture and shopping', quiet: 'Craft workshops and side streets',
    walk: 30, km: 2.2, route: 'M42 36 V72 H126 V180 H252',
    stops: [{ x: 42, y: 36, label: 'Museum' }, { x: 126, y: 72, label: 'Craft street' }, { x: 252, y: 180, label: 'Old town' }],
  },
]
const TOTAL_WALK = DAYS.reduce((n, d) => n + d.walk, 0)

function DayMap({ day, quiet }) {
  const d = DAYS[day]
  return (
    <Frag title={`${d.name} route`}>
      <div className="relative overflow-hidden rounded-xl border border-fg/10 bg-[#0d1124]">
        <svg viewBox="0 0 320 220" className="block w-full" role="img" aria-label={`Schematic map of ${d.name}: ${d.stops.map((st) => st.label).join(', ')}`} fill="none">
          {BLOCKS.map((b, i) => <rect key={i} x={b.x} y={b.y} width="36" height="30" rx="3" fill={BLOCK_FILL[b.k]} />)}
          <path d="M0 108H320M168 0V220" stroke="rgb(255 255 255 / .09)" strokeWidth="9" />
          <rect x={PARK[0] * PX + 3} y={PARK[1] * PY + 3} width="36" height="30" rx="6" fill="rgb(141 185 168 / .16)" />
          <circle cx={PARK[0] * PX + 21} cy={PARK[1] * PY + 18} r="3" fill="rgb(141 185 168 / .35)" />
          <path d="M205 0 C192 70, 236 130, 214 220" stroke="rgb(110 160 190 / .28)" strokeWidth="16" strokeLinecap="round" />
          <path d="M205 0 C192 70, 236 130, 214 220" stroke="rgb(110 160 190 / .18)" strokeWidth="1" strokeDasharray="2 6" />
          <text x="209" y="48" fontSize="8" fill="#A5A7BD" fillOpacity=".55" letterSpacing="1.5" transform="rotate(84 209 48)">RIVER</text>
          <g key={day}>
            <path d={d.route} stroke="#090B18" strokeWidth="7" strokeLinejoin="round" strokeLinecap="round" opacity=".6" />
            <path d={d.route} stroke="#8DB9A8" strokeWidth="6" strokeLinejoin="round" strokeLinecap="round" opacity=".25" className="route-draw" style={{ filter: 'blur(3px)' }} />
            <path d={d.route} stroke="#8DB9A8" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" className="route-draw" />
            {d.stops.map((st, i) => {
              const left = st.x > 200
              const above = st.above || st.y > 190 || st.y < 50
              return (
                <g key={st.label}>
                  <circle cx={st.x} cy={st.y} r="9" fill={i === 2 ? '#D9C4A0' : '#8DB9A8'} fillOpacity=".2" />
                  <circle cx={st.x} cy={st.y} r="6" fill={i === 2 ? '#D9C4A0' : '#8DB9A8'} />
                  <text x={st.x} y={st.y + 3} fontSize="8.5" fontWeight="700" textAnchor="middle" fill="#090B18">{i + 1}</text>
                  <text x={st.x + (left ? -12 : 12)} y={st.y + (above ? -10 : 17)} fontSize="10" fontWeight="500" fill="#F5F5FA" fillOpacity=".92" textAnchor={left ? 'end' : 'start'}>{st.label}</text>
                </g>
              )
            })}
          </g>
        </svg>
        <span className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border border-fg/10 bg-ink/80 text-[10px] text-muted" aria-hidden="true">N</span>
      </div>
      <p className="mt-3 text-sm text-fg/90">
        {d.walk} min on foot · {d.km} km{quiet ? ' · quieter picks' : ''}
      </p>
      <p className="mt-1 text-xs text-muted">Illustrative map, not real geography.</p>
    </Frag>
  )
}

function KyotoTrip() {
  const [day, setDay] = useState(0)
  const [quiet, setQuiet] = useState(false)
  return (
    <>
      <Frag title="Your itinerary">
        <ul className="mb-4 space-y-2 text-sm">
          {DAYS.map((d, i) => (
            <li key={d.name}>
              <button
                type="button"
                aria-pressed={day === i}
                onClick={() => setDay(i)}
                className={`flex w-full gap-3 rounded-lg border px-3 py-2.5 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sage ${day === i ? 'border-sage/60 bg-sage/10 text-fg' : 'border-transparent text-fg/80 hover:border-fg/15'}`}
              >
                <span className="w-12 shrink-0 text-muted">{d.name}</span>
                <span>{quiet ? d.quiet : d.title}</span>
              </button>
            </li>
          ))}
        </ul>
        <Toggle label="Prefer quieter spots" on={quiet} set={setQuiet} />
        <p className="mt-4 border-t border-fg/10 pt-3 text-xs text-muted">3 days · about {TOTAL_WALK} min of walking in total</p>
      </Frag>
      <DayMap day={day} quiet={quiet} />
    </>
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
  'Plan a 3-day trip to Kyoto': [KyotoTrip],
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
