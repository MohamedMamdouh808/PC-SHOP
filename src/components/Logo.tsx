import { Link } from 'react-router-dom';
import { Icons } from './Icons';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showText = true, className = '' }: LogoProps) {
  const sizeClasses = {
    sm: {
      icon: 'p-2',
      iconSize: 20,
      text: 'text-lg',
      gap: 'gap-2'
    },
    md: {
      icon: 'p-2.5',
      text: 'text-xl',
      gap: 'gap-2'
    },
    lg: {
      icon: 'p-3',
      text: 'text-2xl',
      gap: 'gap-3'
    }
  };

  const { icon, text, gap } = sizeClasses[size];
  const iconSize = size === 'sm' ? 20 : size === 'md' ? 24 : 28;

  return (
    <Link to="/" className={`flex items-center ${gap} group ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-brand-primary/30 blur-lg rounded-full group-hover:bg-brand-primary/50 transition-all duration-500 animate-pulse" />
        <div className={`relative bg-brand-primary ${icon} rounded-xl border border-brand-secondary/30 transition-all duration-500 group-hover:rotate-[360deg] group-hover:border-brand-secondary/50 group-hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]`}>
          <Icons.Cpu className="text-white" size={iconSize} />
        </div>
      </div>
      {showText && (
        <span className={`${text} font-heading font-black tracking-tighter text-white uppercase italic`}>
          PC<span className="text-brand-secondary">SHOP</span>
        </span>
      )}
    </Link>
  );
}
