import React from 'react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  href?: string;
  className?: string;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', href, className, children, ...props }, ref) => {
    const baseClass = "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300 ease-in-out cursor-pointer relative overflow-hidden";
    
    const variants = {
      primary: "cta-gradient text-cta-text px-10 py-3.5 text-base lg:text-lg hover:scale-105 hover:shadow-[0_8px_24px_rgba(124,58,237,0.35)] active:scale-95",
      outline: "bg-transparent text-accent px-8 py-3 text-sm lg:text-base border-2 border-accent hover:bg-accent/8 hover:border-accent-2 hover:shadow-[0_4px_16px_rgba(124,58,237,0.12)]",
    };

    const combinedClasses = cn(baseClass, variants[variant], className);

    if (href) {
      return (
        <Link href={href} className={combinedClasses}>
          {variant === 'primary' && (
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
          )}
          <span className="relative z-10 flex items-center gap-2">{children}</span>
        </Link>
      );
    }

    return (
      <button ref={ref} className={combinedClasses} {...props}>
        {variant === 'primary' && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
        )}
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';
