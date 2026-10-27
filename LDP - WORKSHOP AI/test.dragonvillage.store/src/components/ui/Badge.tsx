import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'pink' | 'outline';
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'primary', className, ...props }) => {
  const variants = {
    primary: "bg-accent/10 text-accent border border-accent/20",
    pink: "bg-accent-pink/10 text-accent-pink border border-accent-pink/20",
    outline: "bg-transparent text-text-soft border border-gray-200",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
