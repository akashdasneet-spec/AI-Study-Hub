import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export function GlassCard({ children, className = '' }: CardProps) {
  return (
    <div
      className={`backdrop-blur-xl bg-white/10 dark:bg-slate-900/40 border border-white/20 dark:border-slate-800/80 rounded-2xl p-6 shadow-2xl transition-all duration-300 hover:border-indigo-500/50 hover:shadow-indigo-500/10 ${className}`}
    >
      {children}
    </div>
  );
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  children: React.ReactNode;
}

export function GradientButton({ variant = 'primary', children, className = '', ...props }: ButtonProps) {
  const base =
    'px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2';
  const variants = {
    primary:
      'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-600 hover:to-pink-600 text-white shadow-indigo-500/25 hover:shadow-indigo-500/40',
    secondary:
      'bg-slate-800 hover:bg-slate-700 text-slate-100 border border-slate-700',
    outline:
      'bg-transparent hover:bg-white/10 text-indigo-400 border border-indigo-500/30 hover:border-indigo-500',
    danger:
      'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-rose-500/25 hover:shadow-rose-500/40',
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
