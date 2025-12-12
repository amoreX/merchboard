import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen grid-bg flex flex-col">
      {/* Header */}
      <header className="w-full px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
            <span className="text-background font-bold text-sm">M</span>
          </div>
          <span className="font-semibold text-lg tracking-tight">merchboard</span>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-foreground/60 hover:text-foreground transition-colors"
        >
          Dashboard →
        </Link>
      </header>

      {/* Hero */}
      <main className="flex-1 flex items-center justify-center px-8">
        <div className="max-w-2xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 mb-8">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-sm text-foreground/70">Now in beta</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
            Track your merch.
            <br />
            <span className="text-accent">Grow your brand.</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg text-foreground/60 mb-10 max-w-md mx-auto leading-relaxed">
            The all-in-one dashboard for creators to track sales, inventory, and
            fan engagement across all platforms.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/dashboard"
              className="btn-glow px-8 py-4 bg-accent hover:bg-accent-hover text-background font-semibold rounded-xl transition-all duration-200 transform hover:scale-105"
            >
              Sign In
            </Link>
            <a
              href="#features"
              className="px-8 py-4 border border-border hover:border-foreground/30 text-foreground/80 hover:text-foreground rounded-xl transition-colors"
            >
              Learn More
            </a>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-8 pt-10 border-t border-border">
            <div>
              <div className="text-3xl font-bold text-accent">10k+</div>
              <div className="text-sm text-foreground/50 mt-1">Creators</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">$2M+</div>
              <div className="text-sm text-foreground/50 mt-1">Tracked</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-accent">99.9%</div>
              <div className="text-sm text-foreground/50 mt-1">Uptime</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-8 py-6 text-center text-sm text-foreground/40">
        © 2024 Merchboard. All rights reserved.
      </footer>
    </div>
  );
}
