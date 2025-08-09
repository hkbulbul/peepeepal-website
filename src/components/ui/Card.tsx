import React from 'react';
import { cn } from '@/lib/utils';
import { CardProps } from '@/types';

const Card: React.FC<CardProps> = ({
  children,
  className,
  hover = false,
  ...props
}) => {
  const baseClasses = 'bg-white rounded-2xl shadow-md border border-gray-100 p-6';
  const hoverClasses = hover ? 'hover:shadow-xl hover:scale-105 transition-all duration-300 cursor-pointer' : '';
  
  return (
    <div
      className={cn(
        baseClasses,
        hoverClasses,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;