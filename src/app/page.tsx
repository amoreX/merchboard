"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

// Creator data for the marquee
const creators = [
  { name: "Malvika Sitlani", handle: "@malvikasitlani", followers: "707K", platform: "Instagram" },
  { name: "Aditi Shreshtha", handle: "@thatquirkymissaditi", followers: "1M", platform: "YouTube" },
  { name: "Simran Balarjain", handle: "@simranbalarjain", followers: "1M", platform: "Instagram" },
  { name: "Kritika Khurana", handle: "@thatbohogirll", followers: "2M", platform: "Instagram" },
  { name: "Anushka Hazra", handle: "@anushkahazraa", followers: "569K", platform: "Instagram" },
  { name: "Zuola", handle: "@zuola", followers: "201K", platform: "Instagram" },
  { name: "Kinnari Jain", handle: "@thepearshapedstylist", followers: "591K", platform: "Instagram" },
  { name: "Suman Kothari", handle: "@lifestylediaryy", followers: "473K", platform: "Instagram" },
];

const brands = ["Nykaa", "Myntra", "AJIO", "Flipkart", "H&M", "Urbanic", "Meesho", "Snitch", "Libas", "Foxtale"];

const features = [
  {
    title: "Monetize 100% of your content",
    description: "Earn unbeatable commissions on every post along with huge rewards and bonuses",
    icon: "💰",
    gradient: "from-yellow-500/20 to-orange-500/20",
  },
  {
    title: "Connect with 250+ Brands",
    description: "Partner with leading Brands to earn commissions and unlock paid collaboration opportunities",
    icon: "🤝",
    gradient: "from-blue-500/20 to-cyan-500/20",
  },
  {
    title: "Boost your social media influence",
    description: "Amplify engagement, build lasting connections, and watch your followers grow",
    icon: "📈",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Instant link sharing",
    description: "Share product links with your audience hassle-free - with just one click",
    icon: "🔗",
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    title: "Automated engagement",
    description: "Auto-reply to comments and share product links directly in your audience's DMs",
    icon: "🤖",
    gradient: "from-red-500/20 to-rose-500/20",
  },
  {
    title: "Zero-cost product sourcing",
    description: "Create content effortlessly with products sourced from leading Brands—without spending a dime",
    icon: "📦",
    gradient: "from-indigo-500/20 to-violet-500/20",
  },
];

const tools = [
  {
    title: "Zero-Cost Product Sourcing",
    description: "Procure trending products from 250+ Brands for free and create content with ease",
    icon: "📦",
  },
  {
    title: "Merchboard Engage",
    description: "Auto-reply to your audience's comments and share product links directly over DMs",
    icon: "💬",
  },
  {
    title: "Personalized Shop",
    description: "Curate all your favorite recommendations at one place, and make shopping seamless for your audience",
    icon: "🛍️",
  },
  {
    title: "Analytics Dashboard",
    description: "Unlock detailed analytics to track your earnings, identify top-performing content, and plan your next viral post",
    icon: "📊",
  },
  {
    title: "Creator Success Team",
    description: "Get strategic support from our team to create & monetize content effectively, with personalized insights",
    icon: "🎯",
  },
  {
    title: "Exclusive Community",
    description: "Learn, collaborate & evolve as a Creator in a vibrant, thriving community of 15000+ Creators",
    icon: "👥",
  },
];

const steps = [
  {
    number: "01",
    title: "Sign up on Merchboard",
    description: "Complete the signup process and create your Merchboard account",
  },
  {
    number: "02",
    title: "Link your social media",
    description: "Connect your Instagram, YouTube, or TikTok account",
  },
  {
    number: "03",
    title: "Kickstart your earnings",
    description: "Create your first post, share the link with your audience and begin your earning spree",
  },
];

const testimonials = [
  {
    name: "Sana Grover",
    handle: "@sanagrover",
    followers: "505K",
    quote: "I've been on YouTube for the last 07 years and always wished that there was a platform like Merchboard. It is truly revolutionary as it makes it incredibly simple to share product links in my videos and Instagram DMs.",
  },
  {
    name: "Vaibhav Keswani",
    handle: "@pehenawah",
    followers: "625K",
    quote: "Merchboard has been a game-changer for me as it has opened up a sustainable source of income that perfectly complements my YouTube and Instagram. The seamless way of sharing product links has saved me countless hours.",
  },
  {
    name: "Naveli Khatri",
    handle: "@navelikhatri",
    followers: "206K",
    quote: "Merchboard has revolutionized my content creation! As a fashion content Creator, I'm now earning 2-3L monthly by sharing product links on Instagram stories and posts. Monetizing 100% of my content has never been easier.",
  },
];

