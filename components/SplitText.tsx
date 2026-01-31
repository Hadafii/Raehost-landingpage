"use client";
import React, { useRef, useLayoutEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText as GSAPSplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

export interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string | ((t: number) => number);
  splitType?: "chars" | "words" | "lines" | "words, chars";
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: React.CSSProperties["textAlign"];
  onLetterAnimationComplete?: () => void;
  initialDelay?: number; // New prop for delay before animation starts
}

const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = "",
  delay = 100,
  duration = 0.6,
  ease = "elastic.out(1, 0.3)",
  splitType = "chars",
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = "-100px",
  textAlign = "center",
  onLetterAnimationComplete,
  initialDelay = 0, // Default 500ms delay before animation starts
}) => {
  const ref = useRef<HTMLParagraphElement>(null);
  const animationCompletedRef = useRef(false); // Track if animation has completed
  const timelineRef = useRef<gsap.core.Timeline | null>(null); // Store timeline reference
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    const el = ref.current;

    if (!el || animationCompletedRef.current) return; // Don't re-run if already completed

    const absoluteLines = splitType === "lines";

    if (absoluteLines) el.style.position = "relative";

    const splitter = new GSAPSplitText(el, {
      type: splitType,
      absolute: absoluteLines,
      linesClass: "split-line",
    });

    let targets: Element[];

    switch (splitType) {
      case "lines":
        targets = splitter.lines;
        break;
      case "words":
        targets = splitter.words;
        break;
      case "words, chars":
        targets = [...splitter.words, ...splitter.chars];
        break;
      default:
        targets = splitter.chars;
    }

    targets.forEach((t) => {
      (t as HTMLElement).style.willChange = "transform, opacity";
    });

    // Set initial state immediately after SplitText
    gsap.set(targets, { ...from, immediateRender: true, force3D: true });

    // Mark as ready and show element
    setIsReady(true);

    const startPct = (1 - threshold) * 100;
    const m = /^(-?\d+)px$/.exec(rootMargin);
    const raw = m ? parseInt(m[1], 10) : 0;
    const sign = raw < 0 ? `-=${Math.abs(raw)}px` : `+=${raw}px`;
    const start = `top ${startPct}%${sign}`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start,
        toggleActions: "play none none none", // Only play once, no reverse/restart
        once: true, // Ensures ScrollTrigger only fires once
      },
      delay: initialDelay, // Add initial delay before animation starts
      smoothChildTiming: true,
      onComplete: () => {
        // Mark animation as completed
        animationCompletedRef.current = true;

        // Set final state permanently
        gsap.set(targets, {
          ...to,
          clearProps: "willChange", // Clean up will-change for performance
          immediateRender: true,
        });

        // Call the callback if provided
        if (onLetterAnimationComplete) {
          onLetterAnimationComplete();
        }

        // Clean up timeline reference
        timelineRef.current = null;
      },
    });

    // Store timeline reference
    timelineRef.current = tl;

    tl.to(targets, {
      ...to,
      duration,
      ease,
      stagger: delay / 1000,
      force3D: true,
    });

    return () => {
      // Only clean up if animation hasn't completed
      if (!animationCompletedRef.current) {
        tl.kill();
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === el) t.kill();
        });
        gsap.killTweensOf(targets);
        splitter.revert();
      } else {
        // If animation completed, just clean up ScrollTrigger
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === el) t.kill();
        });
      }
    };
  }, [
    text,
    delay,
    duration,
    ease,
    splitType,
    from,
    to,
    threshold,
    rootMargin,
    onLetterAnimationComplete,
    initialDelay,
  ]);

  return (
    <p
      ref={ref}
      className={`split-parent inline-block whitespace-normal ${className}`}
      style={{
        textAlign,
        wordWrap: "break-word",
        visibility: isReady ? "visible" : "hidden",
      }}
    >
      {text}
    </p>
  );
};

export default SplitText;
