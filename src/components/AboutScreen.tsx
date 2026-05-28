import React, { useState } from 'react';
import { Info, HelpCircle, Shield, Globe, Award, Mail, MessageSquare, Heart } from 'lucide-react';

export default function AboutScreen() {
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [senderMessage, setSenderMessage] = useState('');

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderMessage) return;
    setFeedbackSent(true);
    setTimeout(() => {
      setFeedbackSent(false);
      setSenderName('');
      setSenderMessage('');
    }, 4000);
  };

  const team = [
    {
      name: 'Rama Wijaya',
      role: 'Pendiri & Analis Utama',
      bio: 'Mantan trader institusi komoditas dengan pengalaman riset pasar kripto & derivatif sejak 2017.',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop'
    },
    {
      name: 'Amelia Putri',
      role: 'Pemimpin Redaksi',
      bio: 'Jurnalis finansial senior dengan fokus khusus pada teknologi blockchain, Web3, dan keuangan makro.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop'
    },
    {
      name: 'Dian Nugraha',
      role: 'Kepala Regulasi & Hukum',
      bio: 'Ahli hukum tata kelola finansial komparatif, aktif memberikan advokasi edukasi hukum kripto di Indonesia.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop'
    }
  ];

  return (
    <div id="about-us-portal" className="space-y-8 animate-fade-in">
      
      {/* Visual Header Intro */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-400/10 text-amber-500 border border-amber-400/20 uppercase tracking-widest">
          <Info className="w-3.5 h-3.5" />
          <span>Tentang KriptoKini</span>
        </div>
        <h1 className="font-display font-black text-2xl sm:text-3.5xl tracking-tight leading-none text-zinc-900 dark:text-zinc-50">
          Portal Berita Kripto Terpercaya di Indonesia
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl leading-normal">
          Didirikan pada tahun 2026, KriptoKini hadir sebagai jembatan informasi utama yang menyajikan liputan berita real-time, analisis pergerakan pasar, serta materi pendidikan komprehensif bagi komunitas Web3 di tanah air.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Core Profile & Vision Grid (Spans 8 columns) */}
        <div className="md:col-span-8 space-y-6">
          
          <div className="p-6 bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-800 rounded-3xl shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_rgba(251,191,36,0.1)] space-y-4">
            <h2 className="font-display font-black text-lg text-zinc-950 dark:text-zinc-50">
              Visi & Komitmen Kami
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-952 border border-zinc-150 dark:border-zinc-850 space-y-2">
                <Shield className="w-6 h-6 text-amber-500" />
                <h3 className="font-display font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  Akurasi Tanpa Kompromi
                </h3>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-normal">
                  Setiap rilis berita melewati proses pengecekan fakta (double-check metrics) secara on-chain demi mencegah penyebaran berita palsu (FUD/shilling) di pasar.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-952 border border-zinc-150 dark:border-zinc-850 space-y-2">
                <Globe className="w-6 h-6 text-emerald-500" />
                <h3 className="font-display font-bold text-sm text-zinc-900 dark:text-zinc-100">
                  Orientasi Edukatif
                </h3>
                <p className="text-xs text-zinc-550 dark:text-zinc-400 leading-normal">
                  Kami percaya bahwa perlindungan terbaik bagi investor retail adalah pemahaman fundamental yang kokoh mengenai ekosistem keuangan dApps & Web3.
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed">
              Kami meyakini bahwa teknologi blockchain bukan sekadar spekulasi harga jangka pendek, melainkan revolusi arsitektur keuangan global. KriptoKini berkomitmen penuh memberikan penulisan riset dan berita yang bernilai edukasi tinggi, bebas dari pengaruh pesanan proyek tertentu (no biased shilling).
            </p>
          </div>

          {/* Members Team layout list */}
          <div className="space-y-4">
            <h2 className="font-display font-black text-lg text-zinc-900 dark:text-zinc-50">
              Tim Redaksi Utama Kami
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {team.map((member, i) => (
                <div
                  key={i}
                  className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-sm text-center space-y-3"
                >
                  <img
                    src={member.avatar}
                    alt={member.name}
                    className="w-16 h-16 rounded-full mx-auto object-cover border-2 border-amber-400 shadow-sm"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h3 className="font-display font-black text-sm text-zinc-950 dark:text-white leading-none">
                      {member.name}
                    </h3>
                    <span className="text-[10px] font-mono text-amber-500 font-bold block mt-1 uppercase tracking-wider">{member.role}</span>
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-normal text-left sm:text-center">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Dynamic Interactive Feedback Widget (Right 4 columns) */}
        <div className="md:col-span-4 space-y-6">
          <div className="p-5 bg-amber-400 text-zinc-950 border-2 border-zinc-950 rounded-2xl shadow-[4px_4px_0_#000] space-y-4">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-zinc-950 animate-pulse" />
              <h3 className="font-display font-black text-xs uppercase tracking-wider font-mono">
                Hubungi Redaksi & Feedback
              </h3>
            </div>

            {feedbackSent ? (
              <div className="text-center p-6 bg-zinc-950 text-white rounded-xl space-y-2 border border-zinc-950">
                <Heart className="w-8 h-8 text-rose-500 mx-auto fill-current animate-bounce" />
                <h4 className="font-display font-bold text-sm text-amber-400">Pesan Terkirim!</h4>
                <p className="text-[11px] text-zinc-400">Terima kasih atas masukannya. Tim redaksi kami sangat mengapresiasi dukungan Anda.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-3.5">
                <p className="text-[11px] font-bold text-zinc-900 leading-normal">
                  Sampaikan saran, kritik, atau pengajuan pers rilis langsung dari form ini.
                </p>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-black uppercase text-zinc-950">Nama Anda</label>
                  <input
                    type="text"
                    required
                    placeholder="Arzy"
                    value={senderName}
                    onChange={e => setSenderName(e.target.value)}
                    className="w-full p-2 text-xs rounded-lg border border-zinc-950 bg-white placeholder:text-zinc-400 outline-none focus:ring-1 focus:ring-zinc-950 text-zinc-900"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-black uppercase text-zinc-950">Saran / Pesan Kerja Sama</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Saya ingin mengirimkan saran artikel..."
                    value={senderMessage}
                    onChange={e => setSenderMessage(e.target.value)}
                    className="w-full p-2.5 text-xs rounded-lg border border-zinc-950 bg-white placeholder:text-zinc-400 outline-none focus:ring-1 focus:ring-zinc-950 text-zinc-900"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-zinc-950 hover:bg-zinc-900 text-white font-display font-bold text-xs rounded-lg transition-transform active:translate-y-0.5 cursor-pointer"
                >
                  Kirim Pesan Ke KriptoKini
                </button>
              </form>
            )}
          </div>

          {/* Quick FAQ info widget */}
          <div className="p-5 bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-800 rounded-2xl shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_rgba(251,191,36,0.1)] space-y-3 justify-between">
            <div className="flex items-center gap-1.5 text-amber-500 font-bold">
              <HelpCircle className="w-4 h-4" />
              <span className="text-[10px] uppercase font-mono font-bold tracking-wider">Metode Verifikasi</span>
            </div>
            <p className="text-[11px] text-zinc-550 dark:text-zinc-400 leading-normal">
              Seluruh rilis data harga kami bersumber langsung dari multi-feed aggregators on-chain, diperbaharui secara interval periodik real-time, untuk memberikan akuntabilitas penelaahan teknikal yang solid.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