const faqs = [
  {
    question: "How does the Merchboard Creator payout process work?",
    answer: "Creator payout in a month will include all the commissions that get confirmed by the brand in that month and any earnings via rewards and referral program. Payments are processed on the last day of the month and will be in your bank account shortly after.",
  },
  {
    question: "How does Merchboard help Creators grow?",
    answer: "Struggling with creative block or unsure about profitable content? The Merchboard Creator Success Team guides you through content strategies to fuel your growth and maximize earnings.",
  },
  {
    question: "Will Brands control my content?",
    answer: "No deadlines or content demands. You're the boss of your own creative journey.",
  },
  {
    question: "Do Merchboard Creators receive exclusive Brand information?",
    answer: "Yes, get early alerts on upcoming sales, topical days & more to plan your content better and enhance your revenue.",
  },
  {
    question: "Can Merchboard's brand commissions surpass my current collab earnings?",
    answer: "Yes, Merchboard offers a stable, recurring income stream that can complement and even surpass your existing brand collaborations.",
  },
];

const categories = [
  { name: "Fashion", count: 180, icon: "👗" },
  { name: "Beauty & Wellness", count: 120, icon: "💄" },
  { name: "Home Decor", count: 130, icon: "🏠" },
  { name: "Lifestyle", count: 50, icon: "✨" },
  { name: "Travel", count: 100, icon: "✈️" },
];

// Hook for detecting when element is in viewport
function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

