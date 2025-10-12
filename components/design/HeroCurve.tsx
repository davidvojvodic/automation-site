"use client";

import { useEffect, useRef } from "react";

interface HeroCurveProps {
  className?: string;
  delay?: number;
}

export function HeroCurve({ className = "", delay = 200 }: HeroCurveProps) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!pathRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    // Set up the starting positions
    path.style.strokeDasharray = `${length} ${length}`;
    path.style.strokeDashoffset = `${length}`;

    // Trigger the animation after delay
    const timer = setTimeout(() => {
      path.style.transition = "stroke-dashoffset 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
      path.style.strokeDashoffset = "0";
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <svg
      className={className}
      viewBox="-5 -5 634 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        ref={pathRef}
        d="M 0 22 Q 312 5 624 22"
        stroke="url(#curveGradient)"
        strokeWidth="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        style={{
          strokeDasharray: "1000 1000",
          strokeDashoffset: "1000"
        }}
      />
      <defs>
        <linearGradient id="curveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#AC6AFF" />
          <stop offset="50%" stopColor="#FFC876" />
          <stop offset="100%" stopColor="#FF776F" />
        </linearGradient>
      </defs>
    </svg>
  );
}
