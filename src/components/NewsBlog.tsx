import React, { useState } from 'react';
import { Article } from '../types';
import { 
  Calendar, User, Eye, Heart, MessageSquare, ArrowRight, BookOpen, 
  Search, SearchSlash, Flame, ArrowLeftRight, TrendingUp, Sparkles, Clock, Award, Bookmark 
} from 'lucide-react';
import Newsletter from './Newsletter';

interface NewsBlogProps {
  articles: Article[];
  searchQuery: string;
  selectedCategory: 'Berita' | 'Analisis' | 'Edukasi' | 'Regulasi' | null;
  onSelectArticle: (article: Article) => void;
  onSelectTag: (tag: string) => void;
}

export default function NewsBlog({
  articles,
  searchQuery,
  selectedCategory,
  onSelectArticle,
  onSelectTag
}: NewsBlogProps) {
  
  // Coin conversion calculation state
  const [calcValue, setCalcValue] = useState<number>(1);
  const [selectedCalcCoin, setSelectedCalcCoin] = useState<string>('BTC');
  
  const coinRates: Record<string, number> = {
    BTC: 68420.50,
    ETH: 3485.20,
    SOL: 172.40,
    XRP: 0.584,
  };

  const currentRate = coinRates[selectedCalcCoin] || 1;
  const resultUSD = calcValue * currentRate;
  const resultIDR = resultUSD * 16250; // assuming USD to IDR rate is Rp 16.250

  // Live polling sentiment state
  const [votedOption, setVotedOption] = useState<string | null>(null);
  const [pollVotes, setPollVotes] = useState({
    bullish: 1245,
    bearish: 312,
    neutral: 148
  });

  const handleVote = (option: 'bullish' | 'bearish' | 'neutral') => {
    if (votedOption) return;
    setVotedOption(option);
    setPollVotes(prev => ({
      ...prev,
      [option]: prev[option] + 1
    }));
  };

  const totalVotes = pollVotes.bullish + pollVotes.bearish + pollVotes.neutral;
  const percentBullish = Math.round((pollVotes.bullish / totalVotes) * 100);
  const percentBearish = Math.round((pollVotes.bearish / totalVotes) * 100);
  const percentNeutral = Math.round((pollVotes.neutral / totalVotes) * 100);

  // Advanced search & category filtering logic
  const filteredArticles = articles.filter(article => {
    // Category match
    if (selectedCategory && article.category !== selectedCategory) {
      return false;
    }

    // Search query match in Title, Summary, Content or Tags
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      const titleMatch = article.title.toLowerCase().includes(query);
      const summaryMatch = article.summary.toLowerCase().includes(query);
      const contentMatch = article.content.toLowerCase().includes(query);
      const tagMatch = article.tags.some(tag => tag.toLowerCase().includes(query));
      
      return titleMatch || summaryMatch || contentMatch || tagMatch;
    }

    return true;
  });

  // Calculate distinct sections for homepage
  // 1. Top Trending: Ranked by views descending
  const trendingArticles = [...filteredArticles]
    .sort((a, b) => b.views - a.views)
    .slice(0, 3);

  // 2. Editor's Choice: Curated list of IDs
  const editorsChoiceIds = ['art-1', 'art-5', 'art-8', 'art-3'];
  const editorsChoiceArticles = filteredArticles.filter(art => editorsChoiceIds.includes(art.id));
  const finalEditorsChoice = editorsChoiceArticles.length > 0 ? editorsChoiceArticles : filteredArticles.slice(0, 4);
  const editorSpotlight = finalEditorsChoice[0] || null;
  const editorSecondary = finalEditorsChoice.slice(1, 4);

  // 3. Recent Articles feed (excluding the top spotlight to offer variation)
  const recentArticles = filteredArticles.filter(art => art.id !== editorSpotlight?.id);

  return (
    <div id="blog-listing-wrapper" className="space-y-10">
      
      {/* Category header tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-display font-black text-xl sm:text-2xl tracking-tight leading-none text-zinc-900 dark:text-zinc-50">
            {selectedCategory ? `${selectedCategory} Terhangat` : 'Semua Kabar Kripto Harian'}
          </h2>
          <p className="text-xs text-zinc-500 mt-1.5 font-mono">
            {filteredArticles.length} artikel ditemukan • Informasi diperbarui setiap jam
          </p>
        </div>

        {/* Dynamic Navigation Jumper Pills (Only visible on main index) */}
        {!searchQuery && !selectedCategory && filteredArticles.length > 0 && (
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-xl max-w-max self-start sm:self-center shadow-inner">
            <a href="#section-pilihan-editor" className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg bg-zinc-900 text-white dark:bg-zinc-800 hover:opacity-90">
              ✨ Editor
            </a>
            <a href="#section-top-trending" className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
              🔥 Trending
            </a>
            <a href="#crypto-kilas-bulletin-container" className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
              ⚡ Kilas 24J
            </a>
            <a href="#section-berita-terbaru" className="px-2.5 py-1 text-[11px] font-mono font-bold rounded-lg text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
              🕒 Terbaru
            </a>
          </div>
        )}
      </div>

      {/* Active Tags list wrapper to allow easy removal */}
      {searchQuery.trim() !== '' && (
        <div id="active-tags-filter-bar" className="flex items-center gap-2 p-3 bg-zinc-100 dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800">
          <span className="text-[10px] font-mono font-bold text-zinc-400">Pencarian Aktif:</span>
          <span className="px-2.5 py-1 text-xs rounded-lg font-bold bg-amber-400 text-zinc-950 border border-zinc-950 flex items-center gap-1.5 shadow-xs">
            <span>"{searchQuery}"</span>
            <button
              onClick={() => onSelectTag('')}
              className="hover:text-rose-600 font-extrabold cursor-pointer ml-1 text-xs bg-zinc-950 text-amber-400 w-4 h-4 rounded-full flex items-center justify-center"
              title="Bersihkan filter"
            >
              ×
            </button>
          </span>
        </div>
      )}

      {/* No Results Fallback state */}
      {filteredArticles.length === 0 && (
        <div id="blank-slate-no-results" className="py-12 px-4 rounded-3xl border-2 border-dashed border-zinc-350 dark:border-zinc-800 text-center space-y-3.5">
          <div className="p-4 bg-zinc-100 dark:bg-zinc-902 rounded-full inline-flex text-zinc-400">
            <SearchSlash className="w-8 h-8 text-amber-500" />
          </div>
          <h3 className="font-display font-extrabold text-lg text-zinc-955 dark:text-zinc-100">
            Tidak ada kecocokan berita
          </h3>
          <p className="text-xs text-zinc-650 dark:text-zinc-400 max-w-md mx-auto">
            Maaf, kami tidak dapat menemukan hasil untuk penelusuran <span className="font-mono font-bold text-amber-500">"{searchQuery}"</span>. Coba bersihkan pencarian atau navigasikan tab ke kategori lainnya.
          </p>
          <button
            onClick={() => onSelectTag('')}
            className="px-4 py-2 text-xs font-bold bg-amber-400 text-zinc-950 border-2 border-zinc-950 rounded-xl shadow-[3px_3px_0px_#000000] cursor-pointer hover:bg-amber-350"
          >
            Bersihkan Pencarian
          </button>
        </div>
      )}

      {/* RENDER MODE A: ACTIVE SEARCH OR CATEGORY FILTERED VIEW */}
      {(searchQuery.trim() !== '' || selectedCategory) && filteredArticles.length > 0 && (
        <div id="blog-search-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div
              id={`blog-card-search-${article.id}`}
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="group cursor-pointer bg-white text-zinc-900 rounded-2xl border-2 border-zinc-900 overflow-hidden shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_rgba(245,158,11,1)] dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-800 dark:shadow-[4px_4px_0_rgba(251,191,36,0.1)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative aspect-video overflow-hidden border-b-2 border-zinc-900 dark:border-zinc-805">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <span className="absolute top-3 left-3 text-[9px] font-mono font-extrabold bg-amber-400 text-zinc-950 px-2 py-0.5 rounded border border-zinc-950 uppercase tracking-widest">
                  {article.category}
                </span>
              </div>

              {/* Content Section */}
              <div className="p-5 space-y-3.5">
                <div className="flex items-center justify-between text-[10px] font-mono font-bold text-zinc-450 uppercase">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>

                <h3 className="font-display font-black text-sm sm:text-base leading-tight group-hover:text-amber-500 transition-colors line-clamp-2">
                  {article.title}
                </h3>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                  {article.summary}
                </p>

                {article.tags && article.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {article.tags.map(t => (
                      <button
                        key={t}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectTag(t);
                        }}
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-300 hover:bg-amber-400 hover:text-zinc-950 dark:hover:bg-amber-400 dark:hover:text-zinc-950 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
                      >
                        #{t}
                      </button>
                    ))}
                  </div>
                )}

                {/* Bottom Author Info */}
                <div className="flex items-center justify-between pt-3 border-t border-zinc-105 dark:border-zinc-800">
                  <div className="flex items-center space-x-1.5 truncate">
                    <img
                      src={article.authorAvatar}
                      alt={article.author}
                      className="w-6 h-6 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-[11px] font-display font-bold text-zinc-700 dark:text-zinc-300 truncate">{article.author}</span>
                  </div>

                  <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-400 shrink-0">
                    <span className="flex items-center gap-0.5 text-rose-500"><Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />{article.likes}</span>
                    <span className="flex items-center gap-0.5"><MessageSquare className="w-3.5 h-3.5" />{article.commentsCount}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* RENDER MODE B: HOME VIEW MULTI-SECTION DIVISION */}
      {!searchQuery && !selectedCategory && filteredArticles.length > 0 && (
        <div id="blog-homepage-sections" className="space-y-12">
          
          {/* SECTION 1: PILIHAN EDITOR (Editor's Choice) */}
          <div id="section-pilihan-editor" className="space-y-6 scroll-mt-20">
            <div className="flex items-center gap-2 border-b-2 border-zinc-100 dark:border-zinc-805 pb-3">
              <span className="p-1 px-1.5 text-xs font-mono font-black bg-amber-400 text-zinc-950 rounded uppercase flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> SPECIAL
              </span>
              <div>
                <h3 className="font-display font-black text-base sm:text-lg text-zinc-950 dark:text-zinc-50 leading-none">
                  Pilihan Editor
                </h3>
                <p className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider mt-1">
                  Rekomendasi tim kurasi analis pakar kripto lokal untuk Anda
                </p>
              </div>
            </div>

            {/* Spotlight Big Card */}
            {editorSpotlight && (
              <div 
                id={`blog-card-featured-${editorSpotlight.id}`}
                onClick={() => onSelectArticle(editorSpotlight)}
                className="group cursor-pointer bg-amber-400 text-zinc-950 border-2 border-zinc-950 rounded-3xl p-5 md:p-6 shadow-[5px_5px_0px_#000000] dark:shadow-[5px_5px_0px_rgba(251,191,36,0.25)] transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                  
                  {/* Left Side: Image */}
                  <div className="lg:col-span-6 relative aspect-video rounded-2xl overflow-hidden border border-zinc-950 shadow-inner shrink-0">
                    <img
                      src={editorSpotlight.image}
                      alt={editorSpotlight.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 text-[10px] font-mono font-bold bg-zinc-950 text-amber-400 uppercase tracking-widest px-2.5 py-1 rounded border border-amber-400/20 shadow-lg">
                      SOROTAN UTAMA
                    </span>
                  </div>

                  {/* Right Side: Description content */}
                  <div className="lg:col-span-6 space-y-3.5 flex flex-col justify-between h-full">
                    <div className="space-y-2.5">
                      <div className="flex items-center space-x-2 text-[10px] font-mono font-black text-zinc-900 uppercase">
                        <span className="bg-zinc-950 text-amber-400 px-2 py-0.5 rounded text-[8px]">{editorSpotlight.category}</span>
                        <span>•</span>
                        <span>{editorSpotlight.readTime}</span>
                        <span>•</span>
                        <span className="text-amber-950">Terhangat 🔥</span>
                      </div>
                      
                      <h3 className="font-display font-black text-lg sm:text-xl lg:text-2xl leading-tight group-hover:underline text-zinc-950">
                        {editorSpotlight.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-zinc-900 font-medium line-clamp-3 leading-relaxed">
                        {editorSpotlight.summary}
                      </p>

                      {editorSpotlight.tags && editorSpotlight.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {editorSpotlight.tags.map(t => (
                            <button
                              key={t}
                              onClick={(e) => {
                                e.stopPropagation();
                                onSelectTag(t);
                              }}
                              className="px-2.5 py-1 rounded text-[10px] font-mono font-bold bg-zinc-950/10 text-zinc-955 hover:bg-zinc-950 hover:text-amber-400 transition-all border border-zinc-950/15 cursor-pointer"
                            >
                              #{t}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-zinc-950/20">
                      <div className="flex items-center space-x-2">
                        <img
                          src={editorSpotlight.authorAvatar}
                          alt={editorSpotlight.author}
                          className="w-7 h-7 rounded-full object-cover border border-zinc-950"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-xs font-display font-bold text-zinc-900">{editorSpotlight.author}</span>
                      </div>

                      <div className="flex items-center space-x-3 text-xs font-mono font-bold text-zinc-900">
                        <span className="flex items-center gap-0.5"><Eye className="w-3.5 h-3.5" />{editorSpotlight.views}</span>
                        <span className="flex items-center gap-0.5"><Heart className="w-3.5 h-3.5" />{editorSpotlight.likes}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            {/* Editor curated subcards */}
            {editorSecondary.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
                {editorSecondary.map(article => (
                  <div
                    id={`blog-card-subeditor-${article.id}`}
                    key={article.id}
                    onClick={() => onSelectArticle(article)}
                    className="group cursor-pointer bg-white text-zinc-900 rounded-2xl border-2 border-zinc-900 overflow-hidden shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_rgba(245,158,11,1)] dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-800 dark:shadow-[4px_4px_0_rgba(251,191,36,0.1)] hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="relative aspect-video overflow-hidden border-b-2 border-zinc-900 dark:border-zinc-805">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute top-2.5 left-2.5 text-[8px] font-mono font-black bg-zinc-900 text-white px-2 py-0.5 rounded border border-zinc-950 uppercase tracking-widest">
                        CURATED CHOICE
                      </span>
                    </div>

                    <div className="p-4 space-y-3">
                      <div className="flex items-center justify-between text-[10px] font-mono font-bold text-zinc-450 uppercase">
                        <span>{article.date}</span>
                        <span>•</span>
                        <span>{article.readTime}</span>
                      </div>

                      <h4 className="font-display font-black text-sm leading-snug group-hover:text-amber-500 transition-colors line-clamp-2">
                        {article.title}
                      </h4>

                      <p className="text-xs text-zinc-550 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                        {article.summary}
                      </p>

                      <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800">
                        <span className="text-[11px] font-display font-bold text-zinc-600 dark:text-zinc-400">{article.author}</span>
                        <div className="flex items-center space-x-1 text-[10px] font-mono text-zinc-400">
                          <span className="flex items-center gap-0.5"><Eye className="w-3 h-3" /> {article.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SECTION 2: TOP TRENDING (Sedang Populer) */}
          <div id="section-top-trending" className="space-y-6 scroll-mt-20">
            <div className="flex items-center gap-2 border-b-2 border-zinc-100 dark:border-zinc-805 pb-3">
              <span className="p-1 px-1.5 text-xs font-mono font-black bg-rose-500 text-white rounded uppercase flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 mr-1" /> HOT FEEDS
              </span>
              <div>
                <h3 className="font-display font-black text-base sm:text-lg text-zinc-955 dark:text-zinc-50 leading-none">
                  Top Trending Minggu Ini
                </h3>
                <p className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider mt-1">
                  Arus bahasan, narasi, dan diskusi aset kritikal paling dominan di jagat maya
                </p>
              </div>
            </div>

            {/* Dense lists with Rank indicators */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {trendingArticles.map((article, idx) => {
                const colors = [
                  'border-amber-400 text-amber-500', 
                  'border-orange-500 text-orange-500', 
                  'border-rose-500 text-rose-500'
                ];
                const activeColor = colors[idx] || 'border-zinc-400 text-zinc-400';

                return (
                  <div
                    key={`trending-${article.id}`}
                    onClick={() => onSelectArticle(article)}
                    className="group cursor-pointer p-5 bg-zinc-50 dark:bg-zinc-902 rounded-2xl border-2 border-zinc-200 dark:border-zinc-800 hover:border-zinc-950 dark:hover:border-amber-400 relative overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Big rank number */}
                      <div className="flex items-center justify-between">
                        <span className={`w-10 h-10 rounded-xl border-2 ${activeColor} bg-white dark:bg-zinc-952 font-mono font-black text-lg flex items-center justify-center shadow-xs`}>
                          0{idx + 1}
                        </span>
                        <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-200/50 dark:bg-zinc-800 text-zinc-500">
                          {article.category}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <h4 className="font-display font-black text-sm group-hover:text-amber-500 dark:group-hover:text-amber-400 leading-snug transition-colors line-clamp-2">
                          {article.title}
                        </h4>
                        <p className="text-xs text-zinc-550 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                          {article.summary}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 mt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 text-[10px] font-mono text-zinc-420">
                      <span className="font-bold flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {article.views.toLocaleString()} kali dilihat</span>
                      <span className="font-semibold text-rose-500 flex items-center gap-0.5"><Heart className="w-3 h-3 fill-current" /> {article.likes}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* SECTION 3: KILAS BERITA RINGKAS 24 JAM */}
          <div id="crypto-kilas-bulletin-container" className="bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-800 rounded-3xl p-5 shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_rgba(251,191,36,0.1)] space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="p-1.5 bg-amber-400 text-zinc-950 rounded-lg font-bold">
                  <Flame className="w-4 h-4 text-zinc-950 animate-bounce" />
                </span>
                <div>
                  <h3 className="font-display font-black text-sm sm:text-base text-zinc-955 dark:text-zinc-50 leading-none">
                    Kilas Berita Kripto 24 Jam
                  </h3>
                  <p className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider mt-1">
                    Rangkuman kilat harian praktis • Diperbarui berkala
                  </p>
                </div>
              </div>
              <span className="text-[9px] font-mono font-extrabold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-550/20 px-2.5 py-1 rounded-lg">
                SIARAN LIVE
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              {[
                {
                  id: 'b-1',
                  title: 'Akumulasi Whale Pasca-Halving',
                  desc: 'On-chain analytics melacak aliran dana masuk misterius senilai $45 Juta ke dompet whale dalam 12 jam terakhir.',
                  time: '15 Mnt Lalu',
                  badge: 'Whale Alert'
                },
                {
                  id: 'b-2',
                  title: 'Stabilitas Stablecoin Hong Kong',
                  desc: 'Otoritas moneter mempercepat perizinan untuk 3 bursa institusi pengelola stablecoin baru di bursa lokal.',
                  time: '2 Jam Lalu',
                  badge: 'Regulasi'
                },
                {
                  id: 'b-3',
                  title: 'Upgrade Nitro L2 Arbitrum',
                  desc: 'Patch skalabilitas Nitro sukses diaktifkan. Biaya rollup sekunder terpantau hemat 9% secara modular.',
                  time: '5 Jam Lalu',
                  badge: 'L2 Tech'
                }
              ].map(bulletin => (
                <div 
                  key={bulletin.id}
                  className="p-4 bg-zinc-50 dark:bg-zinc-952 rounded-2xl border border-zinc-200 dark:border-zinc-850 hover:border-amber-400 dark:hover:border-amber-400 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 rounded text-[8px] font-mono font-black uppercase tracking-wider bg-amber-400/10 text-amber-500 border border-amber-400/20">
                        {bulletin.badge}
                      </span>
                      <span className="text-[9px] font-mono font-bold text-zinc-400">{bulletin.time}</span>
                    </div>
                    <h4 className="font-display font-black text-xs text-zinc-950 dark:text-zinc-100 line-clamp-1">
                      {bulletin.title}
                    </h4>
                    <p className="text-[11px] text-zinc-550 dark:text-zinc-400 leading-relaxed line-clamp-3">
                      {bulletin.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 4: BARU COBA / SEMUA BERITA TERBARU (Recent Feeds) */}
          <div id="section-berita-terbaru" className="space-y-6 scroll-mt-20">
            <div className="flex items-center gap-2 border-b-2 border-zinc-100 dark:border-zinc-805 pb-3">
              <span className="p-1 px-1.5 text-xs font-mono font-black bg-emerald-500 text-white rounded uppercase flex items-center justify-center">
                <Clock className="w-3.5 h-3.5 mr-1" /> FEEDS
              </span>
              <div>
                <h3 className="font-display font-black text-base sm:text-lg text-zinc-955 dark:text-zinc-50 leading-none">
                  Semua Kabar Terbaru
                </h3>
                <p className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider mt-1">
                  Arus dokumentasi, rilis harian, dan analisis mendalam dari seluruh ekosistem
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentArticles.map(article => (
                <div
                  id={`blog-card-recent-${article.id}`}
                  key={article.id}
                  onClick={() => onSelectArticle(article)}
                  className="group cursor-pointer bg-white text-zinc-900 rounded-2xl border-2 border-zinc-900 overflow-hidden shadow-[4px_4px_0_rgba(0,0,0,1)] hover:shadow-[4px_4px_0_rgba(245,158,11,1)] dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-800 dark:shadow-[4px_4px_0_rgba(251,191,36,0.1)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative aspect-video overflow-hidden border-b-2 border-zinc-900 dark:border-zinc-805">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <span className="absolute top-3 left-3 text-[9px] font-mono font-extrabold bg-amber-400 text-zinc-950 px-2 py-0.5 rounded border border-zinc-950 uppercase tracking-widest">
                      {article.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-3.5">
                    <div className="flex items-center justify-between text-[10px] font-mono font-bold text-zinc-455 uppercase">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-display font-black text-sm sm:text-base leading-tight group-hover:text-amber-500 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                      {article.summary}
                    </p>

                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {article.tags.map(t => (
                          <button
                            key={t}
                            onClick={(e) => {
                              e.stopPropagation();
                              onSelectTag(t);
                            }}
                            className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-300 hover:bg-amber-400 hover:text-zinc-950 dark:hover:bg-amber-400 dark:hover:text-zinc-950 border border-zinc-200 dark:border-zinc-700 transition-colors cursor-pointer"
                          >
                            #{t}
                          </button>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-800">
                      <div className="flex items-center space-x-1.5 truncate">
                        <img
                          src={article.authorAvatar}
                          alt={article.author}
                          className="w-6 h-6 rounded-full object-cover border border-zinc-200 dark:border-zinc-700 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                        <span className="text-[11px] font-display font-bold text-zinc-700 dark:text-zinc-300 truncate">{article.author}</span>
                      </div>

                      <div className="flex items-center space-x-2 text-[10px] font-mono text-zinc-400 shrink-0">
                        <span className="flex items-center gap-0.5 text-rose-500"><Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />{article.likes}</span>
                        <span className="flex items-center gap-0.5"><MessageSquare className="w-3.5 h-3.5" />{article.commentsCount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* SECTION: Bento Hub - Kalkulator & Polling Sentimen */}
      {!searchQuery && (
        <div id="crypto-bento-interactive-hub" className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4">
          
          {/* Bento Box 1: Kalkulator Instan (Spans 6 cols) */}
          <div className="md:col-span-6 bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-800 rounded-3xl p-6 shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_rgba(251,191,36,0.1)] space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="p-1 bg-amber-400 text-zinc-950 rounded">
                  <ArrowLeftRight className="w-4 h-4 text-zinc-950" />
                </span>
                <h3 className="font-display font-black text-sm text-zinc-950 dark:text-zinc-100 uppercase tracking-tight">
                  Kalkulator Nilai Kripto Instan
                </h3>
              </div>
              <p className="text-xs text-zinc-500 leading-normal">
                Kalkulasikan langsung konversi aset kripto terpopuler ke mata uang Rupiah (IDR) dan USD secara presisi.
              </p>
            </div>

            <div className="space-y-3.5 pt-2">
              {/* Input field amount */}
              <div className="space-y-1">
                <label className="text-[9px] font-mono font-black uppercase text-zinc-400">Jumlah Token</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={calcValue}
                    onChange={(e) => setCalcValue(Number(e.target.value) || 0)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-952 outline-none focus:border-amber-400 text-zinc-900 dark:text-white font-mono font-bold"
                  />
                  <select
                    value={selectedCalcCoin}
                    onChange={(e) => setSelectedCalcCoin(e.target.value)}
                    className="px-3 py-2 text-xs rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-952 outline-none focus:border-amber-400 text-zinc-900 dark:text-white font-bold"
                  >
                    <option value="BTC">BTC</option>
                    <option value="ETH">ETH</option>
                    <option value="SOL">SOL</option>
                    <option value="XRP">XRP</option>
                  </select>
                </div>
              </div>

              {/* Converted Output Display values */}
              <div className="p-4 bg-zinc-50 dark:bg-zinc-952 rounded-2xl border border-zinc-200 dark:border-zinc-850 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-zinc-455 uppercase font-bold">Setara USD</span>
                  <span className="text-xs sm:text-sm font-mono font-black text-zinc-950 dark:text-zinc-50">
                    ${resultUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center justify-between border-t border-zinc-200/50 dark:border-zinc-805/50 pt-2">
                  <span className="text-[10px] font-mono text-zinc-455 uppercase font-bold text-amber-500">Estimasi Rupiah (IDR)</span>
                  <span className="text-xs sm:text-sm font-mono font-black text-amber-500">
                    Rp {resultIDR.toLocaleString('id-ID', { maximumFractionDigits: 0 })}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-[9px] font-mono font-bold text-zinc-400 uppercase text-center pt-2">
              Kurs: $1 USD = Rp 16.250 • Terkoneksi API Feed
            </div>
          </div>

          {/* Bento Box 2: Polling Sentimen Komunitas (Spans 6 cols) */}
          <div className="md:col-span-6 bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-800 rounded-3xl p-6 shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_rgba(251,191,36,0.1)] space-y-4 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-1.5">
                <span className="p-1 bg-amber-400 text-zinc-950 rounded">
                  <TrendingUp className="w-4 h-4 text-zinc-950" />
                </span>
                <h3 className="font-display font-black text-sm text-zinc-950 dark:text-zinc-100 uppercase tracking-tight">
                  Mood Pasar Komunitas Hari Ini
                </h3>
              </div>
              <p className="text-xs text-zinc-500 leading-normal">
                Bagaimana prediksi pergerakan pasar Anda dalam 24 jam mendatang? Berikan pilihan Anda dan lihat statistik live.
              </p>
            </div>

            {/* Voting Area or Voted Bar display */}
            <div className="space-y-3 pt-1">
              {votedOption ? (
                /* Voted State progress bars */
                <div className="space-y-3 p-3 bg-zinc-50 dark:bg-zinc-952 rounded-2xl border border-zinc-205 dark:border-zinc-850">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-emerald-500">🟢 Bullish (Naik)</span>
                      <span>{percentBullish}%</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden text-[9px]">
                      <div className="bg-emerald-505 bg-emerald-550 h-full transition-all duration-500" style={{ width: `${percentBullish}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-rose-500">🔴 Bearish (Turun)</span>
                      <span>{percentBearish}%</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden text-[9px]">
                      <div className="bg-rose-505 bg-rose-550 h-full transition-all duration-500" style={{ width: `${percentBearish}%` }}></div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-zinc-400">⚪ Netral / Konsolidasi</span>
                      <span>{percentNeutral}%</span>
                    </div>
                    <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden text-[9px]">
                      <div className="bg-zinc-400 h-full transition-all duration-500" style={{ width: `${percentNeutral}%` }}></div>
                    </div>
                  </div>

                  <p className="text-[10px] text-center font-bold text-amber-500 pt-1">
                    Terima kasih atas partisipasi Anda! Pilihan Anda: <span className="uppercase font-black text-zinc-900 dark:text-white px-1.5 py-0.5 rounded bg-amber-400 text-[9px]">{votedOption}</span>
                  </p>
                </div>
              ) : (
                /* Unvoted State interaction */
                <div className="grid grid-cols-3 gap-2.5">
                  <button
                    onClick={() => handleVote('bullish')}
                    className="py-3 px-2 rounded-2xl border border-emerald-500 hover:bg-emerald-500/10 text-emerald-500 text-xs font-black transition-all flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <span className="text-base">🚀</span>
                    <span>BULLISH</span>
                  </button>
                  <button
                    onClick={() => handleVote('bearish')}
                    className="py-3 px-2 rounded-2xl border border-rose-500 hover:bg-rose-505/10 text-rose-500 text-xs font-black transition-all flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <span className="text-base">📉</span>
                    <span>BEARISH</span>
                  </button>
                  <button
                    onClick={() => handleVote('neutral')}
                    className="py-3 px-2 rounded-2xl border border-zinc-400 hover:bg-zinc-500/10 text-zinc-500 dark:text-zinc-400 text-xs font-black transition-all flex flex-col items-center gap-1 cursor-pointer"
                  >
                    <span className="text-base">⚖️</span>
                    <span>NETRAL</span>
                  </button>
                </div>
              )}
            </div>

            <div className="text-[9px] font-mono font-bold text-zinc-400 uppercase text-center pt-2">
              🗳️ {totalVotes} Suara Terdaftar • Di-reset Setiap 24 Jam
            </div>
          </div>

        </div>
      )}

      {/* 3. Inline Newsletter Subscription card midway */}
      <div className="pt-6">
        <Newsletter />
      </div>

    </div>
  );
}
