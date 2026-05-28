import React, { useState } from 'react';
import { Briefcase, MapPin, DollarSign, Send, ArrowLeft, CheckCircle2, UserCircle2, Mail, FileText, Globe } from 'lucide-react';
import { CareerItem } from '../types';
import { MOCK_CAREERS } from '../data/mockData';

interface CareerScreenProps {
  onAddNotification?: (title: string, message: string, type: 'news' | 'price' | 'analysis') => void;
}

export default function CareerScreen({ onAddNotification }: CareerScreenProps) {
  const [selectedJob, setSelectedJob] = useState<CareerItem | null>(null);
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', portfolio: '', coverLetter: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Filter department state
  const [activeDepartment, setActiveDepartment] = useState<string | null>(null);

  const departments = Array.from(new Set(MOCK_CAREERS.map(c => c.department)));

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    // Simulate audit trigger
    setIsSubmitted(true);
    if (onAddNotification && selectedJob) {
      onAddNotification(
        'Lamaran Dikirim! 💼',
        `Terima kasih ${formData.name}. Lamaran Anda untuk posisi "${selectedJob.title}" telah terkirim ke divisi HR KriptoKini. Kami akan memproses dalam 3 hari kerja.`,
        'news'
      );
    }
  };

  const handleApplyClick = (job: CareerItem) => {
    setSelectedJob(job);
    setShowApplyModal(true);
    setIsSubmitted(false);
    setFormData({ name: '', email: '', portfolio: '', coverLetter: '' });
  };

  const filteredJobs = activeDepartment 
    ? MOCK_CAREERS.filter(j => j.department === activeDepartment)
    : MOCK_CAREERS;

  return (
    <div id="career-portal" className="space-y-8 animate-fade-in">
      
      {/* Intro section */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-400/10 text-amber-500 border border-amber-400/20 uppercase tracking-widest">
          <Briefcase className="w-3.5 h-3.5" />
          <span>Direktori Karir Kriptokini</span>
        </div>
        <h1 className="font-display font-black text-2xl sm:text-3.5xl tracking-tight leading-none text-zinc-900 dark:text-zinc-50">
          Bangun Masa Depan Anda di Era Web3
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl leading-normal">
          Dapatkan akses ke peluang karir terbaik di ekosistem blockchain Indonesia dan dunia. Ajukan lamaran instan secara gratis meIaIui sistem rekrutmen terintegrasi kami.
        </p>
      </div>

      {/* Quick Filter Department Buttons */}
      <div className="flex flex-wrap gap-2 py-1 items-center">
        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-wider mr-2">Divisi:</span>
        <button
          onClick={() => setActiveDepartment(null)}
          className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeDepartment === null
              ? 'bg-zinc-950 text-white dark:bg-amber-400 dark:text-zinc-950'
              : 'bg-white border border-zinc-200 text-zinc-650 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300'
          }`}
        >
          Semua Posisi
        </button>
        {departments.map(dept => (
          <button
            key={dept}
            onClick={() => setActiveDepartment(dept)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeDepartment === dept
                ? 'bg-zinc-950 text-white dark:bg-amber-400 dark:text-zinc-950'
                : 'bg-white border border-zinc-200 text-zinc-650 hover:bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-805 dark:text-zinc-300'
            }`}
          >
            {dept}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {/* Job Listings Column */}
        {filteredJobs.map(job => (
          <div
            key={job.id}
            className="p-6 bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-800 rounded-3xl shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_rgba(251,191,36,0.1)] hover:border-amber-400 dark:hover:border-amber-400 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-3.5 max-w-xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-black uppercase bg-zinc-100 dark:bg-zinc-952 text-zinc-500 dark:text-zinc-400">
                  {job.department}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[10px] font-mono font-black uppercase bg-amber-400 text-zinc-950">
                  {job.type}
                </span>
              </div>

              <div>
                <h3 className="font-display font-black text-lg text-zinc-950 dark:text-zinc-50">
                  {job.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 mt-1 font-semibold">
                  <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-zinc-400" />{job.location}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-zinc-400 font-bold" />{job.salary}</span>
                </div>
              </div>

              <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-normal">
                {job.description}
              </p>

              {/* Requirements tags list */}
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-black text-zinc-400 uppercase tracking-widest">Kualifikasi Utama:</span>
                <ul className="list-disc pl-4 space-y-0.5">
                  {job.requirements.slice(0, 2).map((req, i) => (
                    <li key={i} className="text-[11px] text-zinc-550 dark:text-zinc-300 leading-normal">
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-zinc-100 dark:border-zinc-800 flex items-center justify-end">
              <button
                onClick={() => handleApplyClick(job)}
                className="w-full md:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-350 text-zinc-950 border-2 border-zinc-950 font-display font-black text-xs rounded-xl shadow-[3px_3px_0_#000000] cursor-pointer transition-all flex items-center gap-1.5 justify-center"
              >
                <span>Lamar Pekerjaan</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}

      </div>

      {/* APPLY MODAL LIGHTBOX OVERLAY */}
      {showApplyModal && selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/65 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-800 rounded-3xl p-6 max-w-lg w-full shadow-2xl space-y-4 relative text-zinc-900 dark:text-zinc-100">
            
            <button
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-900 dark:hover:text-white font-black text-lg cursor-pointer bg-zinc-100 dark:bg-zinc-800 w-7 h-7 rounded-full flex items-center justify-center"
            >
              ×
            </button>

            {isSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="mx-auto w-12 h-12 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-500 rounded-full flex items-center justify-center border border-emerald-500">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display font-black text-lg text-zinc-950 dark:text-white">
                    Lamaran Terkirim Sukses!
                  </h3>
                  <p className="text-xs text-zinc-650 dark:text-zinc-400 max-w-sm mx-auto leading-normal">
                    Lamaran simulasi Anda untuk posisi <span className="font-bold">"{selectedJob.title}"</span> berhasil kami daftarkan. Sistem kami telah mencatat email <span className="font-mono text-amber-500 font-semibold">{formData.email}</span>.
                  </p>
                </div>
                <button
                  onClick={() => setShowApplyModal(false)}
                  className="px-5 py-2.5 bg-zinc-950 dark:bg-amber-400 text-white dark:text-zinc-950 rounded-xl font-display font-bold text-xs cursor-pointer border border-transparent hover:scale-102"
                >
                  Selesai & Keluar
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div>
                  <span className="text-[9px] font-mono font-black text-amber-500 uppercase tracking-widest block">Lamar Posisi</span>
                  <h3 className="font-display font-black text-lg text-zinc-950 dark:text-white leading-tight">
                    {selectedJob.title}
                  </h3>
                  <p className="text-[10px] text-zinc-450 font-mono mt-0.5">{selectedJob.department} • {selectedJob.location}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-black uppercase text-zinc-450">Nama Lengkap *</label>
                    <div className="relative">
                      <UserCircle2 className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                      <input
                        type="text"
                        required
                        placeholder="Arzy Adwan"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-10 gap-2 outline-none focus:border-amber-400 text-zinc-900 dark:text-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-black uppercase text-zinc-450">Alamat Email *</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                      <input
                        type="email"
                        required
                        placeholder="user@kriptokini.id"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-10 gap-2 outline-none focus:border-amber-400 text-zinc-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black uppercase text-zinc-450">Link CV / Portofolio Web3 *</label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                    <input
                      type="url"
                      required
                      placeholder="https://github.com/username-portfolio"
                      value={formData.portfolio}
                      onChange={e => setFormData({ ...formData, portfolio: e.target.value })}
                      className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-10 gap-2 outline-none focus:border-amber-400 text-zinc-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-black uppercase text-zinc-450">Surat Pengantar Singkat (Cover Letter)</label>
                  <textarea
                    rows={3}
                    placeholder="Kenapa Anda sangat bersemangat tentang ekosistem Web3..."
                    value={formData.coverLetter}
                    onChange={e => setFormData({ ...formData, coverLetter: e.target.value })}
                    className="w-full p-3 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-10 outline-none focus:border-amber-400 text-zinc-900 dark:text-white"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-amber-400 text-zinc-950 font-display font-black text-sm rounded-xl border-2 border-zinc-950 shadow-[3px_3px_0_#000] cursor-pointer hover:bg-amber-305 transition-all"
                  >
                    Kirim Lamaran Pekerjaan
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
