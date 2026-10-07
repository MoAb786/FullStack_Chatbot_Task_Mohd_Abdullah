import React, { useState } from 'react';
import type { Enquiry, EnquiryStatus } from '../../types';
import { StatusBadge } from './StatusBadge';

interface EnquiryDetailModalProps {
  enquiry: Enquiry | null;
  isOpen: boolean;
  onClose: () => void;
  onStatusChange: (id: string, newStatus: EnquiryStatus) => Promise<void>;
  onDelete: (id: string) => void;
}

export const EnquiryDetailModal: React.FC<EnquiryDetailModalProps> = ({
  enquiry,
  isOpen,
  onClose,
  onStatusChange,
  onDelete,
}) => {
  const [updating, setUpdating] = useState(false);

  if (!isOpen || !enquiry) return null;

  const handleStatusSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value as EnquiryStatus;
    try {
      setUpdating(true);
      await onStatusChange(enquiry._id, newStatus);
    } finally {
      setUpdating(false);
    }
  };

  const formattedDate = new Date(enquiry.createdAt).toLocaleString('en-IN', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-2xl bg-surface-container-lowest border border-hairline rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-hairline bg-surface-container-low">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-canvas">
              <span className="material-symbols-outlined text-[18px]">person</span>
            </div>
            <div>
              <h3 className="text-[16px] font-semibold text-ink">{enquiry.name}</h3>
              <p className="text-[12px] text-mute">
                Enquiry ID: <span className="font-mono text-body">{enquiry._id}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-mute hover:text-ink hover:bg-surface-container rounded-md transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Top Status & Meta Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-lg bg-surface-container-low border border-hairline">
            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-mute block mb-1">
                Current Status
              </label>
              <div className="flex items-center gap-2">
                <StatusBadge status={enquiry.status} />
                <select
                  value={enquiry.status}
                  onChange={handleStatusSelect}
                  disabled={updating}
                  className="text-[12px] font-medium border border-hairline bg-surface-container-lowest rounded-md px-2 py-1 text-ink focus:outline-hidden focus:ring-1 focus:ring-ink cursor-pointer"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono uppercase tracking-wider text-mute block mb-1">
                Submitted At
              </label>
              <p className="text-[13px] font-medium text-ink">{formattedDate}</p>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-3.5 border border-hairline rounded-lg bg-surface-container-lowest">
              <span className="text-[11px] font-mono uppercase tracking-wider text-mute block mb-1">
                Email Address
              </span>
              <a
                href={`mailto:${enquiry.email}`}
                className="text-[14px] font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">mail</span>
                <span className="truncate">{enquiry.email}</span>
              </a>
            </div>

            <div className="p-3.5 border border-hairline rounded-lg bg-surface-container-lowest">
              <span className="text-[11px] font-mono uppercase tracking-wider text-mute block mb-1">
                Phone Number
              </span>
              <a
                href={`tel:${enquiry.phone}`}
                className="text-[14px] font-medium text-ink hover:text-blue-600 transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">call</span>
                <span>{enquiry.phone}</span>
              </a>
            </div>

            <div className="p-3.5 border border-hairline rounded-lg bg-surface-container-lowest">
              <span className="text-[11px] font-mono uppercase tracking-wider text-mute block mb-1">
                User Type
              </span>
              <span className="inline-flex items-center px-2 py-0.5 rounded text-[12px] font-medium bg-surface-container-low text-ink border border-hairline">
                {enquiry.userType}
              </span>
            </div>

            <div className="p-3.5 border border-hairline rounded-lg bg-surface-container-lowest">
              <span className="text-[11px] font-mono uppercase tracking-wider text-mute block mb-1">
                Area of Interest
              </span>
              <span className="text-[13px] font-medium text-ink">
                {enquiry.interest}
              </span>
            </div>
          </div>

          {/* Enquiry Message */}
          <div className="space-y-1.5">
            <label className="text-[11px] font-mono uppercase tracking-wider text-mute block">
              Enquiry Message
            </label>
            <div className="p-4 rounded-lg bg-surface-container-low border border-hairline text-[14px] text-ink leading-relaxed whitespace-pre-wrap">
              {enquiry.message}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-hairline bg-surface-container-low">
          <button
            onClick={() => onDelete(enquiry._id)}
            className="inline-flex items-center gap-1 px-3 py-1.5 text-[13px] font-medium text-red-600 dark:text-red-400 hover:bg-red-500/10 rounded-md transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">delete</span>
            Delete Enquiry
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-[13px] font-medium text-body bg-surface-container-lowest border border-hairline hover:bg-surface-container rounded-md transition-colors"
            >
              Close
            </button>
            <a
              href={`mailto:${enquiry.email}?subject=Regarding your DroneTV Enquiry: ${encodeURIComponent(enquiry.interest)}`}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 text-[13px] font-medium text-canvas bg-ink hover:opacity-90 rounded-md transition-opacity shadow-xs"
            >
              <span className="material-symbols-outlined text-[16px]">send</span>
              Reply by Email
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
