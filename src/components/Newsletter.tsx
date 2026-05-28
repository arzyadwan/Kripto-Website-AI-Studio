import React, { useState, useEffect } from 'react';
import { Mail, CheckCircle2, User, Sparkles } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const subscribed = localStorage.getItem('kriptokini_newsletter_subscribed');
    if (subscribed === 'true') {
      setIsSubscribed(true);
    }
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    
    localStorage.setItem('kriptokini_newsletter_subscribed', 'true');
    setIsSubscribed(true);
    setEmail('');
  };

  return (
    <div id="newsletter-form-container" className="relative overflow-hidden bg-zinc-950 text-white rounded-3xl p-6 md:p-8 border-2 border-amber-400 shadow-[6px_6px_0px_#000000] dark:shadow-[6px_6px_0px_rgba(251,191,36,0.3)]">
      {/* Background radial soft light gradient */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

      {isSubscribed ? (
        <div id="newsletter-success-state" className="flex flex-col items-center justify-center text-center py-6 space-y-3.5 animate-fadeIn">
          <div className="p-3 bg-amber-400 text-zinc-900 rounded-full">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="font-display font-black text-xl text-amber-400">
            Terima Kasih, Berlangganan Berhasil!
          </h3>
          <p className="text-xs text-zinc-300 max-w-sm">
            Tautan konfirmasi harian telah dikirim ke inbox Anda. Anda kini akan menerima notifikasi analisis teknikal langsung saat rilis.
          </p>
        </div>
      ) : (
        <div id="newsletter-input-state" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          <div className="lg:col-span-7 space-y-2">
            <span className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold bg-amber-400 text-zinc-950 px-2 py-0.5 rounded-full uppercase tracking-wider">
              <Sparkles className="w-3 h-3 text-zinc-950" />
              Upgrade Pengetahuan Anda
            </span>
            <h3 className="font-display font-black text-xl sm:text-2xl text-zinc-50 leading-tight">
              Dapatkan Pembaruan Sinyal & Analisis Pilihan Langsung di Inbox!
            </h3>
            <p className="text-xs text-zinc-400 max-w-md">
              Bergabunglah dengan lebih dari <span className="text-amber-400 font-bold">12.000+ trader aktif</span> yang menerima rangkuman pasar makro harian gratis secara berkala.
            </p>
          </div>

          <div className="lg:col-span-5 w-full">
            <form id="newsletter-form" onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2 relative">
                <div className="relative flex-grow">
                  <Mail className="absolute left-3 top-3 h-4.5 w-4.5 text-zinc-500" />
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    placeholder="Masukkan alamat email Anda..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs pl-10 pr-3 py-3 rounded-xl bg-zinc-900 border border-zinc-750 text-white placeholder-zinc-500 outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  id="newsletter-submit-btn"
                  type="submit"
                  className="bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold font-display text-xs px-6 py-3 rounded-xl border border-zinc-950 transition-colors uppercase tracking-wide cursor-pointer text-center"
                >
                  Langganan
                </button>
              </div>
              <p className="text-[10px] text-zinc-500 text-center sm:text-left">
                Kami merawat privasi Anda. Batalkan langganan kapan saja dalam satu klik.
              </p>
            </form>
          </div>

        </div>
      )}
    </div>
  );
}
