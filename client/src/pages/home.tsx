import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
  Stethoscope, 
  Activity, 
  FileText,
  Menu,
  X,
  ChevronRight,
  BarChart3
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

// --- Schema for Hero Form ---
const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  currentRole: z.string().min(2, "Role is required"),
  region: z.string().min(2, "Region is required"),
  relationships: z.string().min(1, "Estimate is required"),
  focus: z.string().min(1, "Please select a focus"),
  availability: z.string().min(1, "Please select availability"),
  addingToBusiness: z.string().min(1, "Please select an option"),
});

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
          <Button size="sm" className={`font-semibold shadow-md ${scrolled ? '' : 'bg-white text-slate-900 hover:bg-slate-200'}`}>
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
              <Button className="w-full">Apply Now</Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function Hero() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      currentRole: "",
      region: "",
      relationships: "",
      focus: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // Handle submission
  }

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
            For High-Performing Reps
          </div>
          <h1 className="text-4xl lg:text-6xl font-heading font-bold text-white leading-[1.1] mb-6 tracking-tight">
            Turn Your Clinic Relationships Into <span className="text-blue-400">Residual Income.</span>
          </h1>
          <p className="text-lg lg:text-xl text-slate-300 mb-8 leading-relaxed max-w-xl">
            LOGIC is designed to be operationally light for providers and straightforward for you to introduce. You bring the relationship—we bring the implementation, ongoing support, and the care-management engine that creates measurable value. Make the call with confidence: minimal lift, meaningful value, strong support.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="h-12 px-8 text-base font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 bg-white text-slate-900 hover:bg-slate-200 border-none">
              Apply to Be a CCM Rep
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base font-medium bg-transparent border-slate-600 text-white hover:bg-white/10 hover:text-white">
              View Comp Structure
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
            <p>Join 500+ independent reps earning today.</p>
          </div>
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-2xl blur-lg opacity-70" />
          <Card className="relative border-none shadow-2xl bg-white text-slate-900">
            <CardContent className="p-6 lg:p-8">
              <div className="mb-6">
                <h3 className="text-xl font-bold font-heading text-slate-900">Rep Application</h3>
                <p className="text-sm text-slate-500 mb-1">See if you qualify for the program.</p>
                <p className="text-xs text-muted-foreground font-medium text-slate-400">Independent contractor. Part-time friendly. Non-exclusive.</p>
              </div>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-xs uppercase font-semibold text-muted-foreground">Full Name</Label>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} className="bg-background/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                     <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-xs uppercase font-semibold text-muted-foreground">Work Email</Label>
                          <FormControl>
                            <Input placeholder="john@company.com" {...field} className="bg-background/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="currentRole"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-xs uppercase font-semibold text-muted-foreground">Current Role</Label>
                        <FormControl>
                          <Input placeholder="e.g. Independent Pharma Rep" {...field} className="bg-background/50" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="region"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-xs uppercase font-semibold text-muted-foreground">Region</Label>
                          <FormControl>
                            <Input placeholder="e.g. Southeast" {...field} className="bg-background/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="relationships"
                      render={({ field }) => (
                        <FormItem>
                          <Label className="text-xs uppercase font-semibold text-muted-foreground"># of Providers</Label>
                          <FormControl>
                            <Input placeholder="Est. count" {...field} className="bg-background/50" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="focus"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-xs uppercase font-semibold text-muted-foreground">Current Focus</Label>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50">
                              <SelectValue placeholder="Select primary focus" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pharma">Pharma</SelectItem>
                            <SelectItem value="device">Med Device</SelectItem>
                            <SelectItem value="home_health">Home Health</SelectItem>
                            <SelectItem value="billing">Billing / RCM</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="availability"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-xs uppercase font-semibold text-muted-foreground">Availability</Label>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50">
                              <SelectValue placeholder="Select availability" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="part_time">Part-time</SelectItem>
                            <SelectItem value="full_time">Full-time</SelectItem>
                            <SelectItem value="side_by_side">Side-by-side with current job</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="addingToBusiness"
                    render={({ field }) => (
                      <FormItem>
                        <Label className="text-xs uppercase font-semibold text-muted-foreground">Adding CCM to Business?</Label>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-background/50">
                              <SelectValue placeholder="Select an option" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="existing">Yes—existing clinics</SelectItem>
                            <SelectItem value="new">Yes—new clinic prospecting</SelectItem>
                            <SelectItem value="both">Both</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full h-11 text-base font-semibold mt-2 shadow-md">
                    Submit Application
                  </Button>
                </form>
              </Form>
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
      lead: "Make the introduction—we handle the heavy lift.",
      body: "LOGIC takes it from first call to signed agreement, then runs onboarding and go-live with a dedicated implementation team. No 40-hour hand-holding and minimal disruption to day-to-day clinic operations—so you're not pulled into delivery to make the account successful.",
      bullets: [
        "LOGIC-led discovery, demo, proposal, and contracting",
        "LOGIC-led onboarding and go-live (you're not the project manager)",
        "Minimal disruption to day-to-day clinic workflows"
      ]
    },
    {
      title: "Clinical and Financial Value-Add",
      lead: "Be the consultant your accounts remember.",
      body: "LOGIC helps practices and small hospitals improve care continuity and unlock sustainable revenue tied to active patient management—so you show up with a solution that impacts both outcomes and operations.",
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
              Designed for busy physician practices and small hospitals. Built for low-lift selling: LOGIC provides the deal support and operational engine that delivers measurable value—without adding workload to the clinic.
            </p>
          </div>

          {/* Hidden measurement divs for stable height */}
          <div className="fixed opacity-0 pointer-events-none -z-50">
            {pillars.map((pillar, i) => (
              <div key={i} ref={el => stageRefs.current[i] = el} className="w-[600px]">
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
      lead: "Healthcare requires confidence, not gray areas.",
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
            "Care management quickly became the most valuable service I offered my provider network. It delivered immediate profit to clinics with no upfront investment, no added staff, and minimal training. It also helped providers close care gaps, improve outcomes, and strengthen value-based care performance. Just as importantly, it increased utilization of other services and products I already supported while generating <span className="text-primary font-bold decoration-2 underline decoration-blue-200 underline-offset-4 whitespace-nowrap">recurring, residual income</span> for me."
          </blockquote>
          
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-slate-200" /> {/* Placeholder Avatar */}
            <div className="text-left">
              <div className="font-bold text-foreground">Kevin Donahower</div>
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
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-2">Stop leaving revenue on the table. Compare the traditional model to the care management opportunity.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 relative">

          {/* Divider Badge */}
          <div className="absolute left-1/2 top-0 -translate-x-1/2 -mt-2 z-10 hidden lg:flex">
             <div className="w-12 h-12 bg-background border-4 border-slate-50 rounded-full flex items-center justify-center shadow-sm">
                <ArrowRight className="text-muted-foreground" size={20} />
             </div>
          </div>

          {/* Before */}
          <div className="space-y-6">
            <div className="text-center mb-8">
               <h3 className="text-2xl font-bold text-slate-700 tracking-tight">Before Care Management</h3>
            </div>

            {[
              { icon: MultiColorX, title: "One-off commissions", desc: "Revenue tied to monthly product/service volume", color: "" },
              { icon: MultiColorKey, title: "Clinic opportunities go undiscovered", desc: "Multiple opportunities for revenue go undiscovered each month in each clinic you already visit", color: "" },
              { icon: MultiColorClock, title: "Low Leverage", desc: "Usually requires the provider to identity a need", color: "" },
            ].map((item, i) => (
              <Card key={i} className="border-border/60 bg-white/50 shadow-none hover:shadow-sm transition-shadow">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="mt-1">
                    <ColorfulIcon icon={item.icon} colorClass={item.color} size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* After */}
          <div className="space-y-6">
            <div className="text-center mb-8">
               <h3 className="text-2xl font-bold text-primary tracking-tight">With Care Management</h3>
            </div>

             {[
              { icon: MultiColorDollar, title: "Recurring commissions for enrolled patients", desc: "Each month, for each patient", color: "" },
              { icon: MultiColorUsers, title: "Stronger provider relationships", desc: "drives provider revenue and solves daily operational pain points", color: "" },
              { icon: MultiColorBuilding, title: "Better visibility", desc: "Care team reports to the provider monthly, creating natural openings for your other services without constant drop-ins.", color: "" },
            ].map((item, i) => (
              <Card key={i} className="border-primary/20 bg-white shadow-sm ring-1 ring-primary/5 hover:ring-primary/20 transition-all">
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="mt-1">
                     <ColorfulIcon icon={item.icon} colorClass={item.color} size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground">{item.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed mt-1">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
      title: "Residual Commission",
      desc: "Earn recurring income as clinics grow their Care Management panel. Your check grows with the practice.",
      icon: MultiColorChart,
      color: ""
    },
    {
      title: "Unlimited Clinics",
      desc: "No cap on the number of practices you can enroll. Scale your book of business without limits.",
      icon: MultiColorBuilding,
      color: ""
    },
    {
      title: "Clinic-First Economics",
      desc: "Align with providers by driving new revenue for them and better outcomes for patients.",
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
    "Clinic A launches CCM with 40 patients",
    "Your commission from Clinic C updated: +$450",
    "New independent clinic added to pipeline",
    "Clinic B enrolled 10 new CCM patients",
    "Monthly payout processed: $2,400",
    "Dr. Smith approved program expansion",
    "Clinic D onboarding scheduled",
    "Patient adherence rate hit 95%",
    "Recurring revenue verified for Q3",
    "Referral bonus applied to account",
  ];

  return (
    <section className="py-20 overflow-hidden bg-slate-900 text-slate-50 relative">
      <div className="container-padding mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6">
            Real-Time Revenue Signals
          </h2>
          <p className="text-lg text-slate-400 mb-8 leading-relaxed">
            Stay plugged into your portfolio's performance. Watch your clinics activate, patients enroll, and your monthly recurring commission grow in real-time.
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
              <span className="font-medium">Cross-sell CCM on your existing clinic calls</span>
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
              <div className="text-lg md:text-xl font-medium text-slate-900 leading-relaxed mb-6">
                "CCM has transformed how we care for chronic patients. We catch issues before they escalate and patients feel genuinely supported between visits."
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-200 text-indigo-700 font-bold flex items-center justify-center text-sm">SM</div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900 text-sm">Dr. Sarah Martinez</div>
                  <div className="text-xs text-slate-600">Medical Director</div>
                </div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:block">Coastal Family Medicine</div>
              </div>
           </div>

           {/* Row 2 */}
           <div className="bg-white rounded-3xl p-8 md:col-span-2 shadow-sm border border-slate-100 flex flex-col justify-between h-full min-h-[200px]">
              <div className="text-lg md:text-xl font-medium text-slate-900 leading-relaxed mb-6">
                "Adding CCM to my portfolio was the best decision. It's a natural fit when calling on independent clinics—they see the patient impact immediately."
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-600 font-bold flex items-center justify-center text-sm">MT</div>
                <div className="flex-1">
                  <div className="font-bold text-slate-900 text-sm">Marcus Thompson</div>
                  <div className="text-xs text-slate-600">CCM Mission Rep</div>
                </div>
                <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide hidden sm:block">LOGIC Health</div>
              </div>
           </div>

           <div className="bg-emerald-100 rounded-3xl p-8 flex flex-col justify-between h-full min-h-[200px]">
              <div>
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1"><SlotNumber value="12" />×</div>
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
                <div className="text-4xl font-bold font-heading text-slate-900 mb-1">Industry-leading</div>
                <div className="text-slate-700 font-medium">Claim performance</div>
              </div>
              <div className="text-sm text-slate-600 font-medium">High clean-claim rates help unlock recurring revenue.</div>
           </div>

         </div>
      </div>
    </section>
  );
}

function WhoThrives() {
  const profiles = [
    { title: "Pharma Sales Reps", desc: "Leverage your frequent access to PCPs and specialists to introduce a high-value reimbursement program. Add CCM alongside your current portfolio.", icon: MultiColorStethoscope, color: "" },
    { title: "Medical Device Reps", desc: "Use the trust you've built with surgeons and specialists to improve peri-operative care and support high-risk patients between visits—within the practices you already serve.", icon: MultiColorActivity, color: "" },
    { title: "Home Health Reps", desc: "Bring care management to your referring-provider network. Our care team supports ongoing oversight and helps uncover home health opportunities.", icon: MultiColorBuilding, color: "" },
    { title: "Billing / RCM Reps", desc: "You're a trusted part of the practice's business team. Care management can increase clinic revenue and billable services while strengthening compliance and improving patient outcomes.", icon: MultiColorDollar, color: "" },
  ];

  return (
    <section className="py-20 bg-background" id="who-its-for">
      <div className="container-padding mx-auto">
        <div className="text-center mb-16">
           <h2 className="text-3xl lg:text-4xl font-bold font-heading">Who Thrives in This Role?</h2>
           <p className="text-muted-foreground mt-4">Best fit: reps already visiting clinics who want a simple add-on offer to cross-sell.</p>
        </div>

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
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="py-20 bg-slate-900 text-slate-50" id="how-it-works">
      <div className="container-padding mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6">Simple 3-Step Process</h2>
            <p className="text-slate-400 mb-8 text-lg">We keep it simple so you can focus on what you do best: opening doors and managing relationships.</p>
            <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-200 border-none font-bold">Start Process Now</Button>
          </div>
          
          <div className="space-y-8">
            {[
              { num: "01", title: "Apply & Qualify", desc: "Share your background, territory, and provider relationships to see if you're a fit." },
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
                   <div className="font-bold text-base mt-1">250 Chronic Management Patients</div>
                </div>
                <div className="text-right flex-shrink-0">
                   <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Est. Clinic Revenue</div>
                   <div className="font-bold text-green-600 text-lg mt-1">$50K - $75K / mo</div>
                </div>
             </div>
             <div className="bg-white p-5 rounded-xl shadow-sm border border-border/50 flex justify-between items-center gap-4">
                <div className="flex-1">
                   <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Clinic B (Medium)</div>
                   <div className="font-bold text-base mt-1">500 Chronic Management Patients</div>
                </div>
                <div className="text-right flex-shrink-0">
                   <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Est. Clinic Revenue</div>
                   <div className="font-bold text-green-600 text-lg mt-1">$100K - $150K / mo</div>
                </div>
             </div>

             <div className="pt-4 text-center">
                <div className="text-sm text-muted-foreground mb-1">Your Residual Commission</div>
                <div className="text-3xl font-bold text-primary">Recurring % of Revenue</div>
                <div className="text-xs text-muted-foreground mt-2">*Illustrative figures based on industry averages</div>
             </div>
          </Card>
        </div>

        <div className="order-1 lg:order-2">
           <h2 className="text-3xl lg:text-4xl font-bold font-heading mb-6">High-Upside Commission With Flexible Commitment.</h2>
           <div className="space-y-4">
             <div className="flex gap-3">
               <div className="w-6 h-6 rounded-full bg-blue-100 text-primary flex items-center justify-center shrink-0 mt-0.5"><CheckCircle2 size={14} /></div>
               <p className="text-lg text-muted-foreground">Commission-only with residual potential per enrolled clinic.</p>
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
  return (
    <section className="py-24 bg-slate-900 text-slate-50 text-center">
      <div className="container-padding mx-auto max-w-3xl">
        <h2 className="text-4xl lg:text-5xl font-bold font-heading mb-6 text-white">Ready to Add a New Revenue Stream?</h2>
        <p className="text-xl text-slate-300 mb-10">Use your existing clinic relationships to drive CCM revenue — and build a lasting residual income for yourself.</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" className="h-14 px-8 text-lg font-bold shadow-xl bg-white text-slate-900 hover:bg-slate-200 border-none">
            Apply to Be a CCM Revenue Rep
          </Button>
        </div>
        <button className="mt-8 text-sm font-medium text-slate-400 hover:text-white underline underline-offset-4 decoration-slate-600">
          Learn more about CCM
        </button>
      </div>
    </section>
  );
}

function FAQ() {
  const faqs = [
    { q: "Is this commission-only?", a: "Yes—1099 commission-only. No base salary." },
    { q: "Can I do this part-time?", a: "Yes—built for part-time or full-time." },
    { q: "Can I keep my current job?", a: "Yes—non-exclusive; designed to add to your bag." },
    { q: "Is this cross-sell friendly?", a: "Yes—ideal for reps with existing clinic relationships." },
  ];

  return (
    <section id="faq" className="py-20 bg-slate-50 border-t border-border">
      <div className="container-padding mx-auto max-w-3xl">
        <h2 className="text-3xl font-bold font-heading text-center mb-12">Frequently Asked Questions</h2>
        <div className="grid gap-6">
          {faqs.map((faq, i) => (
            <Card key={i} className="shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">{faq.q}</h3>
                <p className="text-muted-foreground">{faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-50 pt-20 pb-10 border-t border-border">
      <div className="container-padding mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
          <div className="col-span-2 lg:col-span-2">
            <div className="mb-6">
              <img src={logicLogo} alt="LOGIC Health" className="h-12 w-auto" />
            </div>
            <p className="text-muted-foreground text-sm max-w-xs mb-6">
              Empowering healthcare sales professionals to monetize their networks and improve patient care through Chronic Care Management.
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
              <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary">Contact Us</a></li>
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

// --- Main Page Component ---
export default function Home() {
  return (
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
      <FAQ />
      <Footer />
    </div>
  );
}
