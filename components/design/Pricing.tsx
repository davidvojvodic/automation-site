import { lines } from "@/public/assets";
import { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface LineProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function LeftLine({ className, ...props }: LineProps) {
  return (
    <div
      className={cn(
        "hidden lg:block absolute top-1/2 right-full w-[92.5rem] h-[11.0625rem] -translate-y-1/2 pointer-events-none",
        className
      )}
      {...props}
    >
      <Image
        className="w-full"
        src={lines}
        width={1480}
        height={177}
        alt="Lines"
      />
    </div>
  );
}

function RightLine({ className, ...props }: LineProps) {
  return (
    <div
      className={cn(
        "hidden lg:block absolute top-1/2 left-full w-[92.5rem] h-[11.0625rem] -translate-y-1/2 -scale-x-100 pointer-events-none",
        className
      )}
      {...props}
    >
      <Image
        className="w-full"
        src={lines}
        width={1480}
        height={177}
        alt="Lines"
      />
    </div>
  );
}

export { LeftLine, RightLine };
