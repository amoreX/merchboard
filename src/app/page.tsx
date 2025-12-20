"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import AuthModal from "@/components/auth/AuthModal";
import { useAuthStore } from "@/store/authStore";

// Creator and Brand data for the scrolling grid
const row1Data = [
  { type: "brand", name: "SNITCH", image: "https://cdn.prod.website-files.com/6665566fd32a68cdf8236075/66da8e95dc2a17f17bd1681b_72.webp", bgColor: "#E8DCC8" },
  { type: "creator", image: "https://cdn.prod.website-files.com/6665566fd32a68cdf8236075/66c074d35e410be6e4f0217f_66c06df92ac72d39a9f006be_76.webp", bgColor: "#F4D03F" },
  { type: "brand", name: "INNOVIST", image: "", bgColor: "#F5F5F0" },
  { type: "brand", name: "shopsy", bgColor: "#8B3A8B" },
  { type: "creator", image: "https://cdn.prod.website-files.com/6665566fd32a68cdf8236075/66e289c245ac7a1920e09990_Group%201116600262%20(1).webp", bgColor: "#F4D03F" },
  { type: "brand", name: "DR. SHETH'S", bgColor: "#F5F5F0" },
  { type: "brand", name: "NYKAA", bgColor: "#FF1493" },
  { type: "brand", name: "TOKYO TALKIES", bgColor: "#F5F5F0" },
  { type: "brand", name: "SAV", bgColor: "#FFA500" },
];

const row2Data = [
  { type: "brand", name: "", bgColor: "#FFE4B5" },
  { type: "creator", image: "https://cdn.prod.website-files.com/6665566fd32a68cdf8236075/66c074d06c3372cd9b7920d7_66c0707789cf6ef1ce864472_65.webp", bgColor: "#D2691E" },
  { type: "brand", name: "littlebox", bgColor: "#1a1a1a" },
  { type: "creator", image: "https://cdn.prod.website-files.com/6665566fd32a68cdf8236075/66da92cd379690cb61d08e76_freepik_br_c9fe4e9f-cf2b-49cf-bf73-d2d0e1173b31.webp", bgColor: "#F4D03F" },
  { type: "brand", name: "flipkart", bgColor: "#FFD700" },
  { type: "brand", name: "NEWME", bgColor: "#90EE90" },
  { type: "brand", name: "foxtale", bgColor: "#FF6347" },
  { type: "creator", image: "https://cdn.prod.website-files.com/6665566fd32a68cdf8236075/66c074d1040993453db6dbc7_66c06fde9fb59105a975d996_69.webp", bgColor: "#D2691E" },
  { type: "brand", name: "Sanfe", bgColor: "#E8DCC8" },
];

const row3Data = [
  { type: "creator", image: "", bgColor: "#FFB6C1" },
  { type: "creator", image: "", bgColor: "#F4D03F" },
  { type: "creator", image: "", bgColor: "#D2691E" },
  { type: "creator", image: "", bgColor: "#FFA07A" },
  { type: "brand", name: "Berrylush", bgColor: "#F5F5F0" },
  { type: "brand", name: "meesho", bgColor: "#8B008B" },
  { type: "creator", image: "", bgColor: "#FFA500" },
  { type: "brand", name: "myntra", bgColor: "#FF1493" },
];

const discoverSlides = [
  {
    subtitle: "Simplified link sharing and boost engagement with",
    title: "MERCHNEST\nENGAGE",
    creatorHandle: "@thepearshapedstylist",
    creatorTitle: "Fashion & Styling Creator",
    creatorFollowers: "591K",
    creatorImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop",
    bgGradient: "from-orange-500 to-pink-500"
  },
  {
    subtitle: "Build your brand and grow your audience with",
    title: "MERCHNEST\nCREATE",
    creatorHandle: "@fashionwithleah",
    creatorTitle: "Lifestyle Influencer",
    creatorFollowers: "423K",
    creatorImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop",
    bgGradient: "from-purple-500 to-blue-500"
  },
  {
    subtitle: "Track earnings and optimize performance with",
    title: "MERCHNEST\nANALYTICS",
    creatorHandle: "@stylebysamantha",
    creatorTitle: "Beauty & Fashion Creator",
    creatorFollowers: "782K",
    creatorImage: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop",
    bgGradient: "from-teal-500 to-green-500"
  },
];

