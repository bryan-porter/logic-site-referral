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
    { name: "Comp & Upside", href: "#comp" },
    { name: "Who It’s For", href: "#who-its-for" },
    { name: "How It Works", href: "#how-it-works" },
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
            Sell Care Management<br className="hidden lg:block" />to Clinics. Build<br className="hidden lg:block" /><span className="text-blue-400">Long-Term Earnings.</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
            LOGIC is designed to be operationally light for providers and straightforward for you to sell. You focus on prospecting, selling, and activating clinics—we handle the implementation, ongoing support, and the care-management engine that creates measurable value. Make the sales call with confidence: minimal lift, meaningful value, and strong operational support.
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
  const logos = [
    "Hackensack Meridian",
    "Tampa General Hospital",
    "CommonSpirit Health",
    "BayCare HomeCare",
    "Piedmont Healthcare",
    "UnityHealth",
    "University of Kentucky",
    "Frederick Health",
    "LifePoint Health",
    "Community Health Systems",
    "The Wright Center",
    "Prisma Health",
    "Main Line Health",
    "Cardiac Solutions",
    "Ascension",
    "Lovelace Hospital",
  ];

  return (
    <section className="py-10 border-y border-border/50 bg-slate-50/50 overflow-hidden">
      <div className="container-padding mx-auto text-center mb-8">
        <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
          Industry Provider Groups Are Investing in Care Management
        </p>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Gradient Masks for edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-slate-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-slate-50 to-transparent z-10 pointer-events-none" />

        <div className="flex animate-scrolling-left gap-16 whitespace-nowrap w-max">
          {[...logos, ...logos, ...logos, ...logos].map((logo, i) => (
            <div key={i} className="text-lg lg:text-xl font-heading font-bold text-slate-400 hover:text-primary cursor-default transition-colors shrink-0">
              {logo}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ValuePillars() {
  const [activeTile, setActiveTile] = useState<number>(0);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [userInteracting, setUserInteracting] = useState(false);
  const [stageHeight, setStageHeight] = useState<number>(0);

  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const stageRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const userInteractTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [mounted, setMounted] = useState(false);

  // Set mounted after first render to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

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
      body: "LOGIC helps practices and small hospitals improve care continuity and unlock sustainable care-management revenue through a proven operating model—so you show up with a solution that impacts both outcomes and operations.",
      bullets: [
        "You bring a value-based solution, not another widget",
        "The impact is visible to clinicians and administrators",
        "Creates \"trusted partner\" positioning inside the account"
      ]
    },
    {
      title: "Differentiated Advantage",
      lead: "Sharper story for key accounts, backed by an operating model that delivers.",
      body: "LOGIC is built as a comprehensive care-management partner—not a point solution. We bring a complete operating model (sales support, implementation, and ongoing care-management operations) that's easy to explain, easy for clinics to adopt, and clearly distinct from basic CCM-only offerings.",
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
    if (!mounted || !sectionRef.current || userInteracting || shouldReduceMotion) return;

    // Determine which tile should be active based on scroll position
    const idx = latest < 0.33 ? 0 : latest < 0.66 ? 1 : 2;
    setActiveTile(idx);
  });

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
    <section ref={sectionRef} className="relative bg-slate-50/50 py-20 lg:py-28">
        <div className="container-padding mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold font-heading text-foreground mb-4">
              Three reasons reps love selling LOGIC
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Designed for busy physician practices and small hospitals. Built for low-lift selling: reps lead the sale and clinic activation, while LOGIC provides deal support and the operational engine that delivers measurable value—without adding workload to the clinic.
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
        <div className="lg:hidden space-y-4">
          {pillars.map((pillar, i) => (
            <Card
              key={i}
              className={`cursor-pointer transition-all duration-200 ${
                activeTile === i ? 'border-primary/40 shadow-lg' : 'hover:border-primary/30'
              }`}
              onClick={() => handleTileEnter(i)}
            >
              <CardContent className="p-6">
                <h3 className="text-lg font-bold font-heading text-foreground">{pillar.title}</h3>
                <p className="text-sm font-semibold text-foreground mt-2">{pillar.lead}</p>

                {activeTile === i && (
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
                )}
              </CardContent>
            </Card>
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
      body: "We operate with a \"back-end owned by LOGIC\" mindset: responsive support, proactive issue resolution, and a structured escalation path so small issues don't become account-level frustrations."
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
      body: "We provide a documented compliance posture and standard contracting framework (including HIPAA-aligned processes and applicable agreements, such as a BAA when appropriate) so you can sell professionally and consistently—without feeling like you're putting your name on something uncertain."
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
            "Care management quickly became a compelling economic and <span className="text-primary font-bold decoration-2 underline decoration-blue-200 underline-offset-4 whitespace-nowrap">clinical win for the clinics</span> I work with. Practices were able to add a new, sustainable revenue stream while closing care gaps and advancing value-based care — all without hiring staff or investing in new infrastructure. LOGIC's operational support made the business case real."
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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">Stop limiting your upside to one-off sales. Compare the traditional rep model to a long-term care management opportunity.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 relative">

          {/* Divider Badge */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -mt-2 z-10 hidden lg:flex">
             <div className="w-12 h-12 bg-background border-4 border-slate-50 rounded-full flex items-center justify-center shadow-sm">
                <ArrowRight className="text-muted-foreground" size={20} />
             </div>
          </div>

          {/* Before Header */}
          <div className="text-center mb-2">
             <h3 className="text-2xl font-bold text-slate-700 tracking-tight">Before Care Management</h3>
          </div>

          {/* After Header */}
          <div className="text-center mb-2">
             <h3 className="text-2xl font-bold text-primary tracking-tight">With Care Management</h3>
          </div>

          {/* Row 1 */}
          <Card className="border-border/60 bg-white/50 shadow-none hover:shadow-sm transition-shadow">
            <CardContent className="flex items-start gap-4 p-5 h-full">
              <div className="mt-1">
                <ColorfulIcon icon={MultiColorX} colorClass="" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-foreground">One-off commissions</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">Compensation tied to individual product or service sales</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-white shadow-sm ring-1 ring-primary/5 hover:ring-primary/20 transition-all">
            <CardContent className="flex items-start gap-4 p-5 h-full">
              <div className="mt-1">
                <ColorfulIcon icon={MultiColorDollar} colorClass="" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Durable, recurring earnings</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">Earn ongoing compensation as clinics successfully adopt and sustain care-management programs</p>
              </div>
            </CardContent>
          </Card>

          {/* Row 2 */}
          <Card className="border-border/60 bg-white/50 shadow-none hover:shadow-sm transition-shadow">
            <CardContent className="flex items-start gap-4 p-5 h-full">
              <div className="mt-1">
                <ColorfulIcon icon={MultiColorKey} colorClass="" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Limited strategic value</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">Multiple opportunities for revenue go undiscovered each month in each clinic you already visit</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-white shadow-sm ring-1 ring-primary/5 hover:ring-primary/20 transition-all">
            <CardContent className="flex items-start gap-4 p-5 h-full">
              <div className="mt-1">
                <ColorfulIcon icon={MultiColorUsers} colorClass="" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Stronger provider relationships</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">Bringing a real operating solution positions you as a trusted, long-term partner—not just another vendor</p>
              </div>
            </CardContent>
          </Card>

          {/* Row 3 */}
          <Card className="border-border/60 bg-white/50 shadow-none hover:shadow-sm transition-shadow">
            <CardContent className="flex items-start gap-4 p-5 h-full">
              <div className="mt-1">
                <ColorfulIcon icon={MultiColorClock} colorClass="" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Limited account signal</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">Reps operate with incomplete information between interactions</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-primary/20 bg-white shadow-sm ring-1 ring-primary/5 hover:ring-primary/20 transition-all">
            <CardContent className="flex items-start gap-4 p-5 h-full">
              <div className="mt-1">
                <ColorfulIcon icon={MultiColorBuilding} colorClass="" size={24} />
              </div>
              <div>
                <h4 className="font-bold text-foreground">Higher-quality account insight</h4>
                <p className="text-sm text-muted-foreground leading-relaxed mt-1">Program activity creates signal around engagement and readiness—so reps can tailor outreach and protect hard-won relationships.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 text-center">
            <p className="text-sm font-bold text-red-500 bg-red-50 inline-block px-4 py-2 rounded-full border border-red-100">
             100% commission, performance-driven, and built for high earners.
            </p>
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      title: "Durable Commissions",
      desc: "Build a book of activated clinics that generates ongoing earnings over time.",
      icon: MultiColorChart,
      color: ""
    },
    {
      title: "Unlimited Clinics",
      desc: "No cap on the number of practices you can activate. Scale your book of business without limits.",
      icon: MultiColorBuilding,
      color: ""
    },
    {
      title: "Clinic-First Economics",
      desc: "Sell a solution clinics want—one that strengthens financial performance while improving patient outcomes.",
      icon: MultiColorHandshake,
      color: ""
    },
    {
      title: "Low Operational Load",
      desc: "LOGIC Health runs Care Management operations, staffing, and software. You focus on opening doors.",
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
    "Clinic A enrolled first patients",
    "Clinic B added an active provider",
    "Patient adherence rate at Clinic C hit 95%",
    "Your clinic activation commission this quarter to date: $15,000",
    "Your active provider monthly fee last month: $2500",
  ];

  return (
    <section className="py-20 overflow-hidden bg-slate-900 text-slate-50 relative">
      <div className="container-padding mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6">
            Clear Visibility Into Your Book of Business
          </h2>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            Stay plugged into your portfolio's performance. Track clinic activation, provider participation, and commission status with full transparency.
          </p>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-green-400 mt-0.5" size={20} />
              <span className="font-medium">Transparent reporting dashboard</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-green-400 mt-0.5" size={20} />
              <span className="font-medium">Monthly payout visibility</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="text-green-400 mt-0.5" size={20} />
              <span className="font-medium">Add care-management to existing clinic discussions</span>
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
  return (
    <section className="py-20 bg-slate-50/50 border-b border-border/50">
      <div className="container-padding mx-auto max-w-6xl">
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
           
           {/* Row 1 */}
           <div className="bg-yellow-100 rounded-3xl p-8 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1"><SlotNumber value="96" />%</div>
                <div className="text-slate-700 font-medium">Market opportunity</div>
              </div>
              <div className="text-sm text-slate-600 font-medium">Only ~4% of Medicare eligibles are enrolled in any care management program (CMS).</div>
           </div>

           <div className="bg-emerald-100 rounded-3xl p-8 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1"><SlotNumber value="83" />%</div>
                <div className="text-slate-700 font-medium">Readmission reduction</div>
              </div>
              <div className="text-sm text-slate-600 font-medium">Frederick Health RPM case study</div>
           </div>

           <div className="bg-indigo-100 rounded-3xl p-8 md:col-span-2 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1">6 in 10 Adults Live With a Chronic Condition.</div>
              </div>
              <div className="text-sm text-slate-600 font-medium">Chronic disease management is a persistent, growing need across primary care</div>
           </div>

           {/* Row 2 */}
           <div className="bg-white rounded-3xl p-8 md:col-span-2 shadow-sm border border-slate-100 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1">80% of Medicare Spend Is Tied to Chronic Disease.</div>
              </div>
              <div className="text-sm text-slate-600 font-medium">Primary care clinics are under pressure to manage complex, ongoing patient needs.</div>
           </div>

           <div className="bg-emerald-100 rounded-3xl p-8 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1"><SlotNumber value="6" />×–<SlotNumber value="12" />×</div>
                <div className="text-slate-700 font-medium">More touchpoints</div>
              </div>
              <div className="text-sm text-slate-600 font-medium">LOGIC reaches patients monthly to flag risks early through consistent, predictive outreach.</div>
           </div>

           <div className="bg-rose-100 rounded-3xl p-8 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1">$<SlotNumber value="0" /></div>
                <div className="text-slate-700 font-medium">Cost to start</div>
              </div>
              <div className="text-sm text-slate-600 font-medium">Opex relief with no capex required from the provider.</div>
           </div>

           {/* Row 3 */}
           <div className="bg-indigo-100 rounded-3xl p-8 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1"><SlotNumber value="1" />/<SlotNumber value="3" /></div>
                <div className="text-slate-700 font-medium">Star Ratings influence</div>
              </div>
              <div className="text-sm text-slate-600 font-medium">About one-third of Medicare Star Ratings are tied to patient satisfaction (CMS).</div>
           </div>

           <div className="bg-yellow-100 rounded-3xl p-8 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1"><SlotNumber value="100" />%</div>
                <div className="text-slate-700 font-medium mb-8">Interaction auditing</div>
              </div>
              <div className="text-sm text-slate-600 font-medium">Ambient AI supports quality and brand while ensuring HIPAA compliance.</div>
           </div>

           <div className="bg-rose-100 rounded-3xl p-8 md:col-span-2 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1">&gt;75K CCM Patients</div>
              </div>
              <div className="text-sm text-slate-600 font-medium">Previously supported by LOGIC leadership team over the last 10+ years</div>
           </div>

         </div>
      </div>
    </section>
  );
}

function WhoThrives() {
  const profiles = [
    { title: "Pharma Sales Reps", desc: "Leverage your experience calling on clinics to introduce a solution that improves continuity of care and supports clinic operations.", icon: MultiColorStethoscope, color: "" },
    { title: "Medical Device Reps", desc: "Use the trust you've built with surgeons and specialists to improve peri-operative care and support high-risk patients between visits—within the practices you already serve.", icon: MultiColorActivity, color: "" },
    { title: "Home Health Reps", desc: "Support referring clinics with care-management programs that surface patient needs earlier and lead to better-timed, more successful home health episodes.", icon: MultiColorBuilding, color: "" },
    { title: "Billing / RCM Reps", desc: "You're a trusted part of the practice's business team. Care management can increase clinic revenue while strengthening compliance and improving patient outcomes.", icon: MultiColorDollar, color: "" },
  ];

  return (
    <section className="py-20 bg-background" id="who-its-for">
      <div className="container-padding mx-auto">
        <div className="text-center mb-16">
           <h2 className="text-3xl lg:text-4xl font-bold font-heading">Who Thrives in This Role?</h2>
           <p className="text-muted-foreground mt-4">Best fit: reps with existing clinic relationships who want to add a high-value care-management solution to their sales motion.</p>
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
              { num: "02", title: "Get Equipped", desc: "Receive full training, pitch decks, one-pagers, and access to our simple CRM." },
              { num: "03", title: "Activate Network", desc: "Approach your clinics. Once they're interested, hand off the implementation to us." },
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
                   <div className="font-bold text-base mt-1">2 Providers</div>
                </div>
                <div className="text-right flex-shrink-0">
                   <div className="font-bold text-green-600 text-lg">$50K</div>
                </div>
             </div>
             <div className="bg-white p-5 rounded-xl shadow-sm border border-border/50 flex justify-between items-center gap-4">
                <div className="flex-1">
                   <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Clinic B (Medium)</div>
                   <div className="font-bold text-base mt-1">5 Providers</div>
                </div>
                <div className="text-right flex-shrink-0">
                   <div className="font-bold text-green-600 text-lg">$110K</div>
                </div>
             </div>

             <div className="pt-4 text-center">
                <div className="text-xs text-muted-foreground mt-2">Indicative 3-year compensation</div>
             </div>
          </Card>
        </div>

        <div className="order-1 lg:order-2">
           <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6">High-Upside Earnings With Flexible Commitment.</h2>
           <div className="space-y-4">
             <div className="flex gap-3">
               <div className="w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 size={14} /></div>
               <p className="text-lg text-muted-foreground">Commission-only compensation with long-term cash flows tied to activated clinics.</p>
             </div>
             <div className="flex gap-3">
               <div className="w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 size={14} /></div>
               <p className="text-lg text-muted-foreground">Independent contractor — keep your day job or go full-time.</p>
             </div>
             <div className="flex gap-3">
               <div className="w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 size={14} /></div>
               <p className="text-lg text-muted-foreground">Designed to bolt onto your existing portfolio immediately.</p>
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
        <p className="text-xl text-slate-300 mb-10">Offer clinics a care-management solution they love—and build durable, long-term earnings as you grow your book.</p>
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
      body: "Device integration, alert routing, and compliance dashboards.",
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

function WhoYoullBeSelling() {
  const customerTypes = [
    {
      title: "Primary Care Clinics",
      subline: "AWV · CCM · RPM · BHI · CHI · PIN",
      bullets: [
        "Longitudinal care mgmt for high-risk patients",
        "Coordination, patient education, and social support",
        "Population analytics and quality tracking",
      ],
    },
    {
      title: "Specialty Clinics",
      subline: "PCM · RPM · TCM",
      bullets: [
        "Condition-specific care coordination",
        "Ongoing monitoring with defined escalation paths",
        "Structured transitions across care settings",
      ],
    },
    {
      title: "Small Hospitals",
      subline: "TCM · TEAMs-aligned workflows",
      bullets: [
        "Discharge coordination and post-acute follow-up",
        "Inpatient–outpatient continuity of care",
        "Support for mandatory CMS payment models",
      ],
    },
  ];

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
              <p className="mt-2 text-sm font-medium text-primary">{customer.subline}</p>
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
    { q: "Is this commission-only?", a: "Yes—1099 commission-only. No base salary." },
    { q: "Can I do this part-time?", a: "Yes—built for part-time or full-time." },
    { q: "Can I keep my current job?", a: "Yes—non-exclusive; designed to add to your bag." },
    { q: "Is this cross-sell friendly?", a: "Yes—care management integrates naturally into a clinic-focused sales portfolio." },
  ];

  return (
    <section id="faq" className="py-20 bg-slate-900 text-slate-50">
      <div className="container-padding mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold font-heading text-center mb-12 text-white">Frequently Asked Questions</h2>
        <div className="grid gap-6">
          {faqs.map((faq, i) => (
            <Card key={i} className="bg-slate-800/50 border-slate-700 hover:border-slate-600 transition-all">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2 text-white">{faq.q}</h3>
                <p className="text-slate-300">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const { openTakeover } = useTakeoverContext();
  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-border">
      <div className="container-padding mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-6">
              <img src={logicLogo} alt="LOGIC Health" className="h-12 w-auto" />
            </div>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              Empowering healthcare sales professionals to sell care-management solutions that clinics and patients love.
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
