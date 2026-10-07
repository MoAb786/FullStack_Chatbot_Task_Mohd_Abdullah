import React from 'react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
  itemLabel?: string;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
  itemLabel = 'this enquiry',
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in duration-150">
      <div
        className="relative w-full max-w-md bg-surface-container-lowest border border-hairline rounded-xl shadow-2xl p-6 space-y-4 animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-500/15 text-red-600 dark:text-red-400">
            <span className="material-symbols-outlined text-[22px]">warning</span>
          </div>
          <div>
            <h3 className="text-[16px] font-semibold text-ink">Confirm Deletion</h3>
            <p className="text-[13px] text-mute">This action cannot be undone.</p>
          </div>
        </div>

        <p className="text-[14px] text-body">
          Are you sure you want to permanently delete <strong className="text-ink">{itemLabel}</strong>?
        </p>

        <div className="flex items-center justify-end gap-2.5 pt-2">
          <button
            type="button"
            onClick={onClose}
            disabled={isDeleting}
            className="px-4 py-2 text-[13px] font-medium text-body bg-surface-container-lowest border border-hairline hover:bg-surface-container rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-[13px] font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors shadow-xs disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <span className="inline-block h-3.5 w-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Deleting...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined text-[16px]">delete</span>
                Delete Permanently
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
