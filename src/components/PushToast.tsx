import { Bell, X, ArrowRight, Play } from 'lucide-react';
import { NotificationItem } from '../types';

interface PushToastProps {
  notification: NotificationItem | null;
  onClose: () => void;
  onAction: (linkId: string) => void;
}

export default function PushToast({ notification, onClose, onAction }: PushToastProps) {
  if (!notification) return null;

  return (
    <div 
      id="push-toast-modal" 
      className="fixed bottom-6 right-6 z-55 max-w-sm w-full bg-zinc-950 text-white rounded-2xl border-2 border-amber-400 p-4 shadow-[0_4px_20px_rgba(0,0,0,0.5)] dark:shadow-[0_4px_25px_rgba(251,191,36,0.3)] animate-bounceSlow"
    >
      <div className="flex gap-3">
        {/* Glowing live bell icon */}
        <div className="relative shrink-0 flex items-center justify-center w-9 h-9 rounded-full bg-amber-400 text-zinc-950">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60"></span>
          <Bell className="w-4 h-4 fill-current" />
        </div>

        {/* Content details */}
        <div className="flex-grow space-y-1 text-left">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-amber-400">
              Breaking News!
            </span>
            <button
              id="close-push-toast-btn"
              onClick={onClose}
              className="text-zinc-500 hover:text-white transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <h4 className="font-display font-black text-xs leading-snug">
            {notification.title}
          </h4>
          <p className="text-[11px] text-zinc-400 leading-relaxed line-clamp-2">
            {notification.message}
          </p>

          {notification.linkId && (
            <button
              id="push-toast-action-btn"
              onClick={() => {
                onAction(notification.linkId!);
                onClose();
              }}
              className="mt-2.5 flex items-center gap-1.5 text-[10px] font-bold font-mono text-zinc-950 bg-amber-400 hover:bg-amber-300 py-1.5 px-3 rounded-lg border border-zinc-950 shadow-[1.5px_1.5px_0_rgba(0,0,0,1)] transition-colors cursor-pointer"
            >
              <span>Baca Sekarang</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
