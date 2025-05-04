import { FC, ReactNode } from 'react';
import React from 'react';
interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card: FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div
      className={`bg-white shadow-lg p-4 largescreen:p-7 h-full w-full rounded-md ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;