const faqs = [
  {
    question: "How does the MerchNest Creator payout process work?",
    answer: "MerchNest processes payouts on a monthly basis. Once you reach the minimum threshold, your earnings are automatically transferred to your registered bank account. You can track all your earnings in real-time through your dashboard."
  },
  {
    question: "How does MerchNest help Creators grow?",
    answer: "MerchNest provides creators with access to 250+ brands, analytics tools to track performance, and personalized recommendations to maximize engagement. Our platform helps you connect with your audience and monetize every piece of content you create."
  },
  {
    question: "Will Brands control my content?",
    answer: "No, you maintain complete creative control. Brands cannot dictate what you post or how you create content. You're free to choose which products to promote and how to showcase them to your audience authentically."
  },
  {
    question: "Do MerchNest Creators receive exclusive Brand information?",
    answer: "Yes! MerchNest creators get early access to new product launches, exclusive discount codes, special promotional campaigns, and direct communication channels with brand partners for collaboration opportunities."
  },
  {
    question: "Can MerchNest's brand commissions surpass my current collab earnings?",
    answer: "Many of our creators report earning 2-3x more through MerchNest compared to traditional collaborations. With our commission structure and volume of partnerships available, you have the potential to significantly increase your income."
  }
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

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const tutorialRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, isAuthenticated, isSelectingRole } = useAuthStore();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated && user?.role) {
      router.push('/dashboard');
    }
  }, [isAuthenticated, user, router]);

  // Handle role selection redirect
  useEffect(() => {
    if (isSelectingRole) {
      router.push('/dashboard');
    }
  }, [isSelectingRole, router]);

  // Handle navbar background on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % discoverSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + discoverSlides.length) % discoverSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  // Framer Motion scroll tracking for tutorial section
  const { scrollYProgress } = useScroll({
    target: tutorialRef,
    offset: ["start start", "end start"]
  });

  // Transform scroll progress for different step animations
  const step0Opacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
  const step0Scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  
  const step1Opacity = useTransform(scrollYProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  const step1Scale = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.4], [0.95, 1, 1, 0.95]);
  
  const step2Opacity = useTransform(scrollYProgress, [0.35, 0.4, 0.55, 0.6], [0, 1, 1, 0]);
  const step2Scale = useTransform(scrollYProgress, [0.4, 0.45, 0.55, 0.6], [0.95, 1, 1, 0.95]);
  
  const step3Opacity = useTransform(scrollYProgress, [0.55, 0.6, 0.75, 0.8], [0, 1, 1, 0]);
  const step3Scale = useTransform(scrollYProgress, [0.6, 0.65, 0.75, 0.8], [0.95, 1, 1, 0.95]);
  
  const step4Opacity = useTransform(scrollYProgress, [0.75, 0.8, 1], [0, 1, 1]);
  const step4Scale = useTransform(scrollYProgress, [0.8, 0.85], [0.95, 1]);

  return (
    <div className="min-h-screen">
      {/* Auth Modal */}
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg" : "bg-transparent"
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-accent flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-3">
                <span className="text-background font-bold text-base sm:text-lg">M</span>
              </div>
              <span className="font-bold text-lg sm:text-xl tracking-tight">Merch Nest</span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-foreground/70 hover:text-accent transition-colors underline-animation">Features</a>
              <a href="#how-it-works" className="text-foreground/70 hover:text-accent transition-colors underline-animation">How It Works</a>
              <a href="#testimonials" className="text-foreground/70 hover:text-accent transition-colors underline-animation">Testimonials</a>
              <button
                onClick={() => setAuthModalOpen(true)}
                className="px-6 py-2.5 bg-accent text-background rounded-full font-medium hover:bg-accent-hover transition-all hover:scale-105 hover:shadow-lg hover:shadow-accent/25"
              >
                Login / Sign Up
              </button>
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
            <div className="space-y-3 bg-card/95 backdrop-blur-lg rounded-xl p-4 border border-border mt-2">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="block text-foreground/70 hover:text-foreground py-2 px-3 rounded-lg hover:bg-border/30 transition-colors">Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="block text-foreground/70 hover:text-foreground py-2 px-3 rounded-lg hover:bg-border/30 transition-colors">How It Works</a>
              <a href="#testimonials" onClick={() => setMobileMenuOpen(false)} className="block text-foreground/70 hover:text-foreground py-2 px-3 rounded-lg hover:bg-border/30 transition-colors">Testimonials</a>
              <button 
                onClick={() => { setMobileMenuOpen(false); setAuthModalOpen(true); }} 
                className="block w-full text-center px-6 py-3 bg-accent text-background rounded-full font-medium mt-2"
              >
                Login / Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* SECTION 1: Hero Video Section */}
      <div className="hero_wrapper">
        <header className="section_header34">
          <div className="header34_background-video-wrapper">
            <div id="hero-video-view" className="video-overlay-layer"></div>
            <div 
              data-poster-url="https://cdn.prod.website-files.com/666285153da630124c201ec0%2F66cfcfc01d8bac1df212bee5_Hero%20Video%2015%20MB%20%281%29-poster-00001.jpg" 
              data-video-urls="https://cdn.prod.website-files.com/666285153da630124c201ec0%2F66cfcfc01d8bac1df212bee5_Hero%20Video%2015%20MB%20%281%29-transcode.mp4,https://cdn.prod.website-files.com/666285153da630124c201ec0%2F66cfcfc01d8bac1df212bee5_Hero%20Video%2015%20MB%20%281%29-transcode.webm" 
              data-autoplay="true" 
              data-loop="true" 
              data-wf-ignore="true" 
              data-beta-bgvideo-upgrade="false" 
              className="header34_background-video hide w-background-video w-background-video-atom"
            >
              <video 
                id="44e28eff-34b7-dd3d-6190-b535d9dd4ced-video" 
                autoPlay 
                loop 
                style={{backgroundImage: 'url("https://cdn.prod.website-files.com/666285153da630124c201ec0%2F66cfcfc01d8bac1df212bee5_Hero%20Video%2015%20MB%20%281%29-poster-00001.jpg")'}} 
                muted 
                playsInline 
                data-wf-ignore="true" 
                data-object-fit="cover"
              >
                <source src="https://cdn.prod.website-files.com/666285153da630124c201ec0%2F66cfcfc01d8bac1df212bee5_Hero%20Video%2015%20MB%20%281%29-transcode.mp4" data-wf-ignore="true" />
                <source src="https://cdn.prod.website-files.com/666285153da630124c201ec0%2F66cfcfc01d8bac1df212bee5_Hero%20Video%2015%20MB%20%281%29-transcode.webm" data-wf-ignore="true" />
              </video>
            </div>
            <video playsInline loop muted autoPlay width="100%" className="header_background-image">
              <source src="https://cdn.prod.website-files.com/666285153da630124c201ec0%2F66cfcfc01d8bac1df212bee5_Hero%20Video%2015%20MB%20%281%29-transcode.mp4" type="video/mp4" className="source_mp4" />
              <source src="https://cdn.prod.website-files.com/666285153da630124c201ec0%2F66cfcfc01d8bac1df212bee5_Hero%20Video%2015%20MB%20%281%29-transcode.webm" type="video/webm" />
            </video>
          </div>
        </header>
      </div>

      {/* SECTION 2: Static Hero - Empowering Creators */}
      <section className="hero-static-section">
        <div className="hero-static-container">
          <div className="hero-static-content">
            {/* Left Side - Text Content */}
            <div className="hero-static-text">
              <h1 className="hero-static-heading">
                Empowering<br />
                creators to grow,<br />
                collaborate and earn
              </h1>
              <p className="hero-static-subtext">
                Boost your social media engagement, collaborate with top brands and monetise 100% of your content with MerchNest
              </p>
              <button
                onClick={() => setAuthModalOpen(true)}
                className="mt-6 px-8 py-4 bg-accent text-background rounded-full font-semibold text-lg hover:bg-accent-hover transition-all hover:scale-105"
              >
                Get Started
              </button>
            </div>

            {/* Right Side - Hero Image */}
            <div className="hero-static-image-wrapper">
              <div className="hero-static-image-container">
                <img 
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=1000&fit=crop&auto=format&q=80" 
                  alt="Creators collaborating and growing together"
                  className="hero-static-image"
                />
                {/* Decorative overlay */}
                <div className="hero-image-overlay"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Scrolling Creator/Brand Grid */}
      <section className="creators-brands-grid-section">
        <div className="creators-brands-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ color: '#1a1a1a' }}>
              Loved by Creators, trusted by Brands
            </h2>
            <p className="text-lg" style={{ color: '#3a3a3a' }}>
              Join forces with fellow Creators, partner with leading Brands like never before
            </p>
          </div>

          {/* Row 1 - Scrolls Right */}
          <div className="scrolling-row-wrapper">
            <div className="scrolling-row scroll-right">
              {[...row1Data, ...row1Data, ...row1Data].map((item, i) => (
                <div 
                  key={i} 
                  className="creator-brand-card"
                  style={{ backgroundColor: item.bgColor }}
                >
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="card-image" />
                  ) : (
                    <div className="card-text">{item.name}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Scrolls Left */}
          <div className="scrolling-row-wrapper">
            <div className="scrolling-row scroll-left">
              {[...row2Data, ...row2Data, ...row2Data].map((item, i) => (
                <div 
                  key={i} 
                  className="creator-brand-card"
                  style={{ backgroundColor: item.bgColor }}
                >
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="card-image" />
                  ) : (
                    <div className="card-text">{item.name}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Row 3 - Scrolls Right */}
          <div className="scrolling-row-wrapper">
            <div className="scrolling-row scroll-right">
              {[...row3Data, ...row3Data, ...row3Data].map((item, i) => (
                <div 
                  key={i} 
                  className="creator-brand-card"
                  style={{ backgroundColor: item.bgColor }}
                >
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="card-image" />
                  ) : (
                    <div className="card-text">{item.name}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Discover Endless Possibilities */}
      <section className="discover-section">
        <div className="discover-container">
          <h2 className="discover-heading">
            Discover and explore endless<br />
            possibilities with MerchNest
          </h2>
          
          <div className="discover-slider">
            {/* Slide Card */}
            <motion.div 
              className="discover-slide"
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className={`discover-slide-content bg-gradient-to-br ${discoverSlides[currentSlide].bgGradient}`}>
                {/* Left Content */}
                <div className="discover-slide-left">
                  <p className="discover-slide-subtitle">
                    {discoverSlides[currentSlide].subtitle.split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                  </p>
                  <h3 className="discover-slide-title">
                    {discoverSlides[currentSlide].title.split('\n').map((line, i) => (
                      <span key={i}>{line}<br /></span>
                    ))}
                  </h3>
                  <button className="discover-read-more">READ MORE</button>
                  
                  <div className="discover-icons">
                    <div className="discover-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                    </div>
                    <div className="discover-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                        <line x1="12" y1="18" x2="12.01" y2="18"></line>
                      </svg>
                    </div>
                    <div className="discover-icon">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="22" y1="2" x2="11" y2="13"></line>
                        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Right Content - Creator Image */}
                <div className="discover-slide-right">
                  <div 
                    className="discover-creator-image"
                    style={{ 
                      backgroundImage: `url(${discoverSlides[currentSlide].creatorImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }}
                  >
                  </div>
                  
                  {/* Creator Badge */}
                  <div className="discover-creator-badge">
                    <div className="creator-badge-handle">{discoverSlides[currentSlide].creatorHandle}</div>
                    <div className="creator-badge-title">{discoverSlides[currentSlide].creatorTitle}</div>
                    <div className="creator-badge-followers">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <circle cx="12" cy="12" r="10" />
                      </svg>
                      {discoverSlides[currentSlide].creatorFollowers} Followers
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Slider Navigation */}
            <div className="discover-navigation">
              <button className="discover-nav-btn" onClick={prevSlide}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button className="discover-nav-btn" onClick={nextSlide}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>

            {/* Slider Dots */}
            <div className="discover-dots">
              {discoverSlides.map((_, index) => (
                <button
                  key={index}
                  className={`discover-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Sticky Tutorial Steps */}
      <div ref={tutorialRef} className="tutorial-root">
        <section className="tutorial-sticky-section">
          {/* Step Counter - Only show for steps 1-3 */}
          <motion.div 
            className="tutorial-step-counter"
            style={{ 
              opacity: useTransform(scrollYProgress, [0, 0.2, 0.75, 0.8], [0, 1, 1, 0])
            }}
          >
            <div className="step-counter-wrapper">
              <motion.div 
                className="step-counter-item"
                style={{ opacity: step1Opacity }}
              >
                <span className="step-counter-text">Step 1 of 3</span>
              </motion.div>
              <motion.div 
                className="step-counter-item"
                style={{ opacity: step2Opacity }}
              >
                <span className="step-counter-text">Step 2 of 3</span>
              </motion.div>
              <motion.div 
                className="step-counter-item"
                style={{ opacity: step3Opacity }}
              >
                <span className="step-counter-text">Step 3 of 3</span>
              </motion.div>
            </div>
            
            {/* Progress Bar */}
            <div className="tutorial-progress-bar">
              <motion.div 
                className="tutorial-progress-fill"
                style={{ 
                  width: useTransform(scrollYProgress, [0.2, 0.75], ["0%", "100%"])
                }}
              />
            </div>
          </motion.div>

          <div className="tutorial-content-grid">
            {/* Left Side - Dynamic Step Content */}
            <div className="tutorial-left">
              {/* Step 0: Intro */}
              <motion.div 
                className="tutorial-step-content absolute"
                style={{ opacity: step0Opacity, scale: step0Scale }}
              >
                <h2 className="text-5xl font-bold mb-4">
                  Join MerchNest<br />
                  and start<br />
                  earning
                </h2>
                <p className="text-xl opacity-80">In just 03 easy steps</p>
              </motion.div>

              {/* Step 1: Sign up */}
              <motion.div 
                className="tutorial-step-content absolute"
                style={{ opacity: step1Opacity, scale: step1Scale }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                    01
                  </div>
                </div>
                <h3 className="text-4xl font-bold mb-4">Sign up on MerchNest</h3>
                <p className="text-xl opacity-90">
                  Complete the OTP process and create your MerchNest account
                </p>
              </motion.div>

              {/* Step 2: Link social */}
              <motion.div 
                className="tutorial-step-content absolute"
                style={{ opacity: step2Opacity, scale: step2Scale }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                    02
                  </div>
                </div>
                <h3 className="text-4xl font-bold mb-4">Link your social media</h3>
                <p className="text-xl opacity-90">
                  Connect your Instagram, YouTube, or TikTok account
                </p>
              </motion.div>

              {/* Step 3: Kickstart */}
              <motion.div 
                className="tutorial-step-content absolute"
                style={{ opacity: step3Opacity, scale: step3Scale }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center text-2xl font-bold">
                    03
                  </div>
                </div>
                <h3 className="text-4xl font-bold mb-4">Kickstart your earnings</h3>
                <p className="text-xl opacity-90">
                  Create your first post, share the link with your audience and begin your earning spree
                </p>
              </motion.div>

              {/* Step 4: Congratulations */}
              <motion.div 
                className="tutorial-step-content absolute text-center"
                style={{ opacity: step4Opacity, scale: step4Scale }}
              >
                <div className="text-8xl mb-6">🎉</div>
                <h3 className="text-5xl font-bold mb-4">Congratulations!</h3>
                <p className="text-2xl opacity-90 mb-8">
                  You&apos;re all set to start earning with MerchNest
                </p>
                <button 
                  onClick={() => setAuthModalOpen(true)}
                  className="px-10 py-4 bg-white text-orange-600 rounded-full text-xl font-bold hover:scale-105 transition-transform"
                >
                  Get Started Now
                </button>
              </motion.div>
            </div>

            {/* Right Side - Phone Mockup with animated content */}
            <div className="tutorial-right">
              <div className="tutorial-phone">
                <div className="phone-screen">
                  <div className="phone-notch"></div>
                  <div className="p-8">
                    <div className="text-center relative">
                      {/* Step 0: Welcome */}
                      <motion.div 
                        className="absolute inset-0"
                        style={{ opacity: step0Opacity }}
                      >
                        <div className="w-20 h-20 bg-black/10 rounded-full mx-auto mb-6"></div>
                        <h3 className="text-2xl font-bold mb-2">MerchNest</h3>
                        <p className="opacity-70">Start your earning journey</p>
                      </motion.div>

                      {/* Step 1: OTP */}
                      <motion.div 
                        className="absolute inset-0"
                        style={{ opacity: step1Opacity }}
                      >
                        <div className="w-full bg-white/20 rounded-lg p-6 mb-4">
                          <div className="text-sm mb-2">Enter OTP</div>
                          <div className="flex gap-2 justify-center">
                            {[1,2,3,4].map((i) => (
                              <div key={i} className="w-12 h-12 bg-white/30 rounded-lg"></div>
                            ))}
                          </div>
                        </div>
                        <p className="text-sm">Verify your phone number</p>
                      </motion.div>

                      {/* Step 2: Social */}
                      <motion.div 
                        className="absolute inset-0"
                        style={{ opacity: step2Opacity }}
                      >
                        <div className="space-y-3">
                          <div className="bg-white/20 rounded-lg p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-pink-500/50 rounded-full"></div>
                            <span>Connect Instagram</span>
                          </div>
                          <div className="bg-white/20 rounded-lg p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500/50 rounded-full"></div>
                            <span>Connect YouTube</span>
                          </div>
                          <div className="bg-white/20 rounded-lg p-4 flex items-center gap-3">
                            <div className="w-10 h-10 bg-black/30 rounded-full"></div>
                            <span>Connect TikTok</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Step 3: Share Link */}
                      <motion.div 
                        className="absolute inset-0"
                        style={{ opacity: step3Opacity }}
                      >
                        <div className="bg-white/20 rounded-lg p-6">
                          <div className="w-full h-32 bg-white/30 rounded-lg mb-4"></div>
                          <div className="text-left">
                            <div className="text-sm font-bold mb-2">Share Your First Link</div>
                            <div className="bg-white/30 rounded p-2 text-xs">
                              merchnest.com/yourlink
                            </div>
                          </div>
                        </div>
                      </motion.div>

                      {/* Step 4: Success */}
                      <motion.div 
                        className="absolute inset-0"
                        style={{ opacity: step4Opacity }}
                      >
                        <div className="text-6xl mb-4">✨</div>
                        <div className="bg-white/20 rounded-lg p-6">
                          <div className="text-3xl font-bold mb-2">₹2,543</div>
                          <div className="text-sm opacity-70">Your First Week Earnings</div>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* SECTION 6: FAQs */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-header">
            <h2 className="faq-title">FAQs</h2>
            <p className="faq-subtitle">Got questions? We&apos;ve got answers!</p>
          </div>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <button 
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                >
                  <span>{faq.question}</span>
                  <svg 
                    className={`faq-arrow ${openFaq === index ? 'rotate' : ''}`}
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3"
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                {openFaq === index && (
                  <div className="faq-answer">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 7: Footer */}
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Left Column - Logo and Company Info */}
            <div className="footer-brand">
              <div className="footer-logo">
                <span className="footer-logo-text">merchnest</span>
              </div>
              <p className="footer-copyright">Copyright © 2025, All Right Reserved</p>
              
              <div className="footer-company-info">
                <p className="font-semibold">Creatormon Private Limited</p>
                <p className="text-sm">CIN - U74994HR2022PTC100843</p>
                <p className="text-sm mt-3">
                  4th Floor, Plot No 48, AIHP Executive Centre,<br />
                  Sector 32, Gurugram, Haryana, 122001
                </p>
              </div>
            </div>

            {/* Company Column */}
            <div className="footer-column">
              <h3 className="footer-column-title">Company</h3>
              <ul className="footer-links">
                <li><Link href="/creators">For Creators</Link></li>
                <li><a href="#brands">For Brands</a></li>
                <li><a href="#about">About Us</a></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div className="footer-column">
              <h3 className="footer-column-title">Resources</h3>
              <ul className="footer-links">
                <li><a href="#case-studies">Case Studies</a></li>
                <li><a href="#career">Career</a></li>
              </ul>
            </div>

            {/* Brand Queries Column */}
            <div className="footer-column">
              <h3 className="footer-column-title">For Brand<br />related queries</h3>
              <a href="mailto:info@merchnest.com" className="footer-email">info@merchnest.com</a>
            </div>

            {/* Creator Queries Column */}
            <div className="footer-column">
              <h3 className="footer-column-title">For Creator<br />related queries</h3>
              <a href="mailto:support@merchnest.com" className="footer-email">support@merchnest.com</a>
            </div>
          </div>

          {/* Bottom Row - Social Icons and Legal Links */}
          <div className="footer-bottom">
            <div className="footer-social">
              <a href="#" className="footer-social-icon" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="footer-social-icon" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="#" className="footer-social-icon" aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <a href="#cookie">Cookie Policy</a>
              <a href="#terms">Terms Of Service</a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
