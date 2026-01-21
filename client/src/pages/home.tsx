import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence, useScroll, useMotionValueEvent, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  Users,
  Building2,
  DollarSign,
  Clock,
  ShieldCheck,
  Briefcase,
  Activity,
  FileText,
  Menu,
  X,
  ChevronRight,
  BarChart3,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

import {
  MultiColorChart,
  MultiColorBuilding,
  MultiColorUsers,
  MultiColorZap,
  MultiColorStethoscope,
  MultiColorActivity,
  MultiColorDollar,
  MultiColorClock,
  MultiColorTrendUp,
  MultiColorX,
  MultiColorHandshake,
  MultiColorKey
} from "@/components/custom-icons";

import logicLogo from "@assets/logic_logo_transparent_1765720135384.png";
import { SlotNumber } from "@/components/slot-number";
import { LogoMarquee } from "@/components/LogoMarquee";

// Takeover components
import { FullPageTakeover } from "@/components/ui/full-page-takeover";
import { ApplicationForm } from "@/components/application-form";
import { TakeoverProvider, useTakeoverContext } from "@/contexts/takeover-context";
import { FormStateProvider } from "@/contexts/form-state-context";

// --- Components ---

// Helper for colorful icons (Modified to accept React Nodes directly)
function ColorfulIcon({ icon: Icon, colorClass, size = 24 }: { icon: any, colorClass?: string, size?: number }) {
  // If Icon is a function component (Lucide), render it. 
  // If it's one of our new MultiColor components, it might be different.
  // Actually, our new MultiColor components take a 'size' prop and return a div.
  
  return (
    <div className={`p-2 rounded-lg bg-white border border-slate-100 shadow-sm ${colorClass || ''}`}>
      <Icon size={size} />
    </div>
  );
}

