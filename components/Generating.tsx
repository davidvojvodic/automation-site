"use client";

import React, { HTMLAttributes } from "react";
import { loading } from "@/public/assets";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {useTranslations} from 'next-intl';

export interface GeneratingProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Generating({ className, ...props }: GeneratingProps) {
  const t = useTranslations('HomePage.hero');
  
  return (
    <div
      className={cn(
        "flex items-center h-[3.5rem] px-6 bg-n-8/80 rounded-[1.7rem] text-base",
        className
      )}
      {...props}
    >
      <Image className="w-5 h-5 mr-4" src={loading} alt="Loading" />
      {t('generating')}
    </div>
  );
}

export default Generating;
