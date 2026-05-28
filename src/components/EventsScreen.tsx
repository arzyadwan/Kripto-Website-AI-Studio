import React, { useState } from 'react';
import { Calendar as CalendarIcon, MapPin, Users, Video, Award, ExternalLink, Ticket, CheckCircle } from 'lucide-react';
import { EventItem } from '../types';
import { MOCK_EVENTS } from '../data/mockData';

interface EventsScreenProps {
  onAddNotification?: (title: string, message: string, type: 'news' | 'price' | 'analysis') => void;
}

export default function EventsScreen({ onAddNotification }: EventsScreenProps) {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [activeTypeFilter, setActiveTypeFilter] = useState<string | null>(null);
  const [showFormModal, setShowFormModal] = useState<EventItem | null>(null);
  const [registrantEmail, setRegistrantEmail] = useState('');

  // Local event states to update count dynamically upon registering
  const [eventsList, setEventsList] = useState<EventItem[]>(MOCK_EVENTS);

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showFormModal || !registrantEmail) return;

    const eventId = showFormModal.id;
    setRegisteredEvents(prev => [...prev, eventId]);

    // Update registration count
    setEventsList(current => current.map(evt => {
      if (evt.id === eventId) {
        return { ...evt, registeredCount: evt.registeredCount + 1 };
      }
      return evt;
    }));

    if (onAddNotification && showFormModal) {
      onAddNotification(
        'Tiket Terdaftar! 🎟️',
        `Pendaftaran berhasil untuk acara "${showFormModal.title}". Link akses zoom kami kirimkan ke ${registrantEmail}. Sampai berjumpa di sana!`,
        'news'
      );
    }

    setShowFormModal(null);
    setRegistrantEmail('');
  };

  const filteredEvents = activeTypeFilter 
    ? eventsList.filter(e => e.type === activeTypeFilter)
    : eventsList;

  return (
    <div id="events-screen" className="space-y-8 animate-fade-in">
      
      {/* Intro header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-400/10 text-amber-500 border border-amber-400/20 uppercase tracking-widest">
          <CalendarIcon className="w-3.5 h-3.5" />
          <span>Kanal Acara Kriptokini</span>
        </div>
        <h1 className="font-display font-black text-2xl sm:text-3.5xl tracking-tight leading-none text-zinc-900 dark:text-zinc-50">
          Ikuti Acara, Meetup & Webinar Kripto Terkini
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl leading-normal">
          Dapatkan wawasan berharga langsung dari para ahli blockchain, developer Solidity senior, dan investor institusi. Daftarkan diri Anda dan dapatkan sertifikat kehadiran digital (POAP/NFT).
        </p>
      </div>

      {/* Categories Filter tab */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase mr-2 tracking-wider">Kategori:</span>
        <button
          onClick={() => setActiveTypeFilter(null)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeTypeFilter === null
              ? 'bg-zinc-950 text-white dark:bg-amber-400 dark:text-zinc-950'
              : 'bg-white border border-zinc-200 text-zinc-655 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300'
          }`}
        >
          Semua Acara
        </button>
        {['Webinar', 'Meetup', 'AMA'].map(type => (
          <button
            key={type}
            onClick={() => setActiveTypeFilter(type)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeTypeFilter === type
                ? 'bg-zinc-950 text-white dark:bg-amber-400 dark:text-zinc-950'
                : 'bg-white border border-zinc-200 text-zinc-655 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-805 dark:text-zinc-300'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Grid displays */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(evt => {
          const isRegistered = registeredEvents.includes(evt.id);
          return (
            <div
              key={evt.id}
              className="bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-800 rounded-2xl p-5 shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_rgba(251,191,36,0.1)] flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`px-2.5 py-0.5 rounded text-[9px] font-mono font-black uppercase tracking-wider ${
                    evt.type === 'Webinar' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/40 dark:text-indigo-400' :
                    evt.type === 'Meetup' ? 'bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400' :
                    'bg-pink-105 text-pink-700 dark:bg-pink-950/40 dark:text-pink-400'
                  }`}>
                    {evt.type}
                  </span>
                  
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-zinc-400">
                    <Users className="w-3.5 h-3.5" />
                    <span>{evt.registeredCount} Peserta</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-display font-black text-base text-zinc-955 dark:text-zinc-50 leading-tight">
                    {evt.title}
                  </h3>
                  
                  <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-normal line-clamp-3">
                    {evt.description}
                  </p>
                </div>

                {/* Event Host Details */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-zinc-500 font-bold">
                    <CalendarIcon className="w-3.5 h-3.5 text-zinc-450 shrink-0" />
                    <span className="truncate">{evt.date}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-xs text-zinc-550 font-bold dark:text-zinc-300">
                    {evt.type === 'Webinar' || evt.type === 'AMA' ? (
                      <Video className="w-3.5 h-3.5 text-zinc-450 shrink-0" />
                    ) : (
                      <MapPin className="w-3.5 h-3.5 text-zinc-450 shrink-0" />
                    )}
                    <span className="truncate">{evt.location}</span>
                  </div>

                  <p className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-500">
                    🎤 narasumber: {evt.speaker}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-4 mt-5 border-t border-zinc-100 dark:border-zinc-800">
                {isRegistered ? (
                  <div className="flex items-center gap-1.5 justify-center py-2 rounded-xl bg-emerald-500/10 dark:bg-emerald-950/20 text-emerald-500 border border-emerald-500 border-dashed text-xs font-black uppercase tracking-wider">
                    <CheckCircle className="w-4 h-4 fill-current text-emerald-500" />
                    <span>Terdaftar (Tiket Aktif)</span>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowFormModal(evt)}
                    className="w-full py-2.5 rounded-xl bg-amber-400 text-zinc-950 border-2 border-zinc-950 font-display font-black text-xs shadow-[3px_3px_0_#000] cursor-pointer hover:bg-amber-350 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Ticket className="w-4 h-4 text-zinc-950" />
                    <span>Registrasi Acara</span>
                  </button>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* QUICK EMAIIL REGISTRATION POPUP */}
      {showFormModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/65 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-800 rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 relative text-zinc-900 dark:text-zinc-100">
            <button
              onClick={() => setShowFormModal(null)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white font-black text-lg cursor-pointer bg-zinc-100 dark:bg-zinc-800 w-7 h-7 rounded-full flex items-center justify-center"
            >
              ×
            </button>

            <div className="space-y-1">
              <span className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-widest">{showFormModal.type} • RSVP</span>
              <h3 className="font-display font-black text-base text-zinc-950 dark:text-white leading-tight">
                {showFormModal.title}
              </h3>
              <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{showFormModal.date}</p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-mono font-black uppercase text-zinc-450 block">Masukkan Email untuk Tiket</label>
                <input
                  type="email"
                  required
                  placeholder="name@gmail.com"
                  value={registrantEmail}
                  onChange={e => setRegistrantEmail(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 outline-none focus:border-amber-400 text-zinc-900 dark:text-white"
                />
                <span className="text-[9px] text-zinc-400 block pt-0.5">Sertifikat kehadiran akan diberikan lewat email setelah kegiatan selesai.</span>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-400 text-zinc-950 font-display font-black text-xs rounded-xl border-2 border-zinc-950 shadow-[3px_3px_0_#000] cursor-pointer"
              >
                Klaim Tiket Gratis Sekarang
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
