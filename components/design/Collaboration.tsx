import { HTMLAttributes } from "react";
import { curve1, curve2 } from "@/public/assets";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CurveProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function RightCurve({ className, ...props }: CurveProps) {
  return (
    <div
      className={cn(
        "hidden absolute top-1/2 left-full w-[10.125rem] -mt-1 ml-10 pointer-events-none xl:block",
        className
      )}
      {...props}
    >
      <Image src={curve2} width={162} height={76} alt="Curve 2" />
    </div>
  );
}

function LeftCurve({ className, ...props }: CurveProps) {
  return (
    <div
      className={cn(
        "hidden absolute top-1/2 right-full w-[32.625rem] -mt-1 mr-10 pointer-events-none xl:block",
        className
      )}
      {...props}
    >
      <Image src={curve1} width={522} height={182} alt="Curve 1" />
    </div>
  );
}

export { RightCurve, LeftCurve };
