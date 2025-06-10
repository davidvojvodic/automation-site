"use client";
import { useEffect, useState } from "react";
import { MouseParallax } from "react-just-parallax";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import PlusSvg from "@/public/assets/svg/PlusSvg";

interface GradientProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function Gradient({ className, ...props }: GradientProps) {
  return (
    <div className={cn("", className)} {...props}>
      <div className="relative z-1 h-6 mx-2.5 bg-n-11 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-8" />
      <div className="relative z-1 h-6 mx-6 bg-n-11/70 shadow-xl rounded-b-[1.25rem] lg:h-6 lg:mx-20" />
    </div>
  );
}

interface BottomLineProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function BottomLine({ className, ...props }: BottomLineProps) {
  return (
    <div className={cn("", className)} {...props}>
      <div className="hidden absolute top-[55.25rem] left-10 right-10 h-0.25 bg-n-6 pointer-events-none xl:block" />
      <PlusSvg className="hidden absolute top-[54.9375rem] left-[2.1875rem] z-2 pointer-events-none xl:block" />
      <PlusSvg className="hidden absolute top-[54.9375rem] right-[2.1875rem] z-2 pointer-events-none xl:block" />
    </div>
  );
}

interface RingsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function Rings({ className, ...props }: RingsProps) {
  return (
    <div className={cn("", className)} {...props}>
      <div className="absolute top-1/2 left-1/2 w-[65.875rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[51.375rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[36.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/2 left-1/2 w-[23.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}

interface BackgroundCirclesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  parallaxRef: React.RefObject<HTMLDivElement | null>;
}

function BackgroundCircles({
  className,
  parallaxRef,
  ...props
}: BackgroundCirclesProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      className={cn(
        "absolute -top-[42.375rem] left-1/2 w-[78rem] aspect-square border border-n-2/5 rounded-full -translate-x-1/2 md:-top-[38.5rem] xl:-top-[32rem]",
        className
      )}
      {...props}
    >
      <Rings />

      <MouseParallax strength={0.07} parallaxContainerRef={parallaxRef}>
        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[46deg]">
          <div
            className={cn(
              "w-2 h-2 -ml-1 -mt-36 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out",
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[56deg]">
          <div
            className={cn(
              "w-4 h-4 -ml-1 -mt-32 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out",
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[54deg]">
          <div
            className={cn(
              "hidden w-4 h-4 -ml-1 mt-[12.9rem] bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full xl:block transit transition-transform duration-500 ease-out",
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[65deg]">
          <div
            className={cn(
              "w-3 h-3 -ml-1.5 mt-52 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out",
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom -rotate-[85deg]">
          <div
            className={cn(
              "w-6 h-6 -ml-3 -mt-3 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out",
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          />
        </div>

        <div className="absolute bottom-1/2 left-1/2 w-0.25 h-1/2 origin-bottom rotate-[70deg]">
          <div
            className={cn(
              "w-6 h-6 -ml-3 -mt-3 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full transition-transform duration-500 ease-out",
              mounted ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            )}
          />
        </div>
      </MouseParallax>
    </div>
  );
}

export { Gradient, BottomLine, BackgroundCircles };
