import React, { ReactNode, MouseEvent } from "react";
import ButtonSvg from "@/public/assets/svg/ButtonSvg";
import { cn } from "@/lib/utils";

export interface ButtonProps {
  className?: string;
  href?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  children: ReactNode;
  px?: string;
  white?: boolean;
  disabled?: boolean;
}

export function Button({
  className,
  href,
  onClick,
  children,
  px,
  white,
  disabled,
}: ButtonProps) {
  const classes = cn(
    "button relative inline-flex items-center justify-center h-11 transition-colors hover:text-color-1",
    px ? px : "px-7",
    white ? "text-n-8" : "text-n-1",
    disabled && "opacity-50 cursor-not-allowed hover:text-current",
    className
  );
  const spanClasses = "relative z-10";

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        <span className={spanClasses}>{children}</span>
        {ButtonSvg(white)}
      </a>
    );
  }

  return (
    <button className={classes} onClick={onClick} disabled={disabled}>
      <span className={spanClasses}>{children}</span>
      {ButtonSvg(white)}
    </button>
  );
}

export default Button;
