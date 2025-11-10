import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div className={`bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 shadow-sm rounded-xl p-4 sm:p-6 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
