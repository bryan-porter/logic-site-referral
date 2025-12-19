import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface SlotNumberProps {
  value: string;
  className?: string;
  duration?: number;
}

function SlotDigit({
  digit,
  animate,
  delay,
  duration
}: {
  digit: string;
  animate: boolean;
  delay: number;
  duration: number;
}) {
  const [hasAnimated, setHasAnimated] = useState(false);
  const digitNum = parseInt(digit, 10);

  // Each digit column contains 0-9 repeated 3 times, then final digit
  // This gives us enough "spins" to look like a slot machine
  const digits = [...Array(3)].flatMap(() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).concat(digitNum);
  const totalItems = digits.length;
  const targetIndex = totalItems - 1;

  useEffect(() => {
    if (animate && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [animate, hasAnimated]);

  const shouldAnimate = animate && hasAnimated;

  return (
    <span
      className="inline-block h-[1em] overflow-hidden relative"
      style={{ width: '0.6em' }}
    >
      <span
        className="inline-flex flex-col transition-transform"
        style={{
          transform: shouldAnimate
            ? `translateY(-${targetIndex * 100 / totalItems}%)`
            : 'translateY(0%)',
          transitionDuration: shouldAnimate ? `${duration}ms` : '0ms',
          transitionDelay: shouldAnimate ? `${delay}ms` : '0ms',
          transitionTimingFunction: 'cubic-bezier(0.15, 0.85, 0.35, 1)',
        }}
      >
        {digits.map((d, i) => (
          <span
            key={i}
            className="h-[1em] flex items-center justify-center tabular-nums"
            style={{ lineHeight: 1 }}
          >
            {d}
          </span>
        ))}
      </span>
    </span>
  );
}

export function SlotNumber({ value, className = "", duration = 900 }: SlotNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const shouldReduceMotion = useReducedMotion();
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (isInView && !hasTriggered) {
      setHasTriggered(true);
    }
  }, [isInView, hasTriggered]);

  // Parse the value to separate digits from non-digits
  const parts: { type: 'digit' | 'static'; value: string }[] = [];
  let currentDigits = '';

  for (const char of value) {
    if (/\d/.test(char)) {
      currentDigits += char;
    } else {
      if (currentDigits) {
        parts.push({ type: 'digit', value: currentDigits });
        currentDigits = '';
      }
      parts.push({ type: 'static', value: char });
    }
  }
  if (currentDigits) {
    parts.push({ type: 'digit', value: currentDigits });
  }

  // If reduced motion, just render the value directly
  if (shouldReduceMotion) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  // Calculate stagger delay - animate right to left for mechanical feel
  let digitIndex = 0;
  const totalDigits = value.replace(/\D/g, '').length;

  return (
    <span ref={ref} className={`inline-flex items-baseline tabular-nums ${className}`}>
      {parts.map((part, partIndex) => {
        if (part.type === 'static') {
          return <span key={partIndex}>{part.value}</span>;
        }

        // Render each digit in the number
        return (
          <span key={partIndex} className="inline-flex">
            {part.value.split('').map((digit, i) => {
              const currentDigitIndex = digitIndex++;
              // Right-to-left stagger: rightmost digit animates first
              const staggerDelay = (totalDigits - 1 - currentDigitIndex) * 80;
              // Add slight randomness for natural feel
              const randomOffset = Math.random() * 50;

              return (
                <SlotDigit
                  key={`${partIndex}-${i}`}
                  digit={digit}
                  animate={hasTriggered}
                  delay={staggerDelay + randomOffset}
                  duration={duration + Math.random() * 200}
                />
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
