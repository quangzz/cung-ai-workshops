import React from 'react';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  align?: 'left' | 'center';
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ eyebrow, title, subtitle, className, titleClassName, subtitleClassName, align = 'center' }) => {
  return (
    <div className={cn("flex flex-col gap-4", align === 'center' ? "items-center text-center" : "items-start text-left", className)}>
      {eyebrow && (
        <span className="text-accent font-bold tracking-wider uppercase text-sm md:text-base">
          {eyebrow}
        </span>
      )}
      <h2 className={cn("text-2xl md:text-4xl lg:text-5xl font-black text-gradient leading-tight", titleClassName)}>
        {title}
      </h2>
      {subtitle && (
        <p className={cn("text-text-soft mt-2 max-w-2xl text-lg", subtitleClassName)}>
          {subtitle}
        </p>
      )}
      <div className={cn("h-1 w-24 rounded-full bg-gradient-to-r from-accent to-transparent mt-4", align === 'center' ? "mx-auto" : "ml-0")} />
    </div>
  );
};