function Navbar() {
  const { openTakeover } = useTakeoverContext();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Opportunity", href: "#opportunity" },
    { name: "Who It's For", href: "#who-its-for" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Comp & Upside", href: "#comp" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border/50 shadow-sm text-foreground" : "bg-transparent text-slate-50"
      }`}
    >
      <div className="container-padding mx-auto flex h-16 items-center justify-between">
        <a href="#" className="block">
          <img 
            src={logicLogo} 
            alt="LOGIC Health" 
            className={`h-12 w-auto transition-all duration-300 ${scrolled ? '' : 'brightness-0 invert'}`} 
          />
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors ${scrolled ? 'text-muted-foreground hover:text-foreground' : 'text-slate-300 hover:text-white'}`}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          <Button size="sm" className={`font-semibold shadow-md ${scrolled ? '' : 'bg-white text-slate-900 hover:bg-slate-200'}`} onClick={openTakeover}>
            Apply Now
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 ${scrolled ? 'text-foreground' : 'text-slate-50'}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <div className="container-padding py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-foreground py-2"
                >
                  {link.name}
                </a>
              ))}
              <Separator />
              <Button className="w-full" onClick={() => { setIsOpen(false); openTakeover(); }}>Apply Now</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  const { openTakeover } = useTakeoverContext();

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-32 overflow-hidden bg-slate-900 text-slate-50">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-bl from-blue-500/10 to-transparent opacity-50 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-1/3 h-1/2 bg-gradient-to-tr from-indigo-500/10 to-transparent opacity-40 blur-3xl pointer-events-none" />

      <div className="container-padding mx-auto grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-blue-400 text-xs font-semibold uppercase tracking-wide mb-6 border border-slate-700">
            For Experienced Healthcare Sales Reps
          </div>
          <h1 className="text-4xl lg:text-[3.375rem] font-heading font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Sell Care Management<br className="hidden lg:block" />to Clinics.<br className="hidden lg:block" /><span className="text-blue-400">Unlock High-Dollar Commissions.</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
            LOGIC delivers high-impact care-management programs that help clinics strengthen care delivery and practice economics. You lead the sales process—positioning the opportunity and activating clinics. LOGIC handles implementation, staffing, outreach workflows, documentation, QA, and ongoing program support. Make the sales call with confidence—minimal lift, meaningful value, and strong operational support.
          </p>
          <p className="text-sm text-slate-400 mb-6 max-w-xl">
            LOGIC is an outsourced care-management operator. We staff and run the program end-to-end—LOGIC does not sell software.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 bg-white text-slate-900 hover:bg-slate-200 border-none"
              onClick={openTakeover}
            >
              Apply to Sell Care Management
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base font-medium bg-transparent border-slate-600 text-white hover:bg-white/10 hover:text-white" asChild>
              <a href="#comp">View Compensation</a>
            </Button>
          </div>

          <div className="mt-8 flex items-center gap-4 text-sm text-slate-400">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-[10px] font-bold text-slate-300">
                  {i === 3 ? '+' : ''}
                </div>
              ))}
            </div>
            <p>Recruiting a founding group of experienced healthcare sales agents.</p>
          </div>
        </motion.div>

        {/* Right - Application Card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-lg opacity-70" />
          <Card className="relative border-none shadow-2xl bg-white text-slate-900">
            <CardContent className="p-6 lg:p-8">
              <ApplicationForm showHeader={true} />
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

function LogoStrip() {
  return (
    <section className="py-10 border-y border-border/50 bg-slate-50/50 overflow-hidden">
      <div className="container-padding mx-auto text-center mb-8">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          Industry Provider Groups Are Investing in Care Management
        </p>
      </div>

      <LogoMarquee />
    </section>
  );
}

function ValuePillars() {
  const [activeTile, setActiveTile] = useState<number>(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [userInteracting, setUserInteracting] = useState(false);
  const [stageHeight, setStageHeight] = useState<number>(0);
  const [isMobile, setIsMobile] = useState(false);
  const [mobileStageHeight, setMobileStageHeight] = useState<number>(0);
  const [mobileRatios, setMobileRatios] = useState<number[]>([0, 0, 0]);

  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const userInteractTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);
  const mobileCardRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const activeTileRef = useRef<number>(0);
  const mobileRatiosRef = useRef<Record<number, number>>({});
  const rafRef = useRef<number | null>(null);
  const activeScrollGuardRef = useRef<number | null>(null);

  // Set mounted after first render to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    activeTileRef.current = activeTile;
  }, [activeTile]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 1023px)");
    const updateMatch = () => setIsMobile(media.matches);
    updateMatch();
    if (media.addEventListener) {
      media.addEventListener("change", updateMatch);
      return () => media.removeEventListener("change", updateMatch);
    }
    media.addListener(updateMatch);
    return () => media.removeListener(updateMatch);
  }, []);

  useEffect(() => {
    if (!isMobile) return;

    const cards = mobileCardRefs.current.filter(
      (node): node is HTMLDivElement => node !== null
    );
    if (cards.length === 0) return;

    const updateActiveFromRatios = () => {
      rafRef.current = null;
      let bestIndex = activeTileRef.current;
      let bestRatio = mobileRatiosRef.current[bestIndex] ?? 0;
      let bestDistance = Infinity;

      cards.forEach((card, index) => {
        const ratio = mobileRatiosRef.current[index] ?? 0;
        if (ratio <= 0) return;
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const viewportCenter = window.innerHeight / 2;
        const distance = Math.abs(cardCenter - viewportCenter);

        if (ratio > bestRatio + 0.1) {
          bestIndex = index;
          bestRatio = ratio;
          bestDistance = distance;
          return;
        }

        if (Math.abs(ratio - bestRatio) <= 0.1 && distance < bestDistance - 20) {
          bestIndex = index;
          bestDistance = distance;
        }
      });

      if (bestIndex !== activeTileRef.current) {
        setActiveTile(bestIndex);
      }

      setMobileRatios((current) => {
        const next = [0, 0, 0].map((_, idx) => mobileRatiosRef.current[idx] ?? 0);
        if (current.every((value, idx) => Math.abs(value - next[idx]) < 0.01)) {
          return current;
        }
        return next;
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cards.indexOf(entry.target as HTMLDivElement);
          if (index >= 0) {
            mobileRatiosRef.current[index] = entry.intersectionRatio;
          }
        });

        if (rafRef.current === null) {
          rafRef.current = window.requestAnimationFrame(updateActiveFromRatios);
        }
      },
      {
        root: null,
        rootMargin: "-72px 0px 0px 0px",
        threshold: Array.from({ length: 21 }, (_, i) => i / 20),
      }
    );

    cards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    const nodes = mobileCardRefs.current.filter(
      (node): node is HTMLDivElement => node !== null
    );
    if (nodes.length === 0) return;

    const maxHeight = Math.max(...nodes.map((node) => node.offsetHeight));
    if (maxHeight > 0) {
      setMobileStageHeight(maxHeight);
    }
  }, [isMobile, activeTile]);

  const pillars = [
    {
      title: "Ease of Implementation",
      lead: "Lead the sale—we handle the heavy lift.",
      body: "LOGIC supports the sales process from first call to signed agreement, then runs onboarding and go-live with a dedicated implementation team.",
      bullets: [
        "LOGIC-supported discovery, demo, proposal, and contracting",
        "LOGIC-led onboarding and go-live (you're not the project manager)",
        "Minimal disruption to day-to-day clinic workflows"
      ]
    },
    {
      title: "Clinical and Financial Value-Add",
      lead: "Be the consultant your accounts remember.",
      body: "LOGIC operates CMS-recognized care-management programs on behalf of practices and small hospitals—providing the staffing, workflows, and day-to-day execution required to improve care continuity and generate sustainable revenue.",
      bullets: [
        "You get a fully delivered value-based care program, not another add-on",
        "The impact is visible to clinicians and administrators",
        "Creates \"trusted partner\" positioning inside the account"
      ]
    },
    {
      title: "Differentiated Advantage",
      lead: "Sharper story for key accounts, backed by a full operating model.",
      body: "LOGIC is a comprehensive care-management partner—not a narrow offering. We bring a full operating model that's easy to explain, easy for clinics to adopt, and clearly distinct from basic CCM-only offerings.",
      bullets: [
        "Clear differentiation beyond basic CCM-only programs",
        "Executive-ready talking points for administrators and clinicians",
        "A strong reason to re-engage priority accounts in your territory"
      ]
    }
  ];

  // Scroll-driven progression
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"]
  });

  // Update activeTile based on scroll progress (unless user is interacting)
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!mounted || !sectionRef.current || userInteracting || shouldReduceMotion || isMobile) return;

    // Determine which tile should be active based on scroll position
    const nextIdx = latest < 0.4 ? 0 : latest < 0.7 ? 1 : 2;
    setActiveTile((current) => (current === nextIdx ? current : nextIdx));
  });

  useEffect(() => {
    if (!isMobile) return;
    const headerOffset = 72;
    const activeNode = mobileCardRefs.current[activeTile];
    if (!activeNode) return;

    const rect = activeNode.getBoundingClientRect();
    if (rect.top < headerOffset + 8) {
      if (activeScrollGuardRef.current !== activeTile) {
        activeScrollGuardRef.current = activeTile;
        window.scrollTo({
          top: window.scrollY + rect.top - headerOffset - 12,
          behavior: "smooth",
        });
      }
    }
  }, [activeTile, isMobile]);
  // Measure stage heights on mount to prevent layout shift
  useEffect(() => {
    const measureHeights = () => {
      const heights = stageRefs.current
        .filter((ref): ref is HTMLDivElement => ref !== null)
        .map(ref => ref.scrollHeight);

      if (heights.length > 0) {
        const maxHeight = Math.max(...heights);
        setStageHeight(maxHeight);
      }
    };

    // Delay to ensure content is rendered
    const timer = setTimeout(measureHeights, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (activeTile !== index) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -7;
    const rotateY = ((x - centerX) / centerX) * 7;

    setTilt({ rotateX, rotateY });
  };

  const handleTileEnter = (index: number) => {
    setActiveTile(index);
    setUserInteracting(true);

    // Clear existing timeout
    if (userInteractTimeoutRef.current) {
      clearTimeout(userInteractTimeoutRef.current);
    }

    // Resume scroll-driven progression after 2 seconds of inactivity
    userInteractTimeoutRef.current = setTimeout(() => {
      setUserInteracting(false);
    }, 2000);
  };

  const handleTileLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
  };

  return (
    <section ref={sectionRef} className="relative bg-slate-50/50 py-14 sm:py-16 lg:py-28">
        <div className="container-padding mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading text-foreground mb-4">
              Three reasons reps love selling LOGIC
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Designed for busy physician practices and small hospitals. Built for low-lift selling: reps lead the sale and clinic activation, while LOGIC provides deal support and a full operating model—without adding workload to the clinic.
            </p>
          </div>

          {/* Hidden measurement divs for stable height */}
          <div className="fixed opacity-0 pointer-events-none -z-50">
            {pillars.map((pillar, i) => (
              <div key={i} ref={el => { stageRefs.current[i] = el; }} className="w-[600px]">
                <div className="space-y-6 p-10">
                  <div>
                    <h3 className="text-2xl font-bold font-heading leading-tight mb-3">{pillar.title}</h3>
                    <p className="text-lg font-bold leading-relaxed">{pillar.lead}</p>
                  </div>
                  <p className="text-base leading-relaxed">{pillar.body}</p>
                  <ul className="space-y-3 pt-2">
                    {pillar.bullets.map((bullet, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 shrink-0" size={20} />
                        <span className="text-sm leading-relaxed">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop: Master-Detail Layout */}
          <div className="hidden lg:grid lg:grid-cols-[1fr_1.3fr] gap-8 xl:gap-12">
          {/* Left: Tiles (Master List) */}
          <div className="space-y-4">
            {pillars.map((pillar, i) => {
              const isActive = activeTile === i;
              const isInactive = activeTile !== i;

              return (
                <div
                  key={i}
                  onMouseEnter={() => handleTileEnter(i)}
                  onMouseLeave={handleTileLeave}
                  onFocus={() => handleTileEnter(i)}
                  onBlur={handleTileLeave}
                  tabIndex={0}
                  className="outline-none"
                >
                  <div
                    className="tilt-inner"
                    onMouseMove={(e) => handleMouseMove(e, i)}
                    style={{
                      transform: isActive
                        ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) translateZ(10px)`
                        : 'none',
                      transition: isActive ? 'transform 0.1s ease-out' : 'transform 0.2s ease-out',
                      willChange: isActive ? 'transform' : 'auto',
                    }}
                  >
                    <Card
                      className={`cursor-pointer transition-all duration-200 ${
                        isActive
                          ? 'border-primary/40 shadow-xl'
                          : 'hover:border-primary/30 hover:shadow-md'
                      }`}
                      style={{
                        opacity: isInactive ? 0.6 : 1,
                      }}
                    >
                      <CardContent className="p-5 relative overflow-hidden">
                        {isActive && (
                          <div
                            className="absolute inset-0 opacity-15 pointer-events-none"
                            style={{
                              background: `radial-gradient(circle at ${50 + tilt.rotateY * 5}% ${50 - tilt.rotateX * 5}%, rgba(255,255,255,0.9) 0%, transparent 60%)`,
                            }}
                          />
                        )}
                        <h3 className="text-lg font-bold font-heading text-foreground relative z-10">{pillar.title}</h3>
                        <p className={`text-sm font-semibold mt-2 relative z-10 transition-opacity duration-200 ${isInactive ? 'opacity-70' : 'text-foreground'}`}>
                          {pillar.lead}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Stage Panel (Detail View) */}
          <div className="self-start">
            <Card className="border-2 border-primary/20 shadow-2xl bg-gradient-to-br from-white via-white to-slate-50">
              <CardContent
                className="p-8 lg:p-10"
                style={{
                  minHeight: stageHeight > 0 ? `${stageHeight}px` : undefined,
                }}
              >
                {!shouldReduceMotion && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeTile}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="space-y-6"
                    >
                    <div>
                      <h3 className="text-2xl font-bold font-heading text-foreground leading-tight mb-3">
                        {pillars[activeTile].title}
                      </h3>
                      <p className="text-lg font-bold text-primary leading-relaxed">
                        {pillars[activeTile].lead}
                      </p>
                    </div>

                    <p className="text-base text-muted-foreground leading-relaxed">
                      {pillars[activeTile].body}
                    </p>

                    <ul className="space-y-3 pt-2">
                      {pillars[activeTile].bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="text-primary mt-0.5 shrink-0" size={20} />
                          <span className="text-sm text-foreground leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>
                )}

                {shouldReduceMotion && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-2xl font-bold font-heading text-foreground leading-tight mb-3">
                        {pillars[activeTile].title}
                      </h3>
                      <p className="text-lg font-bold text-primary leading-relaxed">
                        {pillars[activeTile].lead}
                      </p>
                    </div>

                    <p className="text-base text-muted-foreground leading-relaxed">
                      {pillars[activeTile].body}
                    </p>

                    <ul className="space-y-3 pt-2">
                      {pillars[activeTile].bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="text-primary mt-0.5 shrink-0" size={20} />
                          <span className="text-sm text-foreground leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Tablet/Mobile: Tiles with tap to expand */}
        <div className="lg:hidden space-y-6">
          {pillars.map((pillar, i) => (
            (() => {
              const ratio = mobileRatios[i] ?? 0;
              const progressiveOpacity = Math.min(Math.max(ratio / 0.25, 0), 1);
              const opacity = activeTile === i ? 1 : progressiveOpacity;
              const translateY = (1 - opacity) * 8;

              return (
            <Card
              key={i}
              className={`cursor-pointer transition-all duration-200 ${
                activeTile === i ? 'border-primary/40 shadow-lg' : 'hover:border-primary/30'
              }`}
              onClick={() => handleTileEnter(i)}
            >
              <CardContent
                ref={(node) => {
                  mobileCardRefs.current[i] = node;
                }}
                className="p-7 transition-opacity transition-transform duration-300 ease-out"
                style={{
                  minHeight: mobileStageHeight > 0 ? `${mobileStageHeight}px` : undefined,
                  opacity,
                  transform: `translateY(${translateY}px)`,
                }}
              >
                <h3 className="text-lg font-bold font-heading text-foreground">{pillar.title}</h3>
                <p className="text-sm font-semibold text-foreground mt-2">{pillar.lead}</p>

                <div className="mt-4 pt-4 border-t border-border space-y-4">
                    <p className="text-base text-muted-foreground leading-relaxed">
                      {pillar.body}
                    </p>
                    <ul className="space-y-3">
                      {pillar.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <CheckCircle2 className="text-primary mt-0.5 shrink-0" size={18} />
                          <span className="text-sm text-foreground leading-relaxed">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
              </CardContent>
            </Card>
              );
            })()
          ))}
        </div>
      </div>
    </section>
  );
}

function RisksMitigated() {
  const risks = [
    {
      value: "item-1",
      number: "01",
      title: "Relationship Risk",
      lead: "Your reputation matters—our support protects it.",
      body: "We operate with a \"LOGIC-owned execution\" mindset: responsive support, proactive issue resolution, and a structured escalation path so small issues don't become account-level problems."
    },
    {
      value: "item-2",
      number: "02",
      title: "Implementation Burden",
      lead: "Clinics are overloaded. We keep the lift light.",
      body: "Our model is built to minimize staff burden and operational disruption. LOGIC runs onboarding and go-live with a dedicated implementation team so busy clinics can adopt without adding work they don't have capacity for."
    },
    {
      value: "item-3",
      number: "03",
      title: "Regulatory and Compliance Stability",
      lead: "Healthcare requires clarity and consistency.",
      body: "We provide a documented compliance posture and standard contracting framework, including HIPAA-aligned processes and applicable agreements (such as BAAs where required), so you can sell professionally and consistently."
    }
  ];

  return (
    <section className="py-20 lg:py-28 bg-slate-900 text-slate-50 relative">
      <div className="container-padding mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column: Title + Subhead */}
          <div className="lg:sticky lg:top-24">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading text-white mb-6">
              We address the three risks reps worry about
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed">
              You shouldn't have to risk your relationships to offer care management. LOGIC is built for predictable delivery—strong support, low clinic lift, and a clear compliance posture—so you're not left carrying operational issues in the account.
            </p>
          </div>

          {/* Right Column: Accordion */}
          <div>
            <Accordion type="single" collapsible defaultValue="item-1" className="w-full space-y-4">
              {risks.map((risk) => (
                <AccordionItem
                  key={risk.value}
                  value={risk.value}
                  className="group border border-slate-700 rounded-lg bg-slate-800/50 px-6 py-2 transition-all duration-300 hover:border-slate-600 hover:bg-slate-800/70 data-[state=open]:border-blue-500/50 data-[state=open]:bg-slate-800/80 data-[state=open]:shadow-lg data-[state=open]:shadow-blue-500/10 relative data-[state=open]:before:content-[''] data-[state=open]:before:absolute data-[state=open]:before:left-0 data-[state=open]:before:top-0 data-[state=open]:before:bottom-0 data-[state=open]:before:w-1 data-[state=open]:before:bg-blue-400 data-[state=open]:before:rounded-l-lg"
                >
                  <AccordionTrigger className="text-left text-lg font-bold text-white hover:no-underline py-4">
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-mono text-slate-500 group-data-[state=open]:text-blue-400 transition-colors flex-shrink-0">
                        {risk.number}
                      </span>
                      <span>{risk.title}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="space-y-4 pt-2 pb-4 pl-10">
                    <p className="font-bold text-blue-300 leading-relaxed text-base">
                      {risk.lead}
                    </p>
                    <p className="text-slate-300 leading-relaxed">
                      {risk.body}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
}

function Testimonial() {
  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container-padding mx-auto max-w-4xl">
        <motion.div 
          whileHover={{ scale: 1.01 }}
          className="relative bg-gradient-to-br from-primary/5 to-transparent p-8 lg:p-12 rounded-3xl border border-primary/10 shadow-sm text-center"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg border-4 border-background">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.00001 15 9.00001 12 11 11C11.6667 10.6667 13.5 10.5 14.5 11C15 11.5 16 13 16 13H18.5C18.5 13 17 8 13 8C10.5 8 8.00001 9 7.00001 12C6.00001 15 6 18 6 21H14.017ZM22.017 21L22.017 18C22.017 16.8954 21.1216 16 20.017 16H17C17 15 17 12 19 11C19.6667 10.6667 21.5 10.5 22.5 11C23 11.5 24 13 24 13H26.5C26.5 13 25 8 21 8C18.5 8 16 9 15 12C14 15 14 18 14 21H22.017Z" /></svg>
          </div>
          
          <blockquote className="text-2xl lg:text-3xl font-medium font-heading leading-tight text-foreground mt-6 mb-8">
            "Care management quickly became a compelling economic and <span className="text-primary font-bold decoration-2 underline decoration-blue-200 underline-offset-4 whitespace-nowrap">clinical win for the clinics</span> I work with. Practices were able to add a new, sustainable revenue stream by closing care gaps and advancing value-based care — all without hiring staff or investing in new infrastructure. LOGIC's operational support made the business case real."
          </blockquote>
          
          <div className="flex items-center justify-center gap-3">
            <ColorfulIcon icon={MultiColorUsers} size={24} />
            <div className="text-left">
              <div className="font-bold text-foreground">Kevin Donahower, Healthcare Vendor</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function BeforeAfter() {
  return (
    <section className="py-20 bg-slate-50 border-y border-border/50" id="opportunity">
      <div className="container-padding mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-4">Why Reps are Adding Care Management</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">Experienced sellers are expanding their impact and deepening their influence.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 relative">

          {/* Divider Badge */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -mt-2 z-10 hidden lg:flex">
             <div className="w-12 h-12 bg-background border-4 border-slate-50 rounded-full flex items-center justify-center shadow-sm">
                <ArrowRight className="text-muted-foreground" size={20} />
             </div>
          </div>

          <div className="space-y-4">
            <div className="text-center mb-2">
              <h3 className="text-2xl font-bold text-slate-700 tracking-tight">Your Core Strengths…</h3>
            </div>

            <Card className="border-border/60 bg-white/50 shadow-none hover:shadow-sm transition-shadow">
              <CardContent className="flex items-start gap-4 p-5 h-full">
                <div className="mt-1">
                  <ColorfulIcon icon={MultiColorX} colorClass="" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Established revenue drivers</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">Generate revenue through products and services you already represent.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-white/50 shadow-none hover:shadow-sm transition-shadow">
              <CardContent className="flex items-start gap-4 p-5 h-full">
                <div className="mt-1">
                  <ColorfulIcon icon={MultiColorKey} colorClass="" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Strong provider relationships</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">Operate with provider trust earned through past success.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/60 bg-white/50 shadow-none hover:shadow-sm transition-shadow">
              <CardContent className="flex items-start gap-4 p-5 h-full">
                <div className="mt-1">
                  <ColorfulIcon icon={MultiColorClock} colorClass="" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Defined stakeholder engagement</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">Work effectively with decision-makers tied to your current offering.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="text-center mb-2">
              <h3 className="text-2xl font-bold text-primary tracking-tight">Expanded With Care Management</h3>
            </div>

            <Card className="border-primary/20 bg-white shadow-sm ring-1 ring-primary/5 hover:ring-primary/20 transition-all">
              <CardContent className="flex items-start gap-4 p-5 h-full">
                <div className="mt-1">
                  <ColorfulIcon icon={MultiColorDollar} colorClass="" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Expanded earning opportunities</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">Add high-value clinic programs with serious per-deal commissions.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-white shadow-sm ring-1 ring-primary/5 hover:ring-primary/20 transition-all">
              <CardContent className="flex items-start gap-4 p-5 h-full">
                <div className="mt-1">
                  <ColorfulIcon icon={MultiColorUsers} colorClass="" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Deepened trusted-advisor positioning</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">Bring a powerful operating solution that elevates your strategic relevance.</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/20 bg-white shadow-sm ring-1 ring-primary/5 hover:ring-primary/20 transition-all">
              <CardContent className="flex items-start gap-4 p-5 h-full">
                <div className="mt-1">
                  <ColorfulIcon icon={MultiColorBuilding} colorClass="" size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Broader stakeholder access</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-1">Engage a broader group of clinical, operational, and administrative leadership.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-12 text-center">
            <p className="text-sm font-bold text-red-500 bg-red-50 inline-block px-4 py-2 rounded-full border border-red-100">
             100% commission. Serious upside for serious sellers.
            </p>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: "High-Value Commissions",
      desc: "Earn substantial commissions from each clinic you close.",
      icon: MultiColorChart,
      color: ""
    },
    {
      title: "Unlimited Deal Volume",
      desc: "Close as many clinics as you want—earnings scale with deals closed.",
      icon: MultiColorBuilding,
      color: ""
    },
    {
      title: "Easy-to-Sell Economics",
      desc: "Sell a program clinics want—one that strengthens financial performance while improving patient outcomes.",
      icon: MultiColorHandshake,
      color: ""
    },
    {
      title: "No Operational Burden",
          desc: "LOGIC runs care management staffing and operations end-to-end. You focus on opening doors.",
      icon: MultiColorZap,
      color: ""
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container-padding mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <Card key={i} className="group hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 lg:p-8 space-y-4">
                <div className="group-hover:scale-110 transition-transform duration-300 inline-block">
                  <ColorfulIcon icon={f.icon} colorClass={f.color} size={28} />
                </div>
                <h3 className="text-xl font-bold font-heading">{f.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {f.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Icon for features
function Handshake(props: any) {
  return <Users {...props} />; // Placeholder
}
function Zap(props: any) {
  return <TrendingUp {...props} />; // Placeholder
}

function EventStream() {
  const events = [
    "Clinic A services agreement executed",
    "Clinic B granted EMR access",
    "Clinic C PPA completed",
    "Milestone 2 achieved — commission vested",
    "Commission payment issued: $15,000",
  ];

  return (
    <section className="py-20 overflow-hidden bg-slate-900 text-slate-50 relative">
      <div className="container-padding mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6">
            Clear Visibility Into Your Deals and Earnings
          </h2>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            Stay informed on the status of your clinic deals, milestone completion, and earned commissions. Track progress from contract execution through program launch with clear, objective visibility.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-green-400 mt-0.5" size={20} />
              <span className="font-medium">Track deals from signing to launch</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-green-400 mt-0.5" size={20} />
              <span className="font-medium">See exactly when commissions are earned</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-green-400 mt-0.5" size={20} />
              <span className="font-medium">Understand payouts with full transparency</span>
            </li>
          </ul>
        </div>

        <div className="relative h-[400px] w-full overflow-hidden rounded-2xl bg-slate-800/50">
          {/* Mask for top/bottom fade */}
          <div 
            className="absolute inset-0 z-10 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, rgba(30,41,59,1) 0%, rgba(30,41,59,0) 15%, rgba(30,41,59,0) 85%, rgba(30,41,59,1) 100%)'
            }} 
          />
          
          <div className="h-full w-full p-6 overflow-hidden">
            <div className="animate-scrolling-up">
              {[...events, ...events].map((evt, i) => ( 
                <div key={i} className="flex items-center gap-4 p-4 mb-3 bg-slate-800">
                   <div className="w-8 h-8 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
                      <Activity size={14} />
                   </div>
                   <span className="text-sm font-medium text-slate-200">{evt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Metrics() {
  const SOURCES = [
    { id: "internal-3", label: "CMS: Whole blood 2024 sections highlighted", url: "https://prehospitaltransfusion.org/wp-content/uploads/2024/10/CMS-whole-blood-2024-14828-sections-highlighted.pdf", date: "2024" },
    { id: "pmc-96", label: "PMC: Chronic disease burden and prevalence (review)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11368639/", date: "2024" },
    { id: "hrs-frederick-83", label: "Health Recovery Solutions: Frederick Health case study (Oct 2018–Apr 2019) – 83% reduction in 30-day readmissions", url: "https://www.healthrecoverysolutions.com/hubfs/Frederick%20Health%20Case%20Study.pdf", date: "2019 data period" },
    { id: "cdc-6in10", label: "CDC (Preventing Chronic Disease): Chronic disease affects 6 in 10 adults", url: "https://www.cdc.gov/pcd/issues/2023/23_0120.htm", date: "2023" },
    { id: "cms-93pct", label: "CMS: Beneficiaries with 2+ chronic conditions account for ~93% of Medicare spending (CY2011)", url: "https://www.cms.gov/newsroom/press-releases/medicare-dashboard-advances-aca-goals-chronic-conditions", date: "2012 (press release)" },
    { id: "internal-4", label: "Internal: 3×–6× more touchpoints model", url: null, date: "Internal" },
    { id: "internal-0", label: "Internal: $0 cost to start (LOGIC operating model)", url: null, date: "Internal" },
    { id: "cms-stars-2026", label: "CMS: 2026 Star Ratings Technical Notes (patient experience/complaints and access measures weight = 2)", url: "https://www.cms.gov/files/document/2026-star-ratings-technical-notes.pdf", date: "09/25/2025 update" },
    { id: "internal-1", label: "Internal: 100% interaction auditing via Ambient AI workflow (LOGIC). What it does: flags missing documentation elements, tracks outreach attempts vs completed touches, supports QA review. What it does not do: diagnose, replace clinical judgment, or operate unsupervised.", url: null, date: "Internal" },
    { id: "internal-2", label: "Internal: >75K CCM patients previously supported by LOGIC leadership team (10+ years)", url: null, date: "Internal" },
  ];
  const sourceIndex = Object.fromEntries(SOURCES.map((source, index) => [source.id, index + 1]));
  const renderSourceRef = (ids: string[], label: string) => {
    const numbers = ids.map((id) => sourceIndex[id]).filter(Boolean).join(",");
    return (
      <a href="#sources" aria-label={`View sources for ${label}`} className="ml-1 text-slate-500 hover:text-slate-700">
        <sup className="text-[10px] font-semibold">[{numbers}]</sup>
      </a>
    );
  };

  return (
    <section className="py-20 bg-slate-50/50 border-b border-border/50">
      <div className="container-padding mx-auto max-w-6xl">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
           
           {/* Row 1 */}
           <div className="bg-yellow-100 rounded-3xl p-8 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1">
                  <SlotNumber value="96" />%
                  {renderSourceRef(["internal-3", "pmc-96"], "Market opportunity")}
                </div>
                <div className="text-slate-700 font-medium">Market opportunity</div>
              </div>
              <div className="text-sm text-slate-600 font-medium">Only ~4% of Medicare eligibles are enrolled in any care management program (CMS).</div>
           </div>

           <div className="bg-emerald-100 rounded-3xl p-8 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1">
                  <SlotNumber value="83" />%
                  {renderSourceRef(["hrs-frederick-83"], "Demonstrated clinical impact in large health-system deployments")}
                </div>
                <div className="text-slate-700 font-medium">Demonstrated clinical impact in large health-system deployments</div>
              </div>
              <div className="text-sm text-slate-600 font-medium">Frederick Health RPM case study.</div>
           </div>

           <div className="bg-indigo-100 rounded-3xl p-8 md:col-span-2 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1">
                  6 in 10 Adults Live With a Chronic Condition.
                  {renderSourceRef(["cdc-6in10"], "Chronic condition prevalence")}
                </div>
              </div>
              <div className="text-sm text-slate-600 font-medium">Chronic disease management is a persistent, growing need across primary care.</div>
           </div>

           {/* Row 2 */}
           <div className="bg-white rounded-3xl p-8 md:col-span-2 shadow-sm border border-slate-100 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1">
                  93% of Medicare Spend Is Tied to Chronic Disease.
                  {renderSourceRef(["cms-93pct"], "Medicare spend and chronic disease")}
                </div>
              </div>
              <div className="text-sm text-slate-600 font-medium">Primary care clinics are under pressure to manage complex, ongoing patient needs.</div>
           </div>

           <div className="bg-emerald-100 rounded-3xl p-8 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1">
                  <SlotNumber value="3" />×–<SlotNumber value="6" />×
                  {renderSourceRef(["internal-4"], "More touchpoints")}
                </div>
                <div className="text-slate-700 font-medium">More touchpoints</div>
              </div>
              <div className="text-sm text-slate-600 font-medium">LOGIC reaches patients monthly to flag risks early through consistent, predictive outreach.</div>
           </div>

           <div className="bg-rose-100 rounded-3xl p-8 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1">
                  $<SlotNumber value="0" />
                  {renderSourceRef(["internal-0"], "Cost to start")}
                </div>
                <div className="text-slate-700 font-medium">Cost to start</div>
              </div>
              <div className="text-sm text-slate-600 font-medium">Opex relief with no capex required from the provider.</div>
           </div>

           {/* Row 3 */}
           <div className="bg-indigo-100 rounded-3xl p-8 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1">
                  2×
                  {renderSourceRef(["cms-stars-2026"], "Star Ratings influence")}
                </div>
                <div className="text-slate-700 font-medium">Star Ratings influence</div>
              </div>
              <div className="text-sm text-slate-600 font-medium">
                Patient experience &amp; access measures are double-weighted in Medicare Advantage Star Ratings (2026).
              </div>
           </div>

           <div className="bg-yellow-100 rounded-3xl p-8 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1">
                  <SlotNumber value="100" />%
                  {renderSourceRef(["internal-1"], "Interaction auditing")}
                </div>
                <div className="text-slate-700 font-medium mb-8">Interaction auditing</div>
              </div>
              <div className="text-sm text-slate-600 font-medium">Built-in quality assurance and compliance across patient interactions.</div>
           </div>

           <div className="bg-rose-100 rounded-3xl p-8 md:col-span-2 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1">
                  &gt;75K CCM Patients
                  {renderSourceRef(["internal-2"], "CCM patients supported")}
                </div>
              </div>
              <div className="text-sm text-slate-600 font-medium">Previously supported by LOGIC leadership team over the last 10+ years.</div>
           </div>

         </div>
         <details id="sources" className="mt-8 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
           <summary className="cursor-pointer font-semibold text-slate-900">Sources</summary>
           <ol className="mt-3 space-y-3 pl-5">
             {SOURCES.map((source, index) => (
               <li key={source.id} className="list-decimal">
                 <div className="font-medium text-slate-900">[{index + 1}] {source.label}</div>
                 {source.url ? (
                   <>
                     <div className="text-xs text-slate-500">{source.date}</div>
                     <a href={source.url} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline">
                       Open source
                     </a>
                   </>
                 ) : null}
               </li>
             ))}
           </ol>
         </details>
      </div>
    </section>
  );
}

function WhoThrives() {
  const profiles = [
    { title: "Pharma Sales Reps", desc: "Leverage your experience calling on clinics to introduce a solution that improves continuity of care and supports clinic operations.", icon: MultiColorStethoscope, color: "" },
    { title: "Medical Device Reps", desc: "Use the trust you've built with providers to introduce a care-management program that complements peri-operative care and extends your strategic relevance within existing accounts.", icon: MultiColorActivity, color: "" },
    { title: "Home Health Reps", desc: "Support referring clinics with care-management programs that surface patient needs earlier and lead to better-timed, more successful home health episodes.", icon: MultiColorBuilding, color: "" },
    { title: "Billing & RCM Professionals", desc: "You're a trusted part of the practice's business team. Care management can increase clinic revenue while strengthening compliance and improving patient outcomes.", icon: MultiColorDollar, color: "" },
  ];

  return (
    <section className="py-20 bg-background" id="who-its-for">
      <div className="container-padding mx-auto">
        <div className="text-center mb-16">
           <h2 className="text-3xl lg:text-4xl font-bold font-heading">Who Thrives in This Role?</h2>
          <p className="text-muted-foreground mt-4">Best fit: reps and professionals with existing clinic relationships who want to add a high-value care-management solution to their sales motion.</p>
        </div>

        {/* Selling Background */}
        <div className="mb-12">
          <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wide text-center mb-6">Selling Background</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
             {profiles.map((p, i) => (
               <div key={i} className="group relative p-6 rounded-2xl border border-border hover:border-primary/50 bg-card hover:bg-slate-50 transition-all">
                  <div className="mb-4">
                     <ColorfulIcon icon={p.icon} colorClass={p.color} size={32} />
                  </div>
                  <h3 className="text-lg font-bold mb-2">{p.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
               </div>
             ))}
          </div>
        </div>

        {/* Selling Style & Strengths */}
        <div>
          <h3 className="text-lg font-semibold text-muted-foreground uppercase tracking-wide text-center mb-6">Selling Style & Strengths</h3>
          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            <div className="group p-5 rounded-2xl border border-border hover:border-primary/50 bg-card hover:bg-slate-50 transition-all">
              <h4 className="text-base font-bold mb-2">Consultative closers</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You enjoy long-form discovery, mapping stakeholders, and building a straightforward
                economic and operational case—not just demoing features.
              </p>
            </div>
            <div className="group p-5 rounded-2xl border border-border hover:border-primary/50 bg-card hover:bg-slate-50 transition-all">
              <h4 className="text-base font-bold mb-2">Fluent in numbers and workflows</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                You're comfortable talking about margin, staffing models, care-gap metrics,
                and VBC incentives, then translating that into a clear pitch.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  const { openTakeover } = useTakeoverContext();

  return (
    <section className="py-20 bg-slate-900 text-slate-50" id="how-it-works">
      <div className="container-padding mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6">Simple 3-Step Process</h2>
            <p className="text-slate-400 mb-8 text-lg">We keep it simple so you can focus on what you do best: opening doors and managing relationships.</p>
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200 border-none font-bold" onClick={openTakeover}>Start Process Now</Button>
          </div>
          
          <div className="space-y-8">
            {[
              { num: "01", title: "Apply & Qualify", desc: "Share your background, territory, and experience working with clinics to see if you're a fit." },
              { num: "02", title: "Get Equipped", desc: "Receive full training, pitch decks, one-pagers, and access to our partner portal." },
              { num: "03", title: "Engage Your Network", desc: "Introduce care management opportunities within your clinic relationships. LOGIC leads evaluation, contracting, and program launch, with rep involvement through closing." },
            ].map((step, i) => (
              <div key={i} className="flex gap-6">
                <div className="text-4xl font-bold text-slate-700 font-heading">{step.num}</div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-white">{step.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CompSection() {
  return (
    <section className="py-20 lg:py-28 bg-background" id="comp">
      <div className="container-padding mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div className="order-2 lg:order-1">
          <Card className="bg-slate-50 border-none shadow-inner p-6 space-y-4">
             <div className="bg-white p-5 rounded-xl shadow-sm border border-border/50 flex justify-between items-center gap-4">
                <div className="flex-1">
                   <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Clinic A (Small)</div>
                   <div className="font-bold text-base mt-1">3 Providers</div>
                </div>
                <div className="text-right flex-shrink-0">
                   <div className="font-bold text-green-600 text-lg">Up to $25K commission</div>
                </div>
             </div>
             <div className="bg-white p-5 rounded-xl shadow-sm border border-border/50 flex justify-between items-center gap-4">
                <div className="flex-1">
                   <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Clinic B (Medium)</div>
                   <div className="font-bold text-base mt-1">6 Providers</div>
                </div>
                <div className="text-right flex-shrink-0">
                   <div className="font-bold text-green-600 text-lg">Up to $40K commission</div>
                </div>
             </div>

             <div className="pt-4 text-center">
                <div className="text-xs text-muted-foreground mt-2">Commission amounts are earned based on objective sales milestones and are not tied to utilization, billing, or ongoing clinic performance.</div>
             </div>
          </Card>
        </div>

        <div className="order-1 lg:order-2">
           <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6">High-Value Commissions With Flexible Commitment.</h2>
           <div className="space-y-4">
             <div className="flex gap-3">
               <div className="w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 size={14} /></div>
               <p className="text-lg text-muted-foreground">Commission-only compensation tied to clear, milestone-based clinic sales.</p>
             </div>
             <div className="flex gap-3">
               <div className="w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 size={14} /></div>
               <p className="text-lg text-muted-foreground">Independent contractor — keep your day job or go full-time.</p>
             </div>
             <div className="flex gap-3">
               <div className="w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 size={14} /></div>
               <p className="text-lg text-muted-foreground">Designed to layer into your existing sales relationships.</p>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const { openTakeover } = useTakeoverContext();

  return (
    <section className="py-24 bg-slate-900 text-slate-50 text-center">
      <div className="container-padding mx-auto max-w-3xl">
        <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6 text-white">Ready to Add a New Revenue Stream?</h2>
        <p className="text-xl text-slate-300 mb-10">Offer clinics a fully-operated care-management solution they love—and build durable, long-term earnings as you grow your book.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-xl bg-white text-slate-900 hover:bg-slate-200 border-none" onClick={openTakeover}>
            Apply to Sell Care Management
          </Button>
        </div>
      </div>
    </section>
  );
}

function SolutionsWeOffer() {
  const solutions = [
    {
      title: "Chronic Care Management (CCM)",
      body: "Streamlined documentation, supervision logic, and Z‑code overlays.",
      icon: MultiColorStethoscope,
    },
    {
      title: "Remote Patient Monitoring (RPM)",
      body: "Device integration, alert routing, and audit-ready documentation.",
      icon: MultiColorActivity,
    },
    {
      title: "Annual Wellness Visit (AWV)",
      body: "Personalized prevention plans, HRA logic, and Z‑code capture aligned with CMS.",
      icon: MultiColorChart,
    },
    {
      title: "Behavioral Health Integration (BHI)",
      body: "Embedded PROMs and risk stratification for integrated behavioral care.",
      icon: MultiColorUsers,
    },
    {
      title: "Principal Care Management (PCM)",
      body: "Specialty‑aligned protocols for high‑risk, single‑condition patients.",
      icon: MultiColorTrendUp,
    },
    {
      title: "Transitional Care Management (TCM)",
      body: "Discharge coordination, care management, and equity mapping.",
      icon: MultiColorKey,
    },
    {
      title: "Principal Illness Navigation (PIN)",
      body: "Care navigation and coordination for high-risk patients with a principal diagnosis, aligned to CMS PIN requirements.",
      icon: MultiColorZap,
    },
    {
      title: "Community Health Integration (CHI)",
      body: "Structured SDOH screening, referral workflows, and documentation aligned with CMS requirements.",
      icon: MultiColorBuilding,
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-t border-border">
      <div className="container-padding mx-auto">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            What you'll be selling
          </h2>
          <p className="mt-3 text-muted-foreground">
            Operated with rigor. Equity embedded. Audit-ready at scale.
          </p>
        </div>

        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((solution, i) => (
            <div key={i} className="h-full">
              <div className="group h-full p-6 rounded-2xl border border-border hover:border-primary/50 bg-card hover:bg-slate-50 transition-all">
                <div className="flex items-center gap-3">
                  <ColorfulIcon icon={solution.icon} size={24} />
                  <h3 className="text-base font-semibold text-slate-900">{solution.title}</h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{solution.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProgramChip({
  chipKey,
  shortLabel,
  fullLabel,
  details,
  activeChipKey,
  setActiveChipKey,
  setChipRef,
}: {
  chipKey: string;
  shortLabel: string;
  fullLabel: string;
  details: string[];
  activeChipKey: string | null;
  setActiveChipKey: (key: string | null) => void;
  setChipRef: (key: string, node: HTMLDivElement | null) => void;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const isOpen = activeChipKey === chipKey;
  const tooltipId = `${chipKey}-tooltip`;

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(max-width: 639px)");
    const updateMatch = () => setIsMobile(media.matches);
    updateMatch();
    if (media.addEventListener) {
      media.addEventListener("change", updateMatch);
      return () => media.removeEventListener("change", updateMatch);
    }
    media.addListener(updateMatch);
    return () => media.removeListener(updateMatch);
  }, []);

  return (
    <div
      ref={(node) => setChipRef(chipKey, node)}
      className="relative inline-flex"
      onMouseEnter={() => {
        if (!isMobile) setActiveChipKey(chipKey);
      }}
      onMouseLeave={() => {
        if (!isMobile) setActiveChipKey(null);
      }}
    >
      <button
        type="button"
        aria-label={fullLabel}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-describedby={isOpen ? tooltipId : undefined}
        onFocus={() => setActiveChipKey(chipKey)}
        onBlur={() => setActiveChipKey(null)}
        onClick={() => setActiveChipKey(isOpen ? null : chipKey)}
        className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-primary"
      >
        {shortLabel}
      </button>
      {isOpen && (
        <div
          id={tooltipId}
          role="tooltip"
          className={`rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-700 shadow-xl transition-opacity duration-75 ${
            isMobile
              ? "fixed left-1/2 top-1/2 z-[100] w-[90vw] max-w-sm -translate-x-1/2 -translate-y-1/2 max-h-[80vh] overflow-y-auto"
              : "absolute left-0 top-full z-50 mt-2 w-80 max-w-sm sm:w-96"
          }`}
        >
          <div className="font-semibold text-slate-900">{fullLabel}</div>
          <ul className="mt-2 space-y-2 text-slate-600">
            {details.map((detail, idx) => (
              <li key={idx}>{detail}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function WhoYoullBeSelling() {
  const [activeChipKey, setActiveChipKey] = useState<string | null>(null);
  const chipRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const customerTypes = [
    {
      title: "Primary Care Clinics",
      tags: [
        {
          key: "primary-awv",
          shortLabel: "Wellness (AWV)",
          fullLabel: "Annual Wellness Visits (AWV)",
          details: [
            "Annual Wellness Visit (AWV) with personalized prevention plans, Health Risk Assessment (HRA) logic, and Z-code capture aligned with CMS.",
            "Prevention and Wellness Visit evidence-based screenings, immunizations, and lifestyle interventions aligned with CMS and U.S. Preventive Services Task Force (USPSTF) guidelines.",
          ],
        },
        {
          key: "primary-ccm",
          shortLabel: "Chronic Care (CCM)",
          fullLabel: "Chronic Care Management (CCM)",
          details: [
            "Chronic Care Management (CCM) with streamlined documentation, supervision logic, and Z-code overlays.",
          ],
        },
        {
          key: "primary-rpm",
          shortLabel: "Monitoring (RPM)",
          fullLabel: "Remote Patient Monitoring (RPM)",
          details: [
            "Remote Patient Monitoring (RPM) with device integration, alert routing, and compliance dashboards.",
          ],
        },
        {
          key: "primary-bhi",
          shortLabel: "Behavioral (BHI)",
          fullLabel: "Behavioral Health Integration (BHI)",
          details: [
            "Behavioral Health Integration (BHI) with embedded Patient-Reported Outcome Measures (PROMs) and risk stratification.",
          ],
        },
        {
          key: "primary-chi",
          shortLabel: "Community (CHI)",
          fullLabel: "Community Health Integration (CHI)",
          details: [
            "Community Health Integration (CHI) with Social Determinants of Health (SDoH)-driven workflows.",
          ],
        },
        {
          key: "primary-pin",
          shortLabel: "Illness Navigation (PIN)",
          fullLabel: "Principal Illness Navigation (PIN)",
          details: [
            "Principal Illness Navigation (PIN) with Social Determinants of Health (SDoH)-driven workflows.",
          ],
        },
      ],
      bullets: [
        "Longitudinal care mgmt for high-risk patients",
        "Coordination, patient education, and social support",
        "Population analytics and quality tracking",
      ],
    },
    {
      title: "Specialty Clinics",
      tags: [
        {
          key: "specialty-pcm",
          shortLabel: "Care Management (PCM)",
          fullLabel: "Principal Care Management (PCM)",
          details: [
            "Principal Care Management (PCM) tailored for high-risk patients and specialty alignment.",
          ],
        },
        {
          key: "specialty-rpm",
          shortLabel: "Monitoring (RPM)",
          fullLabel: "Remote Patient Monitoring (RPM)",
          details: [
            "Remote Patient Monitoring (RPM) with device integration, alert routing, and compliance dashboards.",
          ],
        },
        {
          key: "specialty-tcm",
          shortLabel: "Transitional (TCM)",
          fullLabel: "Transitional Care Management (TCM)",
          details: [
            "Transitional Care Management (TCM) with discharge coordination, care management, and equity mapping.",
          ],
        },
      ],
      bullets: [
        "Condition-specific care coordination",
        "Ongoing monitoring with defined escalation paths",
        "Structured transitions across care settings",
      ],
    },
    {
      title: "Small Hospitals",
      tags: [
        {
          key: "hospital-tcm",
          shortLabel: "Transitional (TCM)",
          fullLabel: "Transitional Care Management (TCM)",
          details: [
            "Transitional Care Management (TCM) with discharge coordination, care management, and equity mapping.",
          ],
        },
        {
          key: "hospital-teams",
          shortLabel: "Team-aligned workflows",
          fullLabel: "Team-aligned transition workflows",
          details: [
            "Hospital-based Team Evaluation and Augmented Management (TEAMs) models for scalable inpatient and outpatient care.",
          ],
        },
      ],
      bullets: [
        "Discharge coordination and post-acute follow-up",
        "Inpatient–outpatient continuity of care",
        "Support for mandatory CMS payment models",
      ],
    },
  ];

  useEffect(() => {
    if (!activeChipKey) return;

    const handlePointerDown = (event: PointerEvent) => {
      const activeNode = chipRefs.current[activeChipKey];
      if (!activeNode || activeNode.contains(event.target as Node)) return;
      setActiveChipKey(null);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [activeChipKey]);

  return (
    <section className="py-20 bg-background">
      <div className="container-padding mx-auto">
        <div className="mx-auto max-w-4xl text-center mb-12">
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
            Who you'll be selling to
          </h2>
          <p className="mt-3 text-muted-foreground">
            You're selling alleviating operational pain points and improving financial performance by closing care gaps and improving patient care quality metrics for the following customers.
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-3">
          {customerTypes.map((customer, i) => (
            <div key={i} className="group h-full p-6 rounded-2xl border border-border hover:border-primary/50 bg-card hover:bg-slate-50 transition-all">
              <h3 className="text-lg font-bold text-slate-900">{customer.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {customer.tags.map((tag, j) => (
                  <ProgramChip
                    key={tag.key ?? `${customer.title}-${j}`}
                    chipKey={tag.key ?? `${customer.title}-${j}`}
                    shortLabel={tag.shortLabel}
                    fullLabel={tag.fullLabel}
                    details={tag.details}
                    activeChipKey={activeChipKey}
                    setActiveChipKey={setActiveChipKey}
                    setChipRef={(key, node) => {
                      chipRefs.current[key] = node;
                    }}
                  />
                ))}
              </div>
              <ul className="mt-5 space-y-2">
                {customer.bullets.map((bullet, j) => (
                  <li key={j} className="text-sm text-muted-foreground leading-relaxed">{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { question: "Is this commission-only?", answer: "Yes—1099 commission-only. No base salary." },
    { question: "Can I do this part-time?", answer: "Yes—built for part-time or full-time." },
    { question: "Can I keep my current job?", answer: "Yes—non-exclusive, subject to standard conflict-of-interest and non-compete restrictions. Designed to add to your bag." },
    { question: "Is this cross-sell friendly?", answer: "Yes—care management integrates naturally into a clinic-focused sales portfolio." },
    { question: "What is LOGIC?", answer: "LOGIC is a care-management platform and operating partner for clinics. We design, deploy, and support scalable care-management programs, including hiring, training, and managing the care team, and running day-to-day program operations." },
    { question: "Who does LOGIC serve?", answer: "Provider organizations including primary care clinics, specialty clinics, small hospitals, and MSOs." },
    { question: "What programs does LOGIC operate?", answer: "Chronic Care Management, Remote Patient Monitoring, Transitional Care Management, and related CMS-recognized care-management programs." },
    { question: "How does it work?", answer: "You introduce and advance the opportunity within your clinic relationships and remain involved through closing. LOGIC leads evaluation, contracting, program launch, and ongoing operations." },
    { question: "Is LOGIC compliant with CMS standards?", answer: "LOGIC operates with HIPAA-aligned workflows, executes BAAs where applicable, and maintains audit-ready documentation and outreach tracking." },
    { question: "Do I have to run demos or handle implementation?", answer: "No. You are not responsible for implementation or ongoing operations. You participate in sales discussions through closing; LOGIC leads evaluation, contracting, program launch, and ongoing operations." },
    { question: "What does my involvement look like after the introduction?", answer: "Light-touch after closing. You remain involved through the sales process; LOGIC owns delivery and ongoing support." },
    { question: "How long does it take to launch after a provider says yes?", answer: "Launch timing depends on provider readiness and scope. LOGIC manages the launch plan and staffing to minimize provider burden." },
    { question: "Do providers need to hire staff or change their operations?", answer: "No additional headcount is required. LOGIC provides the care team and operates the workflows alongside the clinic." },
    { question: "Will this disrupt a clinic’s workflow?", answer: "Minimal disruption. LOGIC plugs into the clinic’s cadence with defined outreach, documentation, escalation paths, and reporting." },
    { question: "What types of provider organizations are the best fit?", answer: "Organizations with chronic populations and a desire to improve patient outcomes and financial performance without hiring or managing an internal care team." },
    { question: "Do you work with small hospitals and rural providers?", answer: "Yes. LOGIC supports small hospitals and rural providers." },
    { question: "Do you require a specific EMR or integration?", answer: "No. LOGIC does not require dependency on a specific EMR vendor or FHIR build." },
    { question: "Does LOGIC bill on behalf of the provider?", answer: "LOGIC supports documentation and billing workflows. Providers retain billing responsibility; specific arrangements vary by the provider model and agreement." },
    { question: "Can I bring multiple provider accounts?", answer: "Yes. This model is designed to scale across a portfolio of provider relationships." },
    { question: "Do you provide partner enablement or materials?", answer: "Yes. LOGIC provides messaging, qualification guidance, and a clear handoff process so you can sell confidently without heavy lift." },
    { question: "What if a provider asks for outcomes proof?", answer: "We share LOGIC results when available and clearly labeled industry benchmarks where appropriate, with sources." },
  ];
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
const visibleFaqs = faqs.slice(0, 6);
  const extraFaqs = faqs.slice(6);

  return (
    <section id="faq" className="py-20 bg-slate-900 text-slate-50">
      <div className="container-padding mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold font-heading text-center mb-12 text-white">Frequently Asked Questions</h2>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <div className="grid gap-6">
          {visibleFaqs.map((faq, i) => (
            <Card key={i} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2 text-white">{faq.question}</h3>
                <p className="text-slate-300">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <details className="mt-6 group">
          <summary className="text-sm font-semibold text-slate-300 hover:text-white underline-offset-4 hover:underline cursor-pointer">
            <span className="group-open:hidden">Show more FAQs</span>
            <span className="hidden group-open:inline">Show fewer FAQs</span>
          </summary>
          <div className="mt-6 grid gap-6">
            {extraFaqs.map((faq, i) => (
              <Card key={i + visibleFaqs.length} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold mb-2 text-white">{faq.question}</h3>
                  <p className="text-slate-300">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </details>
      </div>
    </section>
  );
}

function Footer() {
  const { openTakeover } = useTakeoverContext();
  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-border">
      <div className="container-padding mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-10 mb-16">
          <div className="col-span-2">
            <div className="mb-6">
              <img src={logicLogo} alt="LOGIC Health" className="h-12 w-auto" />
            </div>
            <p className="text-muted-foreground text-sm max-w-xs">
              LOGIC is an outsourced care-management operator that stands up, staffs, operates, audits, and improves CMS-reimbursable care-management programs—without adding provider headcount.
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">Program</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Overview</a></li>
              <li><a href="#comp" className="hover:text-primary">Compensation</a></li>
              <li><a href="#faq" className="hover:text-primary">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">For Reps</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary">Apply Now</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms of Service</Link></li>
              <li><button onClick={openTakeover} className="hover:text-primary">Contact Us</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <address className="not-italic text-sm text-muted-foreground space-y-1">
              <p>LOGIC Health Management</p>
              <p>5900 Balcones Dr.</p>
              <p>Suite 100</p>
              <p>Austin, TX 78731</p>
              <p>Email: partners@ccm-logichm.com</p>
            </address>
          </div>
        </div>
        
        <Separator className="mb-8" />
        
        <div className="text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} LOGIC Health. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

// --- Application Takeover Component ---
function ApplicationTakeover() {
  const { isOpen, closeTakeover } = useTakeoverContext();

  return (
    <FullPageTakeover
      isOpen={isOpen}
      onClose={closeTakeover}
      title="Rep Application"
      description="See if you qualify for the program."
    >
      <ApplicationForm />
    </FullPageTakeover>
  );
}

// --- Main Page Component ---
export default function Home() {
  return (
    <TakeoverProvider>
      <FormStateProvider>
        <div className="min-h-screen font-sans selection:bg-primary/20">
          <Navbar />
          <Hero />
          <LogoStrip />
          <Testimonial />
          <ValuePillars />
          <RisksMitigated />
          <BeforeAfter />
          <Features />
          <EventStream />
          <Metrics />
          <WhoThrives />
          <HowItWorks />
          <CompSection />
          <FinalCTA />
          <SolutionsWeOffer />
          <WhoYoullBeSelling />
          <FAQ />
          <Footer />
          <ApplicationTakeover />
        </div>
      </FormStateProvider>
    </TakeoverProvider>
  );
}


















