import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface RingsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function Rings({ className, ...props }: RingsProps) {
  return (
    <div
      className={cn(
        "absolute top-1/2 left-1/2 w-[51.375rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2",
        className
      )}
      {...props}
    >
      <div className="absolute top-1/2 left-1/2 w-[36.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute top-1/2 left-1/2 w-[23.125rem] aspect-square border border-n-2/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
    </div>
  );
}

interface SideLinesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function SideLines({ className, ...props }: SideLinesProps) {
  return (
    <div className={cn("", className)} {...props}>
      <div className="absolute top-0 left-5 w-0.25 h-full bg-n-6"></div>
      <div className="absolute top-0 right-5 w-0.25 h-full bg-n-6"></div>
    </div>
  );
}

interface BackgroundCirclesProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function BackgroundCircles({ className, ...props }: BackgroundCirclesProps) {
  return (
    <div className={cn("", className)} {...props}>
      <div className="absolute top-[4.4rem] left-16 w-3 h-3 bg-gradient-to-b from-[#DD734F] to-[#1A1A32] rounded-full"></div>
      <div className="absolute top-[12.6rem] right-16 w-3 h-3 bg-gradient-to-b from-[#B9AEDF] to-[#1A1A32] rounded-full"></div>
      <div className="absolute top-[26.8rem] left-12 w-6 h-6 bg-gradient-to-b from-[#88E5BE] to-[#1A1A32] rounded-full"></div>
    </div>
  );
}

interface HamburgerMenuProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function HamburgerMenu({ className, ...props }: HamburgerMenuProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 pointer-events-none lg:hidden",
        className
      )}
      {...props}
    >
      <Rings />
      <SideLines />
      <BackgroundCircles />
    </div>
  );
}

export { Rings, SideLines, BackgroundCircles, HamburgerMenu };
