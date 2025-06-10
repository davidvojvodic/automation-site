import { gradient } from "@/public/assets";
import Image from "next/image";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface GradientProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function Gradient({ className, ...props }: GradientProps) {
  return (
    <div
      className={cn(
        "absolute top-[18.25rem] -left-[30.375rem] w-[56.625rem] opacity-60 mix-blend-color-dodge pointer-events-none",
        className
      )}
      {...props}
    >
      <div className="absolute top-1/2 left-1/2 w-[58.85rem] h-[58.85rem] -translate-x-3/4 -translate-y-1/2">
        <Image
          className="w-full"
          src={gradient}
          width={942}
          height={942}
          alt="Gradient"
        />
      </div>
    </div>
  );
}

export { Gradient };