// Animated counter component
function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const { ref, isInView } = useInView();

  useEffect(() => {
    if (!isInView) return;
    
    let startTime: number;
    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section refs for animations
  const heroRef = useInView(0.2);
  const featuresRef = useInView(0.1);
  const toolsRef = useInView(0.1);
  const stepsRef = useInView(0.2);
  const testimonialsRef = useInView(0.1);
  const categoriesRef = useInView(0.2);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3">
                <span className="text-background font-bold text-lg">M</span>
              </div>
              <span className="font-bold text-xl tracking-tight">merchboard</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-foreground/70 hover:text-accent transition-colors underline-animation">Features</a>
              <a href="#how-it-works" className="text-foreground/70 hover:text-accent transition-colors underline-animation">How It Works</a>
              <a href="#testimonials" className="text-foreground/70 hover:text-accent transition-colors underline-animation">Testimonials</a>
              <Link
                href="/dashboard"
                className="px-6 py-2.5 bg-accent text-background rounded-full font-medium hover:bg-accent-hover transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
              >
                Dashboard
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-border/30 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-64 pt-4 pb-2" : "max-h-0"}`}>
            <div className="space-y-4">
              <a href="#features" className="block text-foreground/70 hover:text-foreground py-2">Features</a>
              <a href="#how-it-works" className="block text-foreground/70 hover:text-foreground py-2">How It Works</a>
              <a href="#testimonials" className="block text-foreground/70 hover:text-foreground py-2">Testimonials</a>
              <Link href="/dashboard" className="block w-full text-center px-6 py-2.5 bg-accent text-background rounded-full font-medium">
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef.ref} className="pt-32 pb-20 px-6 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-accent/5 via-transparent to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-3xl animate-pulse-scale" />
        <div className="absolute top-20 left-20 w-32 h-32 bg-accent/20 rounded-full blur-2xl animate-float" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/15 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: "1s" }} />
        
        <div className="max-w-7xl mx-auto relative">
          <div className={`max-w-4xl mx-auto text-center ${heroRef.isInView ? "animate-fade-in-up" : "opacity-0"}`}>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full border border-accent/20 mb-8 hover:bg-accent/20 transition-colors cursor-pointer group">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-sm text-accent font-medium">Become a Merchboard Creator today</span>
              <svg className="w-4 h-4 text-accent transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Empowering creators to{" "}
              <span className="text-accent relative">
                grow
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0,5 Q25,0 50,5 T100,5" stroke="currentColor" strokeWidth="2" fill="none" className="animate-pulse" />
                </svg>
              </span>,{" "}
              <span className="text-accent">collaborate</span> and{" "}
              <span className="text-accent">earn</span>
            </h1>

            {/* Subheading */}
            <p className="text-xl text-foreground/60 mb-10 max-w-2xl mx-auto leading-relaxed" style={{ animationDelay: "0.2s" }}>
              Boost your social media engagement, collaborate with top brands and monetise 100% of your content with Merchboard
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: "0.4s" }}>
              <Link
                href="/dashboard"
                className="group btn-glow px-8 py-4 bg-accent hover:bg-accent-hover text-background font-semibold rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
              >
                Join Merchboard
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <a
                href="#how-it-works"
                className="group px-8 py-4 border border-border hover:border-accent/50 text-foreground/80 hover:text-foreground rounded-full text-lg transition-all flex items-center gap-2 hover:bg-accent/5"
              >
                Learn More
                <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            {/* Scroll indicator */}
            <div className="mt-16 animate-bounce-subtle">
              <svg className="w-6 h-6 mx-auto text-foreground/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-16 border-y border-border bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-foreground/40 text-sm uppercase tracking-wider mb-8">
            Trusted by the best creators and brands
          </p>
          
          {/* Infinite scroll marquee */}
          <div className="relative overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card/30 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card/30 to-transparent z-10" />
            <div className="flex gap-8 animate-marquee">
              {[...brands, ...brands, ...brands].map((brand, i) => (
                <div key={i} className="flex-shrink-0 px-8 py-4 bg-background rounded-xl border border-border hover:border-accent/30 transition-colors hover-lift">
                  <span className="text-foreground/60 font-medium whitespace-nowrap">{brand}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Creator Carousel Section */}
      <section className="py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Loved by Creators, trusted by Brands
          </h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            Join forces with fellow Creators, partner with leading Brands like never before
          </p>
        </div>

        {/* Creator Cards Carousel */}
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />
          <div className="flex gap-6 animate-scroll">
            {[...creators, ...creators, ...creators].map((creator, i) => (
              <div key={i} className="flex-shrink-0 w-72 bg-card border border-border rounded-2xl p-6 hover:border-accent/30 transition-all hover-lift group">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-accent/30 to-accent/10 flex items-center justify-center text-accent font-bold text-lg group-hover:scale-110 transition-transform">
                    {creator.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h3 className="font-semibold group-hover:text-accent transition-colors">{creator.name}</h3>
                    <p className="text-sm text-accent">{creator.handle}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-foreground/60">{creator.followers} Followers</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent rounded-full text-xs">{creator.platform}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" ref={featuresRef.ref} className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 ${featuresRef.isInView ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Unlock the influence and maximize your earnings
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Everything you need to monetize your content and grow your creator business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className={`group bg-background border border-border rounded-2xl p-8 hover:border-accent/50 transition-all hover-lift ${
                  featuresRef.isInView ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-4xl mb-6 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-accent transition-colors">
                  {feature.title}
                </h3>
                <p className="text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Section */}
      <section ref={toolsRef.ref} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 ${toolsRef.isInView ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Merchboard essentials: tools and features to help you succeed
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              Powerful tools designed specifically for content creators
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, i) => (
              <div 
                key={i} 
                className={`bg-card border border-border rounded-2xl p-8 hover:border-accent/30 transition-all hover-glow group ${
                  toolsRef.isInView ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-3xl mb-6 group-hover:scale-110 group-hover:bg-accent/20 transition-all">
                  {tool.icon}
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors">{tool.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 border-y border-accent/20 relative overflow-hidden">
        {/* Animated background blobs */}
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-blob" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-blob" style={{ animationDelay: "2s" }} />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Since you&apos;re going to be part of merchboard family
            </h2>
            <p className="text-foreground/60">Let&apos;s focus on What&apos;s in it for you</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { value: 100, suffix: "%", label: "Content Monetization" },
              { value: 250, suffix: "+", label: "Top Brands" },
              { value: 15, suffix: "K+", label: "Active Creators" },
              { value: 24, suffix: "/7", label: "Support Available" },
              { value: 10, suffix: "Cr+", label: "Paid to Creators" },
              { value: 50, suffix: "L+", label: "Products Shared" },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="text-center p-6 bg-background rounded-2xl border border-border hover-lift group"
              >
                <div className="text-3xl md:text-4xl font-bold text-accent mb-2 group-hover:scale-110 transition-transform inline-block">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-foreground/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" ref={stepsRef.ref} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 ${stepsRef.isInView ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Join Merchboard and start earning
            </h2>
            <p className="text-foreground/60">In just 03 easy steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-[16.67%] right-[16.67%] h-0.5 bg-gradient-to-r from-accent/20 via-accent to-accent/20" />
            
            {steps.map((step, i) => (
              <div 
                key={i} 
                className={`relative text-center group ${stepsRef.isInView ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${i * 0.2}s` }}
              >
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center relative z-10 group-hover:bg-accent group-hover:scale-110 transition-all">
                  <span className="text-2xl font-bold text-accent group-hover:text-background transition-colors">{step.number}</span>
                </div>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-accent transition-colors">{step.title}</h3>
                <p className="text-foreground/60 text-sm">{step.description}</p>
              </div>
            ))}
          </div>

          <div className={`text-center mt-12 ${stepsRef.isInView ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.6s" }}>
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-accent hover:bg-accent-hover text-background font-semibold rounded-full text-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
            >
              Get Started Now
              <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" ref={testimonialsRef.ref} className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-16 ${testimonialsRef.isInView ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              The love we get from our Creators
            </h2>
            <p className="text-foreground/60">
              Find out what our creators have to say
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <div 
                key={i} 
                className={`bg-background border border-border rounded-2xl p-8 hover-lift group ${
                  testimonialsRef.isInView ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.15}s` }}
              >
                {/* Quote icon */}
                <svg className="w-10 h-10 text-accent/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                
                <p className="text-foreground/70 leading-relaxed mb-6 italic">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                
                <div className="flex items-center gap-4 pt-4 border-t border-border">
                  <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold group-hover:scale-110 transition-transform">
                    {testimonial.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="font-semibold group-hover:text-accent transition-colors">{testimonial.name}</h4>
                    <p className="text-sm text-accent">{testimonial.handle}</p>
                    <p className="text-xs text-foreground/50">{testimonial.followers} Followers</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={categoriesRef.ref} className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`text-center mb-12 ${categoriesRef.isInView ? "animate-fade-in-up" : "opacity-0"}`}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Are you one of them?
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              We work with Creators big and small, up and comers, trendsetters and market leaders
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {categories.map((category, i) => (
              <div 
                key={i} 
                className={`px-8 py-6 bg-card border border-border rounded-2xl text-center hover:border-accent/50 transition-all hover-lift group min-w-[180px] ${
                  categoriesRef.isInView ? "animate-scale-in" : "opacity-0"
                }`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform">{category.icon}</div>
                <h3 className="font-semibold mb-2 group-hover:text-accent transition-colors">{category.name}</h3>
                <p className="text-3xl font-bold text-accent">{category.count}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-accent/5 via-accent/10 to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--accent)_0%,_transparent_70%)] opacity-10" />
        
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Your launchpad to success!!
          </h2>
          <p className="text-foreground/60 mb-10 max-w-2xl mx-auto text-lg">
            Help your followers shop smarter with great product recommendations and earn when they shop from your content.
          </p>
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-accent hover:bg-accent-hover text-background font-bold rounded-full text-xl transition-all transform hover:scale-105 animate-pulse-glow"
          >
            Start Your Journey
            <svg className="w-6 h-6 transition-transform group-hover:translate-x-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">FAQs</h2>
            <p className="text-foreground/60">Got questions? We&apos;ve got answers!</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`bg-card border border-border rounded-2xl overflow-hidden transition-all ${
                  openFaq === i ? "border-accent/50 shadow-lg shadow-accent/5" : ""
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-border/20 transition-colors"
                >
                  <span className="font-medium pr-4">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center transition-all ${
                    openFaq === i ? "bg-accent rotate-180" : ""
                  }`}>
                    <svg
                      className={`w-4 h-4 transition-colors ${openFaq === i ? "text-background" : "text-accent"}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${
                  openFaq === i ? "max-h-48" : "max-h-0"
                }`}>
                  <div className="px-6 pb-6 text-foreground/70">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center gap-2 mb-4 group">
                <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center transition-transform group-hover:rotate-6">
                  <span className="text-background font-bold text-lg">M</span>
                </div>
                <span className="font-bold text-xl tracking-tight">merchboard</span>
              </Link>
              <p className="text-foreground/60 mb-6 max-w-md">
                Empowering creators to grow, collaborate and earn. The all-in-one platform for content monetization.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: "M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" },
                  { icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                  { icon: "M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" },
                ].map((social, i) => (
                  <a 
                    key={i} 
                    href="#" 
                    className="w-10 h-10 rounded-full bg-border flex items-center justify-center hover:bg-accent/20 hover:text-accent hover:scale-110 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-3">
                {["About Us", "Careers", "Case Studies", "Contact"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-foreground/60 hover:text-accent transition-colors underline-animation">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-3">
                {["For Creators", "For Brands", "Privacy Policy", "Terms of Service"].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-foreground/60 hover:text-accent transition-colors underline-animation">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-foreground/40 text-sm">
              © 2024 Merchboard. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-foreground/40">
              <a href="mailto:support@merchboard.com" className="hover:text-accent transition-colors">
                support@merchboard.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
