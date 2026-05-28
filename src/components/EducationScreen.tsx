import React, { useState } from 'react';
import { BookOpen, Award, CheckCircle, ChevronRight, Lock, Play, ArrowLeft, Star, Clock } from 'lucide-react';
import { EducationItem } from '../types';
import { MOCK_EDUCATION } from '../data/mockData';

interface EducationScreenProps {
  onAddNotification?: (title: string, message: string, type: 'news' | 'price' | 'analysis') => void;
}

export default function EducationScreen({ onAddNotification }: EducationScreenProps) {
  const [selectedCourse, setSelectedCourse] = useState<EducationItem | null>(null);
  const [completedChapters, setCompletedChapters] = useState<Record<string, string[]>>({});
  const [showCertificate, setShowCertificate] = useState(false);

  // Active module reader index
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);

  const handleStartCourse = (course: EducationItem) => {
    setSelectedCourse(course);
    setActiveChapterIndex(0);
    setShowCertificate(false);
  };

  const handleToggleChapter = (courseId: string, chapter: string) => {
    setCompletedChapters(prev => {
      const current = prev[courseId] || [];
      const next = current.includes(chapter)
        ? current.filter(c => c !== chapter)
        : [...current, chapter];
      
      const updated = { ...prev, [courseId]: next };

      // If all chapters was just completed, trigger a nice push notification
      const course = MOCK_EDUCATION.find(e => e.id === courseId);
      if (course && next.length === course.chapters.length && onAddNotification) {
        onAddNotification(
          'Selamat! Selesai Kursus 🎉',
          `Anda telah berhasil menuntaskan seluruh modul tingkat ${course.level}: ${course.title}. Klaim sertifikat kompetensi Anda sekarang!`,
          'news'
        );
      }

      return updated;
    });
  };

  const currentCompleted = selectedCourse ? completedChapters[selectedCourse.id] || [] : [];
  const percentProgress = selectedCourse 
    ? Math.round((currentCompleted.length / selectedCourse.chapters.length) * 100) 
    : 0;

  return (
    <div id="education-screen" className="space-y-8 animate-fade-in">
      
      {/* Back button or page intro header */}
      {selectedCourse ? (
        <div className="space-y-6">
          <button
            onClick={() => setSelectedCourse(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-650 hover:text-amber-500 dark:text-zinc-400 dark:hover:text-amber-400 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Katalog Edukasi</span>
          </button>

          {/* Interactive Lesson Active Title */}
          <div className="p-6 rounded-3xl bg-amber-400 text-zinc-950 border-2 border-zinc-950 shadow-[4px_4px_0px_#050505] dark:shadow-[4px_4px_0px_rgba(251,191,36,0.15)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded text-[10px] uppercase tracking-wider font-black font-mono bg-zinc-950 text-amber-400">
                  {selectedCourse.level} • {selectedCourse.estimatedTime}
                </span>
                <h1 className="font-display font-black text-2xl tracking-tight leading-none">
                  {selectedCourse.title}
                </h1>
              </div>

              {/* Course Circle widget representation */}
              <div className="flex items-center gap-3 bg-zinc-950/5 p-3 rounded-2xl border border-zinc-950/15">
                <Award className="w-8 h-8 text-zinc-950 animate-bounce" />
                <div>
                  <div className="text-xs font-black font-mono uppercase tracking-wider text-zinc-950">Progression</div>
                  <div className="font-display font-black text-lg leading-none">{percentProgress}% Komplit</div>
                </div>
              </div>
            </div>

            {/* Dynamic progress bar slider */}
            <div className="w-full bg-zinc-950/15 h-3 rounded-full mt-5 overflow-hidden border border-zinc-950/10">
              <div 
                className="bg-zinc-950 h-full transition-all duration-500" 
                style={{ width: `${percentProgress}%` }}
              ></div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Chapters navigation rail list (Left 5 Columns) */}
            <div className="md:col-span-5 space-y-3">
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-zinc-400 font-mono">
                Daftar Bab Pembelajaran
              </h3>
              <div className="space-y-2">
                {selectedCourse.chapters.map((chapter, idx) => {
                  const isCompleted = currentCompleted.includes(chapter);
                  const isActive = idx === activeChapterIndex;
                  return (
                    <button
                      key={chapter}
                      onClick={() => setActiveChapterIndex(idx)}
                      className={`w-full text-left p-4 rounded-2xl border-2 transition-all flex items-start gap-3 cursor-pointer ${
                        isActive
                          ? 'bg-zinc-950 text-white dark:bg-zinc-900 border-zinc-950 dark:border-amber-400 shadow-[3px_3px_0_rgba(245,158,11,1)]'
                          : 'bg-white text-zinc-900 border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-300 hover:border-amber-400'
                      }`}
                    >
                      <span className="flex items-center justify-center w-6 h-6 rounded-full font-mono text-[11px] font-black shrink-0 bg-amber-400 text-zinc-900 border border-zinc-950">
                        {idx + 1}
                      </span>
                      <div className="space-y-1 group truncate">
                        <p className="text-xs font-bold leading-normal truncate whitespace-normal block line-clamp-2">
                          {chapter}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <input
                            type="checkbox"
                            checked={isCompleted}
                            onChange={(e) => {
                              e.stopPropagation();
                              handleToggleChapter(selectedCourse.id, chapter);
                            }}
                            className="rounded text-amber-500 focus:ring-amber-400 border-zinc-300 w-3.5 h-3.5 cursor-pointer"
                          />
                          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-zinc-400">
                            {isCompleted ? 'Sudah Selesai' : 'Tandai Selesai'}
                          </span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Claim Certificate trigger if 100% completed */}
              {percentProgress === 100 && (
                <button
                  onClick={() => setShowCertificate(true)}
                  className="w-full py-3.5 px-4 rounded-2xl bg-emerald-500 hover:bg-emerald-450 border-2 border-zinc-950 text-zinc-950 font-display font-black text-sm tracking-tight shadow-[4px_4px_0_#000] transition-transform active:translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Award className="w-4 h-4" />
                  <span>Klaim Sertifikat Resmi</span>
                </button>
              )}
            </div>

            {/* Chapter Active View content viewport area (Right 7 Colums) */}
            <div className="md:col-span-7 space-y-6">
              
              {showCertificate ? (
                /* Dynamic Custom Certificate Render */
                <div className="border-4 border-dashed border-amber-400 bg-zinc-950 p-8 rounded-3xl text-center space-y-6 text-white shadow-xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full translate-x-12 -translate-y-12"></div>
                  
                  <Award className="w-16 h-16 text-amber-400 mx-auto animate-pulse" />
                  
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">Sertifikat Kelulusan Resmi</span>
                    <h2 className="font-display font-black text-2xl text-amber-400 leading-tight">
                      KriptoKini Blockchain Academy
                    </h2>
                  </div>

                  <p className="text-zinc-300 text-xs leading-relaxed max-w-sm mx-auto">
                    Dengan ini menyatakan bahwa pengguna portal kami telah menyelesaikan modul evaluasi intensif mengenai:
                  </p>
                  
                  <p className="font-display font-black text-lg text-white border-y border-zinc-800 py-3 block max-w-md mx-auto">
                    "{selectedCourse.title}"
                  </p>

                  <div className="flex items-center justify-between text-left pt-6 max-w-md mx-auto border-t border-zinc-900 text-[10px] font-mono text-zinc-500">
                    <div>
                      <span>DITERBITKAN OLEH</span>
                      <p className="text-white font-bold font-sans">KriptoKini Media</p>
                    </div>
                    <div className="text-right">
                      <span>KODE VERIFIKASI</span>
                      <p className="text-amber-400 font-bold">KK-EDU-{selectedCourse.id.toUpperCase()}-{Math.floor(Math.random() * 90000 + 10000)}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => setShowCertificate(false)}
                    className="mt-4 text-xs font-bold text-amber-400 hover:underline cursor-pointer"
                  >
                    Kembali membaca materi bab
                  </button>
                </div>
              ) : (
                /* Active course module details content text */
                <div className="bg-white p-6 rounded-3xl border-2 border-zinc-950 dark:bg-zinc-900 dark:border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-black uppercase text-amber-500 tracking-wider">
                      Bab {activeChapterIndex + 1} Selesai 50%
                    </span>
                    <span className="flex items-center gap-1 text-[11px] font-bold text-zinc-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{selectedCourse.estimatedTime}</span>
                    </span>
                  </div>

                  <h3 className="font-display font-black text-xl text-zinc-950 dark:text-zinc-50">
                    {selectedCourse.chapters[activeChapterIndex]}
                  </h3>

                  <div className="text-xs sm:text-sm text-zinc-650 dark:text-zinc-300 leading-relaxed space-y-3.5">
                    <p>
                      Mempelajari bab ini memberikan Anda integrasi pemahaman yang utuh mengenai ekosistem Web3 secara langsung. Dalam sistem blockchain kontemporer, penelaahan struktur on-chain, penataan gas limit ataupun private keys, adalah faktor pondasi yang wajib dipertahankan.
                    </p>
                    <div className="p-4 rounded-2xl bg-amber-400/5 dark:bg-amber-400/10 border-l-4 border-amber-400 text-xs my-4 space-y-1 flex items-start gap-2.5 text-zinc-800 dark:text-zinc-205">
                      <CheckCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                      <div>
                        <span className="font-black">Aturan Emas:</span> Jangan pernah membagikan 12 Secret Recovery Words (seed phrase) kepada siapapun atau menginputnya di situs web manapun. Pengurus portal resmi, bursa bursa kripto, ataupun developer dApps tidak akan pernah meminta seed phrase Anda.
                      </div>
                    </div>
                    <p>
                      Untuk menguji langsung pemahaman Anda, centanglah kotak 'Tandai Selesai' di sebelah kiri pelajaran, lalu beralih ke bab selanjutnya untuk melengkapi kurikulum demi memicu ketersediaan sertifikat gratis Anda.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-5 border-t border-zinc-100 dark:border-zinc-800">
                    <button
                      disabled={activeChapterIndex === 0}
                      onClick={() => setActiveChapterIndex(prev => prev - 1)}
                      className="px-4 py-2 rounded-xl text-xs font-bold border border-zinc-300 dark:border-zinc-800 disabled:opacity-40 cursor-pointer"
                    >
                      Sebelumnya
                    </button>
                    {activeChapterIndex < selectedCourse.chapters.length - 1 ? (
                      <button
                        onClick={() => {
                          const currentChapter = selectedCourse.chapters[activeChapterIndex];
                          if (!currentCompleted.includes(currentChapter)) {
                            handleToggleChapter(selectedCourse.id, currentChapter);
                          }
                          setActiveChapterIndex(prev => prev + 1);
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-zinc-950 border border-zinc-950 shadow-xs cursor-pointer hover:bg-amber-350"
                      >
                        Berikutnya & Tandai Selesai
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          const currentChapter = selectedCourse.chapters[activeChapterIndex];
                          if (!currentCompleted.includes(currentChapter)) {
                            handleToggleChapter(selectedCourse.id, currentChapter);
                          }
                        }}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-zinc-950 border border-zinc-950 shadow-xs cursor-pointer"
                      >
                        Selesaikan Kursus!
                      </button>
                    )}
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>
      ) : (
        /* Education Catalog View */
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-amber-400/10 text-amber-500 border border-amber-400/20 uppercase tracking-widest">
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>KriptoKini Blockchain Academy</span>
            </div>
            <h1 className="font-display font-black text-2xl sm:text-3.5xl tracking-tight leading-none text-zinc-900 dark:text-zinc-50">
              Edukasi Kripto & Web3 Akademi
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 max-w-2xl leading-normal">
              Akses materi pembelajaran interaktif gratis, mulai dari konsep pemula hingga penginstalan Solidity Code. Selesaikan seluruh bab modul untuk mengklaim sertifikat kelulusan formal.
            </p>
          </div>

          {/* Catalog grid cards list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {MOCK_EDUCATION.map(course => {
              const comp = completedChapters[course.id] || [];
              const progress = Math.round((comp.length / course.chapters.length) * 100);
              return (
                <div
                  key={course.id}
                  className="bg-white text-zinc-90 w-full rounded-2xl border-2 border-zinc-950 dark:bg-zinc-900 dark:border-zinc-800 p-5 shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_rgba(251,191,36,0.1)] flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase tracking-wider ${
                        course.level === 'Pemula' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400' :
                        course.level === 'Menengah' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400' :
                        'bg-rose-100 text-rose-800 dark:bg-rose-950/40 dark:text-rose-400'
                      }`}>
                        {course.level}
                      </span>
                      <span className="text-[10px] font-mono text-zinc-400 font-bold">{course.estimatedTime}</span>
                    </div>

                    <h3 className="font-display font-black text-base leading-snug text-zinc-950 dark:text-zinc-50 hover:text-amber-500 transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-xs text-zinc-650 dark:text-zinc-400 leading-normal line-clamp-3">
                      {course.description}
                    </p>

                    <p className="text-[10px] font-mono font-bold text-zinc-450 uppercase tracking-wider">
                      💎 {course.modulesCount} Bab Utama • Sertifikat Kelulusan
                    </p>
                  </div>

                  {/* Start learning buttons and stats */}
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 mt-4 flex items-center justify-between">
                    <div>
                      {comp.length > 0 && (
                        <div className="text-[10px] font-mono text-zinc-400 font-bold">
                          {comp.length}/{course.chapters.length} Bab • {progress}%
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleStartCourse(course)}
                      className="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-amber-400 text-zinc-950 hover:bg-amber-350 border border-zinc-950 transition-all shadow-xs flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      <span>{comp.length > 0 ? 'Lanjutkan' : 'Mulai Belajar'}</span>
                    </button>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

    </div>
  );
}
