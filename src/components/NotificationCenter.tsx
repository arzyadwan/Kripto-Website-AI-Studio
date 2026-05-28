import { useEffect, useState } from 'react';
import { NotificationItem, Article } from '../types';
import { Bell, BellOff, X, Sparkles, Flame, Sliders, ChevronRight } from 'lucide-react';

interface NotificationCenterProps {
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
  isOpen: boolean;
  onClose: () => void;
  onSelectArticleById: (id: string) => void;
}

export default function NotificationCenter({
  notifications,
  onMarkAsRead,
  onClearAll,
  isOpen,
  onClose,
  onSelectArticleById
}: NotificationCenterProps) {
  
  if (!isOpen) return null;

  const handleNotificationClick = (notif: NotificationItem) => {
    onMarkAsRead(notif.id);
    if (notif.linkId) {
      onSelectArticleById(notif.linkId);
    }
    onClose();
  };

  return (
    <div id="notification-sidebar-overlay" className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm animate-fadeIn">
      {/* Outside click closer */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Slide Drawer Panel */}
      <div 
        id="notification-sidebar"
        className="relative w-full max-w-sm bg-white text-zinc-950 border-l border-zinc-200 shadow-2xl h-full flex flex-col dark:bg-zinc-950 dark:text-zinc-50 dark:border-zinc-800 animate-slideLeft duration-300"
      >
        {/* Header bar */}
        <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-850 bg-zinc-50 dark:bg-zinc-900/60">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-500" />
            <h3 className="font-display font-black text-sm uppercase tracking-wider">
              Pemberitahuan
            </h3>
            <span className="bg-amber-400 text-zinc-90 w-5 h-5 flex items-center justify-center rounded-full text-[10px] font-bold text-zinc-950">
              {notifications.filter(n => !n.read).length}
            </span>
          </div>

          <button
            id="close-notifications-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Action Row */}
        {notifications.length > 0 && (
          <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-850 flex justify-between items-center text-[11px]">
            <span className="text-zinc-550 dark:text-zinc-400">Riwayat Berita Terkini</span>
            <button
              id="clear-all-notif-btn"
              onClick={onClearAll}
              className="text-amber-500 hover:underline font-bold transition-colors cursor-pointer"
            >
              Hapus Semua
            </button>
          </div>
        )}

        {/* Notification listing */}
        <div id="notifications-list" className="flex-grow p-4 overflow-y-auto space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="p-3 bg-zinc-105 dark:bg-zinc-900 inline-flex rounded-full text-zinc-400">
                <BellOff className="w-6 h-6" />
              </div>
              <p className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Belum ada notifikasi push terkirim
              </p>
              <p className="text-[10px] text-zinc-400 max-w-[200px] mx-auto">
                Notifikasi push terupdate akan muncul di sini secara periodik saat berita baru rilis!
              </p>
            </div>
          ) : (
            notifications.map(notif => {
              return (
                <div
                  id={`notif-${notif.id}`}
                  key={notif.id}
                  onClick={() => handleNotificationClick(notif)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer select-none text-left flex gap-3 ${
                    notif.read
                      ? 'bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900/40 dark:border-zinc-850/50 dark:text-zinc-300'
                      : 'bg-amber-100/40 hover:bg-amber-130/50 border-amber-400/40 shadow-sm text-zinc-950 dark:bg-amber-950/20 dark:border-amber-400/20 dark:text-zinc-100'
                  }`}
                >
                  {/* Category icon */}
                  <div className="shrink-0 pt-0.5">
                    {notif.type === 'news' && (
                      <div className="p-1.5 bg-amber-400 rounded-lg text-zinc-950 border border-zinc-950/10">
                        <Flame className="w-3.5 h-3.5" />
                      </div>
                    )}
                    {notif.type === 'analysis' && (
                      <div className="p-1.5 bg-blue-500 rounded-lg text-white">
                        <Sliders className="w-3.5 h-3.5" />
                      </div>
                    )}
                    {notif.type === 'price' && (
                      <div className="p-1.5 bg-emerald-500 rounded-lg text-white">
                        <Sparkles className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>

                  {/* Body elements */}
                  <div className="flex-grow space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono font-bold tracking-wider uppercase text-amber-500">
                        {notif.type === 'news' ? 'Kabar Hot' : notif.type === 'analysis' ? 'Sifat Analisis' : 'Update Harga'}
                      </span>
                      <span className="text-[9px] text-zinc-500 font-mono">
                        {notif.time}
                      </span>
                    </div>
                    <div className="font-display font-extrabold text-xs leading-snug">
                      {notif.title}
                    </div>
                    <p className="text-[11px] text-zinc-650 dark:text-zinc-300 line-clamp-2 leading-relaxed">
                      {notif.message}
                    </p>
                    
                    {notif.linkId && (
                      <div className="pt-2 flex items-center justify-end text-[10px] font-mono font-black text-amber-500 hover:underline gap-1">
                        <span>Baca Artikel</span>
                        <ChevronRight className="w-3 h-3" />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer info box */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-900 border-t border-zinc-200 dark:border-zinc-850 text-center text-[10px] text-zinc-500 leading-normal">
          Anda akan menerima pemberitahuan push langsung secara berkala agar tidak ketinggalan tren market crypto.
        </div>
      </div>
    </div>
  );
}
