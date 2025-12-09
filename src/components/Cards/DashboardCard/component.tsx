import Link from 'next/link';
import clsx from 'clsx';
import { Icon } from 'phosphor-react';

interface DashboardCardProps {
  href: string;
  icon: Icon;
  count?: number;
  label: string;
  variant?: 'light' | 'primary' | 'gradient';
  className?: string;
}

export const DashboardCard: React.FC<DashboardCardProps> = ({
  href,
  icon: IconComponent,
  count,
  label,
  variant = 'light',
  className,
}) => {
  const variantStyles = {
    light: 'bg-white text-gray-900 hover:shadow-2xl border border-indigo-100',
    primary: 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white hover:scale-105 shadow-xl',
    gradient: 'bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 text-white hover:scale-105 shadow-xl',
  };

  return (
    <Link
      href={href}
      className={clsx(
        'group relative overflow-hidden rounded-2xl p-6 transition-all duration-300',
        'flex flex-col items-center justify-center text-center',
        variantStyles[variant],
        className
      )}
    >
      {}
      {variant !== 'light' && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      )}

      {}
      <div className={clsx(
        'mb-4 p-4 rounded-2xl transition-all duration-300 group-hover:scale-110',
        variant === 'light' 
          ? 'bg-gradient-to-br from-indigo-100 to-purple-100' 
          : 'bg-white/20'
      )}>
        <IconComponent 
          size={32} 
          weight="fill" 
          className={variant === 'light' ? 'text-indigo-600' : 'text-white'}
        />
      </div>

      {}
      {count !== undefined && (
        <div className={clsx(
          'text-4xl font-bold mb-2',
          variant === 'light' ? 'text-gray-900' : 'text-white'
        )}>
          {count}
        </div>
      )}

      {}
      <span className={clsx(
        'font-medium text-sm leading-tight',
        variant === 'light' ? 'text-gray-600' : 'text-white/90'
      )}>
        {label}
      </span>

      {}
      {variant !== 'light' && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
        </div>
      )}
    </Link>
  );
};

