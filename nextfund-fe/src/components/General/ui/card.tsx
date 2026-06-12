import { CardProps } from '@/types/landing-page';
import React from 'react';

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  onClick,
  'aria-label': ariaLabel,
}) => {

  const hasCustomRounded = /rounded(-\[.*\]|-(none|sm|md|lg|xl|2xl|3xl|full))/i.test(className);
  const baseClasses = 'bg-white shadow-md';
  const roundedClass = hasCustomRounded ? '' : 'rounded-lg';
  const hoverClasses = hover ? 'hover:shadow-lg transition-shadow duration-200' : '';
  const clickableClasses = onClick ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseClasses} ${roundedClass} ${hoverClasses} ${clickableClasses} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
};