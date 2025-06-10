import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type GradientLightProps = HTMLAttributes<HTMLDivElement>;

function GradientLight({ className, ...props }: GradientLightProps) {
  return (
    <div
      className={cn(
        "absolute top-0 left-1/4 w-full aspect-square bg-radial-gradient from-[#28206C] to-[#28206C]/0 to-70% pointer-events-none",
        className
      )}
      {...props}
    />
  );
}

export default GradientLight;
