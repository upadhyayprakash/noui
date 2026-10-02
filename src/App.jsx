import Visual from './Visual.jsx'
import Chaos from './Chaos.jsx'

const Wordmark = ({ className = '' }) => (
  <span className={`font-semibold tracking-tight lowercase ${className}`}>
    noui<span className="bg-gradient-to-r from-sage to-sand bg-clip-text text-transparent">.si</span>
  </span>
)

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-ink">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-fg focus:px-3 focus:py-2 focus:text-ink">Skip to content</a>

      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10 md:py-8">
        <Wordmark className="text-lg" />
        <p className="text-[10px] uppercase tracking-[0.22em] text-muted sm:text-xs">An experiment in interfaces</p>
      </header>

      <main id="main">
        <section className="px-6 pt-6 md:pt-10" aria-label="Intro animation">
          <Chaos />
        </section>

        <section className="mx-auto max-w-5xl px-6 pb-8 pt-10 text-center md:pt-16">
          <p className="mb-6 text-balance text-[11px] uppercase tracking-[0.26em] text-sage sm:text-xs">A different way to think about software</p>
          <h1 className="text-balance text-[2.6rem] font-semibold leading-[1.04] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            What if software could shape its <span className="bg-gradient-to-r from-sage to-sand bg-clip-text text-transparent">own interface?</span>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-balance text-base font-light leading-relaxed text-muted md:text-xl">
            A future where interfaces adapt to your intent, your context, and what you need next.
          </p>
        </section>

        <section className="px-6 py-6 md:py-12" aria-label="Illustration">
          <Visual />
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-24 pt-10 text-center md:pb-32 md:pt-16">
          <p className="text-base text-muted md:text-lg">Not another interface to learn.</p>
          <p className="mt-3 text-balance text-2xl font-medium tracking-tight md:text-4xl">An interface that meets you where you are.</p>
          <a href="lab/" className="mt-8 inline-block rounded-full border border-sage/40 px-5 py-2.5 text-sm text-fg/90 transition hover:border-sage hover:bg-sage/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sage">Try a small experiment →</a>
        </section>
      </main>

      <footer className="mx-auto max-w-6xl px-6 pb-10 md:px-10">
        <div className="h-px w-full bg-fg/10" />
        <div className="mt-6 flex flex-col items-center gap-4 text-[11px] uppercase tracking-[0.2em] text-muted sm:flex-row sm:justify-between">
          <span>Early exploration · 2026</span>
          <a href="https://www.linkedin.com/pulse/what-software-could-shape-its-own-interface-prakash-upadhyay-ueumf" target="_blank" rel="noopener noreferrer" className="normal-case tracking-normal text-sm text-fg/80 underline-offset-4 transition hover:text-sand hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sand">Follow the exploration →</a>
          <Wordmark className="text-sm normal-case tracking-tight" />
        </div>
      </footer>
    </div>
  )
}
