import { useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "./button";

interface FullPageTakeoverProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
}

/**
 * FullPageTakeover - A full-viewport overlay component
 *
 * Features:
 * - Full viewport coverage with solid/gradient background
 * - Scroll lock when open
 * - Focus trap for accessibility
 * - Escape key to close
 * - Framer Motion animations with reduced motion support
 * - Proper ARIA attributes
 */
export function FullPageTakeover({
  isOpen,
  onClose,
  title,
  description,
  children,
}: FullPageTakeoverProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const scrollPositionRef = useRef<number>(0);

  // Scroll lock effect
  useEffect(() => {
    if (isOpen) {
      // Store current scroll position
      scrollPositionRef.current = window.scrollY;

      // Lock body scroll
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.width = "100%";
    } else {
      // Unlock body scroll and restore position
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";

      // Restore scroll position
      window.scrollTo(0, scrollPositionRef.current);
    }

    return () => {
      // Cleanup on unmount
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  // Focus management
  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Focus the close button after animation
      const timer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 100);

      return () => clearTimeout(timer);
    } else {
      // Restore focus to previous element
      previousActiveElement.current?.focus();
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Focus trap
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key !== "Tab" || !containerRef.current) return;

      const focusableElements = containerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    },
    []
  );

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const contentVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
        exit: { opacity: 0 },
      }
    : {
        hidden: { opacity: 0, y: 40, scale: 0.98 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            type: "spring" as const,
            damping: 25,
            stiffness: 300,
          }
        },
        exit: {
          opacity: 0,
          y: 20,
          scale: 0.98,
          transition: {
            duration: 0.2,
          }
        },
      };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={containerRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="takeover-title"
          aria-describedby={description ? "takeover-description" : undefined}
          className="fixed inset-0 z-[100] flex items-start justify-center overflow-hidden"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: shouldReduceMotion ? 0.1 : 0.3 }}
          onKeyDown={handleKeyDown}
        >
          {/* Background */}
          <div className="absolute inset-0 bg-slate-950/95 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Subtle decorative elements */}
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-500/10 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-to-tr from-indigo-500/10 to-transparent pointer-events-none" />
          </div>

          {/* Close button - fixed position */}
          <Button
            ref={closeButtonRef}
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="fixed top-4 right-4 z-[101] h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-900"
            aria-label="Close application form"
          >
            <X className="h-6 w-6" />
          </Button>

          {/* Content container */}
          <motion.div
            className="relative z-10 w-full max-w-2xl mx-auto px-4 py-16 sm:py-20 max-h-screen overflow-y-auto overscroll-contain"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="text-center mb-8">
              <h2
                id="takeover-title"
                className="text-3xl sm:text-4xl font-bold font-heading text-white mb-3"
              >
                {title}
              </h2>
              {description && (
                <p
                  id="takeover-description"
                  className="text-lg text-slate-300 max-w-xl mx-auto"
                >
                  {description}
                </p>
              )}
            </div>

            {/* Form content */}
            <div className="relative">
              {/* Glow effect behind form */}
              <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-3xl blur-xl opacity-70" />

              {/* Form card */}
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
                {children}
              </div>
            </div>

            {/* Footer text */}
            <p className="text-center text-sm text-slate-400 mt-6">
              Independent contractor. Part-time friendly. Non-exclusive.
            </p>
            <address className="not-italic text-center text-xs text-slate-400 mt-3">
              LOGIC Health Management<br />
              5900 Balcones Dr. Suite 100<br />
              Austin, TX 78731<br />
              Email: partners@ccm-logichm.com
            </address>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
