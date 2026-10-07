import React from 'react';
import type { EnquiryStatus } from '../../types';

interface StatusBadgeProps {
  status: EnquiryStatus;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-[11px]' : 'px-2.5 py-1 text-[12px]';

  switch (status) {
    case 'New':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 ${sizeClasses}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500" />
          New
        </span>
      );
    case 'Contacted':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 ${sizeClasses}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
          Contacted
        </span>
      );
    case 'In Progress':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-purple-500/10 text-purple-700 dark:text-purple-400 border border-purple-500/20 ${sizeClasses}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-purple-500" />
          In Progress
        </span>
      );
    case 'Closed':
      return (
        <span
          className={`inline-flex items-center gap-1.5 font-medium rounded-full bg-surface-container text-mute border border-hairline ${sizeClasses}`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-mute" />
          Closed
        </span>
      );
    default:
      return (
        <span
          className={`inline-flex items-center font-medium rounded-full bg-surface-container text-body ${sizeClasses}`}
        >
          {status}
        </span>
      );
  }
};
