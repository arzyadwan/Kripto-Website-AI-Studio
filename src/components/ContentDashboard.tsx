import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import { 
  Plus, Edit, Trash2, LayoutDashboard, Search, FileText, BarChart3, 
  ArrowLeft, Save, Eye, Heart, MessageSquare, Loader2, Sparkles, Tag, X, Image as ImageIcon
} from 'lucide-react';

interface ContentDashboardProps {
  onArticlesUpdated: (articles: Article[]) => void;
  onAddNotification: (title: string, message: string, type: 'news' | 'price' | 'analysis') => void;
  onNavigateHome: () => void;
}

export default function ContentDashboard({ 
  onArticlesUpdated, 
  onAddNotification,
  onNavigateHome
}: ContentDashboardProps) {
  // App states
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search & Filter queries
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('Semua');

  // Form states
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  // Form fields
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<'Berita' | 'Analisis' | 'Edukasi' | 'Regulasi'>('Berita');
  const [summary, setSummary] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [readTime, setReadTime] = useState<string>('');
  const [tagsInput, setTagsInput] = useState<string>('');
  const [views, setViews] = useState<number>(0);
  const [likes, setLikes] = useState<number>(0);

  // Delete Confirmation state
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Toast alert
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  // Suggested preset images
  const COVER_PRESETS = [
    { name: 'Bitcoin Gold', url: 'https://images.unsplash.com/photo-1516245834210-c4c142787335?q=80&w=600&auto=format&fit=crop' },
    { name: 'Ethereum Glow', url: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=600&auto=format&fit=crop' },
    { name: 'Hardware Wallet', url: 'https://images.unsplash.com/photo-1633156189779-b1417839f371?q=80&w=600&auto=format&fit=crop' },
    { name: 'AI Machine', url: 'https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop' },
    { name: 'Bento Stats', url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop' },
    { name: 'Secure Database', url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=600&auto=format&fit=crop' },
  ];

  // Fetch articles from backend API
  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/articles');
      if (!response.ok) {
        throw new Error('Gagal memuat daftar berita dari server backend.');
      }
      const data: Article[] = await response.json();
      setArticles(data);
      onArticlesUpdated(data);
    } catch (err: any) {
      setError(err?.message || 'Koneksi ke server backend gagal.');
      // Handle fallback from localStorage if server not fully online yet
      const saved = localStorage.getItem('kriptokini_articles');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setArticles(parsed);
        } catch (e) {}
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  // Toast trigger helper
  const triggerToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  // Open form to Create
  const handleOpenCreate = () => {
    setEditingArticle(null);
    setTitle('');
    setCategory('Berita');
    setSummary('');
    setContent('');
    setImage(COVER_PRESETS[0].url);
    setAuthor('Rama Wijaya');
    setReadTime('4 menit baca');
    setTagsInput('Bitcoin, Analisis, Tren');
    setViews(Math.floor(Math.random() * 50) + 10);
    setLikes(Math.floor(Math.random() * 15));
    setFormError(null);
    setIsFormOpen(true);
  };

  // Open form to Edit
  const handleOpenEdit = (article: Article) => {
    setEditingArticle(article);
    setTitle(article.title);
    setCategory(article.category);
    setSummary(article.summary);
    setContent(article.content);
    setImage(article.image);
    setAuthor(article.author);
    setReadTime(article.readTime);
    setTagsInput(article.tags ? article.tags.join(', ') : '');
    setViews(article.views);
    setLikes(article.likes);
    setFormError(null);
    setIsFormOpen(true);
  };

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    // Validation
    if (!title.trim()) {
      setFormError('Judul artikel wajib diisi.');
      return;
    }
    if (!summary.trim()) {
      setFormError('Ringkasan artikel wajib diisi.');
      return;
    }
    if (!content.trim()) {
      setFormError('Konten lengkap artikel wajib diisi.');
      return;
    }

    setSaving(true);

    const parsedTags = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const payload = {
      title: title.trim(),
      summary: summary.trim(),
      content: content.trim(),
      category,
      image: image.trim(),
      author: author.trim() || 'Rama Wijaya',
      readTime: readTime.trim() || '4 menit baca',
      tags: parsedTags,
      views,
      likes
    };

    try {
      let response;
      if (editingArticle) {
        // Edit flow
        response = await fetch(`/api/articles/${editingArticle.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        // Create flow
        response = await fetch('/api/articles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      }

      if (!response.ok) {
        throw new Error('Gagal menyimpan konten ke server database.');
      }

      const updatedData = await response.json();
      
      await fetchArticles(); // re-fetch list

      triggerToast(
        editingArticle 
          ? `Artikel "${title.slice(0, 30)}..." berhasil diperbarui!` 
          : `Artikel Baru "${title.slice(0, 30)}..." sukses dipublikasikan!`,
        'success'
      );

      // Trigger automatic live broadcast notifications
      onAddNotification(
        editingArticle ? 'Konten Diperbarui' : 'Berita Baru Dipublikasikan!',
        `Artikel "${title.slice(0, 45)}..." telah ${editingArticle ? 'disunting' : 'ditambahkan'} oleh tim editor kami.`,
        category === 'Analisis' ? 'analysis' : 'news'
      );

      setIsFormOpen(false);
    } catch (err: any) {
      setFormError(err?.message || 'Koneksi bermasalah saat menyimpan data.');
      triggerToast('Gagal menyimpan konten ke server.', 'error');
    } finally {
      setSaving(false);
    }
  };

  // Delete article Handler
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/articles/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Gagal menghapus artikel dari database.');
      }

      await fetchArticles();
      triggerToast('Artikel beserta komentarnya sukses dihapus permanent!', 'success');
      setDeleteConfirmId(null);
    } catch (err: any) {
      triggerToast(err?.message || 'Gagal menghapus konten.', 'error');
    }
  };

  // Filter and Search calculations
  const filteredArticles = articles.filter(art => {
    const matchesSearch = 
      art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (art.tags && art.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    
    const matchesCategory = categoryFilter === 'Semua' || art.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  // Calculate high-level metrics
  const totalArticlesCount = articles.length;
  const totalViewsAccumulated = articles.reduce((sum, art) => sum + (art.views || 0), 0);
  const totalLikesAccumulated = articles.reduce((sum, art) => sum + (art.likes || 0), 0);

  const categoryCounts = {
    Berita: articles.filter(a => a.category === 'Berita').length,
    Analisis: articles.filter(a => a.category === 'Analisis').length,
    Edukasi: articles.filter(a => a.category === 'Edukasi').length,
    Regulasi: articles.filter(a => a.category === 'Regulasi').length,
  };

  return (
    <div id="cms-dashboard-root" className="space-y-6">
      
      {/* Toast alert popup box */}
      {toast && (
        <div 
          id="toast-dashboard-alert"
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl border-2 shadow-lg max-w-md animate-bounce ${
            toast.type === 'success' 
              ? 'bg-emerald-50 border-emerald-500 text-emerald-900 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-100'
              : 'bg-rose-50 border-rose-500 text-rose-900 dark:bg-rose-950 dark:border-rose-800 dark:text-rose-100'
          }`}
        >
          <Sparkles className={`w-5 h-5 shrink-0 ${toast.type === 'success' ? 'text-emerald-500' : 'text-rose-500'}`} />
          <span className="text-xs font-bold">{toast.message}</span>
        </div>
      )}

      {/* Title Header area */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-zinc-100 dark:border-zinc-805 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="p-1 px-1.5 bg-zinc-900 text-amber-400 dark:bg-zinc-800 rounded font-mono text-[10px] font-bold uppercase tracking-wider">
              ADMIN SPACE
            </span>
            <span className="text-zinc-400 font-bold text-xs">•</span>
            <span className="text-xs font-bold text-emerald-500 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span> DB Terkoneksi (Local JSON File)
            </span>
          </div>
          <h2 className="font-display font-black text-2xl tracking-tight leading-none text-zinc-950 dark:text-zinc-50 flex items-center gap-2">
            <LayoutDashboard className="w-6 h-6 text-amber-500 text-amber-400" /> CMS Manajemen Berita
          </h2>
          <p className="text-xs text-zinc-400">
            Unggah, sunting, hapus, dan tinjau seluruh artikel dan analitika data KriptoKini secara instan.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <button
            id="cms-home-back-btn"
            onClick={onNavigateHome}
            className="px-4 py-2 text-xs font-bold bg-zinc-100 text-zinc-800 rounded-xl hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Kembali Ke Portal
          </button>
          
          <button
            id="cms-new-article-btn"
            onClick={handleOpenCreate}
            className="px-4 py-2 text-xs font-black bg-amber-400 text-zinc-950 rounded-xl hover:bg-amber-500 border-2 border-zinc-950 shadow-[3px_3px_0_#000] dark:shadow-[3px_3px_0_rgba(251,191,36,0.2)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4 text-zinc-950 font-black" /> Publikasikan Berita
          </button>
        </div>
      </div>

      {/* Global Analytics Overview Cards section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="p-5 bg-white border-2 border-zinc-950 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl shadow-[3px_3px_0_#000] dark:shadow-[3px_3px_0_rgba(251,191,36,0.05)] flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">Total Publikasi</p>
            <h3 className="font-display font-black text-3xl font-mono text-zinc-950 dark:text-zinc-50">
              {totalArticlesCount} <span className="text-xs font-sans text-zinc-400 font-bold">Artikel</span>
            </h3>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-zinc-400 rounded-xl">
            <FileText className="w-6 h-6 text-amber-500 text-amber-450" />
          </div>
        </div>

        <div className="p-5 bg-white border-2 border-zinc-950 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl shadow-[3px_3px_0_#000] dark:shadow-[3px_3px_0_rgba(251,191,36,0.05)] flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">Akumulasi Pembaca</p>
            <h3 className="font-display font-black text-3xl font-mono text-zinc-955 dark:text-zinc-55">
              {totalViewsAccumulated.toLocaleString()} <span className="text-xs font-sans text-zinc-400 font-bold">Views</span>
            </h3>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-955 border border-zinc-205 dark:border-zinc-800 text-emerald-500 rounded-xl">
            <BarChart3 className="w-6 h-6 text-emerald-500" />
          </div>
        </div>

        <div className="p-5 bg-white border-2 border-zinc-950 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl shadow-[3px_3px_0_#000] dark:shadow-[3px_3px_0_rgba(251,191,36,0.05)] flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-[10px] font-mono font-bold tracking-widest text-zinc-400 uppercase">Interaksi Suka (Likes)</p>
            <h3 className="font-display font-black text-3xl font-mono text-zinc-950 dark:text-zinc-50">
              {totalLikesAccumulated.toLocaleString()} <span className="text-xs font-sans text-zinc-400 font-bold">Likes</span>
            </h3>
          </div>
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-rose-500 rounded-xl">
            <Heart className="w-6 h-6 text-rose-500 fill-current" />
          </div>
        </div>
      </div>

      {/* Category breakdown stats pills */}
      <div className="p-4 bg-zinc-100 dark:bg-zinc-950/40 border border-zinc-200 dark:border-zinc-800 rounded-xl flex flex-wrap items-center justify-between gap-4">
        <span className="text-xs font-mono font-bold text-zinc-500">Distribusi Kategori Konten:</span>
        <div className="flex flex-wrap gap-2 text-xs">
          <span className="px-3 py-1 bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 font-semibold shadow-xs">
            📢 Berita: <strong className="font-black font-mono text-amber-500">{categoryCounts.Berita}</strong>
          </span>
          <span className="px-3 py-1 bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 font-semibold shadow-xs">
            📈 Analisis: <strong className="font-black font-mono text-amber-500">{categoryCounts.Analisis}</strong>
          </span>
          <span className="px-3 py-1 bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 font-semibold shadow-xs">
            🎓 Edukasi: <strong className="font-black font-mono text-amber-500">{categoryCounts.Edukasi}</strong>
          </span>
          <span className="px-3 py-1 bg-white border border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 rounded-lg text-zinc-700 dark:text-zinc-300 font-semibold shadow-xs">
            ⚖️ Regulasi: <strong className="font-black font-mono text-amber-500">{categoryCounts.Regulasi}</strong>
          </span>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center space-y-3">
          <Loader2 className="w-10 h-10 animate-spin text-amber-400 mx-auto" />
          <p className="text-xs text-zinc-400 font-mono">Menghubungi server dan menyinkronkan database...</p>
        </div>
      ) : error && articles.length === 0 ? (
        <div className="p-8 bg-zinc-105 border border-zinc-200 rounded-2xl text-center space-y-2 dark:bg-zinc-900 dark:border-zinc-800">
          <p className="text-sm font-bold text-zinc-750 dark:text-zinc-350">{error}</p>
          <p className="text-xs text-zinc-400">Silakan muat kembali halaman dan pastikan backend portal telah berjalan.</p>
        </div>
      ) : (
        <div className="space-y-4">
          
          {/* Filters Bar: Search, Category dropdown, total item counters */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-zinc-900 duration-300 p-4 border-2 border-zinc-955 dark:border-zinc-800 rounded-2xl shadow-xs">
            <div className="relative flex-grow max-w-md group">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 group-focus-within:text-amber-500 transition-colors" />
              <input
                id="cms-search-input"
                type="text"
                placeholder="Cari judul artikel, penulis, atau tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-zinc-200 bg-zinc-50 outline-none focus:border-amber-440 focus:ring-1 focus:ring-amber-200 dark:bg-zinc-950 dark:border-zinc-800 placeholder:text-zinc-400 text-zinc-900 dark:text-white"
              />
            </div>

            <div className="flex items-center gap-2 self-start md:self-center">
              <span className="text-[11px] font-mono text-zinc-400">Kategori:</span>
              <select
                id="cms-category-filter"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-lg border border-zinc-200 bg-zinc-55 outline-none focus:border-amber-400 dark:bg-zinc-950 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 bg-white"
              >
                <option value="Semua">Semua Kategori</option>
                <option value="Berita">Berita</option>
                <option value="Analisis">Analisis</option>
                <option value="Edukasi">Edukasi</option>
                <option value="Regulasi">Regulasi</option>
              </select>

              <span className="text-xs text-zinc-500 font-mono font-bold ml-2 shrink-0">
                {filteredArticles.length} dari {totalArticlesCount} ditemukan
              </span>
            </div>
          </div>

          {/* MAIN CMS TABLE GRID LIST */}
          {filteredArticles.length === 0 ? (
            <div className="p-16 border-2 border-zinc-950 border-dashed dark:border-zinc-800 rounded-3xl text-center text-zinc-400 space-y-2">
              <FileText className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mx-auto" />
              <h4 className="font-display font-black text-sm text-zinc-800 dark:text-zinc-200">Tidak ada artikel yang cocok</h4>
              <p className="text-xs">Coba ubah kata kunci pencarian Anda atau periksa filter kategori di atas.</p>
            </div>
          ) : (
            <div className="bg-white border-2 border-zinc-950 dark:bg-zinc-900 dark:border-zinc-800 rounded-2xl shadow-[4px_4px_0_#000] dark:shadow-[4px_4px_0_rgba(251,191,36,0.05)] overflow-hidden">
              <div className="overflow-x-auto">
                <table id="cms-articles-list-table" className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-zinc-100 dark:bg-zinc-950/70 text-[10px] font-mono font-black uppercase tracking-wider text-zinc-500 border-b-2 border-zinc-950 dark:border-zinc-800">
                      <th className="py-3 px-4">Sampul & Judul Artikel</th>
                      <th className="py-3 px-4 hidden md:table-cell">Kategori</th>
                      <th className="py-3 px-4 hidden sm:table-cell">Penulis</th>
                      <th className="py-3 px-4 hidden lg:table-cell">Tanggal</th>
                      <th className="py-3 px-4 text-center">Statistik</th>
                      <th className="py-3 px-4 text-right">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-xs text-zinc-700 dark:text-zinc-300">
                    {filteredArticles.map((article) => (
                      <tr 
                        id={`cms-table-row-${article.id}`}
                        key={article.id}
                        className="hover:bg-zinc-50 dark:hover:bg-zinc-850/30 transition-colors"
                      >
                        {/* Sampul & Judul */}
                        <td className="py-3 px-4 max-w-sm">
                          <div className="flex items-center gap-3">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-14 h-10 object-cover rounded-md border border-zinc-300 dark:border-zinc-700 shrink-0"
                              referrerPolicy="no-referrer"
                            />
                            <div className="space-y-1">
                              <h4 className="font-bold text-zinc-950 dark:text-zinc-100 line-clamp-1">
                                {article.title}
                              </h4>
                              <p className="text-[10px] text-zinc-400 font-medium line-clamp-1">
                                {article.summary}
                              </p>
                              <div className="flex flex-wrap gap-1 md:hidden">
                                <span className={`px-1.5 py-0.5 rounded text-[8px] font-mono font-black border uppercase ${
                                  article.category === 'Analisis' ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/20 dark:border-indigo-800 dark:text-indigo-400' :
                                  article.category === 'Regulasi' ? 'bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-950/20 dark:border-amber-800 dark:text-amber-400' :
                                  article.category === 'Edukasi' ? 'bg-sky-50 border-sky-200 text-sky-600 dark:bg-sky-950/20 dark:border-sky-800 dark:text-sky-400' :
                                  'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-450'
                                }`}>
                                  {article.category}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>

                        {/* Kategori */}
                        <td className="py-3 px-4 hidden md:table-cell shrink-0">
                          <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-black border uppercase shadow-2xs ${
                            article.category === 'Analisis' ? 'bg-indigo-50 border-indigo-200 text-indigo-600 dark:bg-indigo-950/20 dark:border-indigo-800 dark:text-indigo-400' :
                            article.category === 'Regulasi' ? 'bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-950/20 dark:border-amber-800 dark:text-amber-400' :
                            article.category === 'Edukasi' ? 'bg-sky-50 border-sky-200 text-sky-600 dark:bg-sky-950/20 dark:border-sky-800 dark:text-sky-400' :
                            'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-950/20 dark:border-emerald-800 dark:text-emerald-450'
                          }`}>
                            {article.category}
                          </span>
                        </td>

                        {/* Penulis */}
                        <td className="py-3 px-4 hidden sm:table-cell font-bold text-zinc-650 dark:text-zinc-250 font-display">
                          {article.author}
                        </td>

                        {/* Tanggal */}
                        <td className="py-3 px-4 hidden lg:table-cell text-zinc-400 font-mono text-[10px]">
                          {article.date}
                        </td>

                        {/* Statistik */}
                        <td className="py-3 px-4 text-center">
                          <div className="flex items-center justify-center gap-2.5 font-mono text-[10px] text-zinc-400">
                            <span className="flex items-center gap-0.5" title="Views"><Eye className="w-3.5 h-3.5" />{article.views || 0}</span>
                            <span className="flex items-center gap-0.5" title="Likes"><Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />{article.likes || 0}</span>
                            <span className="flex items-center gap-0.5" title="Comments"><MessageSquare className="w-3.5 h-3.5" />{article.commentsCount || 0}</span>
                          </div>
                        </td>

                        {/* Tindakan */}
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            
                            {/* Confirmation toggle */}
                            {deleteConfirmId === article.id ? (
                              <div className="flex items-center gap-1 p-1 bg-rose-50 border border-rose-200 rounded-lg dark:bg-rose-950/40 dark:border-rose-900">
                                <span className="text-[10px] font-mono font-bold text-rose-500 px-1">Yakin?</span>
                                <button
                                  onClick={() => handleDelete(article.id)}
                                  className="px-1.5 py-0.5 bg-rose-500 text-white rounded text-[10px] font-bold hover:bg-rose-600 cursor-pointer"
                                >
                                  Ya
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(null)}
                                  className="px-1.5 py-0.5 bg-zinc-250 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 rounded text-[10px] font-bold hover:opacity-90 cursor-pointer"
                                >
                                  Tidak
                                </button>
                              </div>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleOpenEdit(article)}
                                  className="p-1.5 text-zinc-500 hover:text-amber-500 hover:bg-zinc-50 dark:hover:bg-zinc-800 rounded-lg border border-zinc-200/40 hover:border-amber-400/50 transition-all cursor-pointer"
                                  title="Edit Artikel"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  onClick={() => setDeleteConfirmId(article.id)}
                                  className="p-1.5 text-zinc-500 hover:text-rose-500 hover:bg-rose-50/10 dark:hover:bg-zinc-800 rounded-lg border border-zinc-200/40 hover:border-rose-400/50 transition-all cursor-pointer"
                                  title="Hapus Artikel"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}

                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FORM MODAL PANEL (SLIDE / MODAL) */}
      {isFormOpen && (
        <div 
          id="cms-form-modal"
          className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/60 dark:bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div className="bg-white dark:bg-zinc-900 border-2 border-zinc-950 dark:border-zinc-800 rounded-3xl w-full max-w-2xl p-6 sm:p-7 shadow-[5px_5px_0px_rgba(0,0,0,1)] dark:shadow-[5px_5px_0px_rgba(251,191,36,0.15)] space-y-5 animate-in slide-in-from-bottom duration-300 relative">
            
            {/* Close button */}
            <button
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 p-1.5 text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-50 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:scale-105 transition-all cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Form Title */}
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-black text-amber-500 uppercase">
                {editingArticle ? 'SUNTING KONTEN' : 'INPUT BERITA BARU'}
              </span>
              <h3 className="font-display font-black text-xl text-zinc-950 dark:text-zinc-50 leading-none">
                {editingArticle ? 'Sunting Artikel KriptoKini' : 'Tulis & Terbitkan Artikel Baru'}
              </h3>
            </div>

            {formError && (
              <div className="p-3 bg-rose-50 border-2 border-rose-500 rounded-xl text-rose-900 text-xs font-bold dark:bg-rose-950/20 dark:border-rose-900 dark:text-rose-300">
                ⚠️ {formError}
              </div>
            )}

            {/* Core input fields inside Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Judul */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Judul Artikel *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Contoh: Perkembangan Regulasi CFTC Dan Masa Depan Aset Meme"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border-2 border-zinc-150 bg-white outline-none focus:border-amber-400 dark:border-zinc-800 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
                  />
                </div>

                {/* 2. Kategori */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Kategori Utama *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border-2 border-zinc-150 bg-white outline-none focus:border-amber-400 dark:border-zinc-800 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
                  >
                    <option value="Berita">📢 Berita (News Update)</option>
                    <option value="Analisis">📈 Analisis (Technical / Macro)</option>
                    <option value="Edukasi">🎓 Edukasi (Core Knowledge)</option>
                    <option value="Regulasi">⚖️ Regulasi (Policies)</option>
                  </select>
                </div>

                {/* 3. Waktu Baca */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Estimasi Membaca</label>
                  <input
                    type="text"
                    value={readTime}
                    onChange={(e) => setReadTime(e.target.value)}
                    placeholder="Contoh: 4 menit baca"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border-2 border-zinc-150 bg-white outline-none focus:border-amber-400 dark:border-zinc-800 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
                  />
                </div>

                {/* 4. Penulis */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Nama Penulis / Editor</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border-2 border-zinc-150 bg-white outline-none focus:border-amber-400 dark:border-zinc-800 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
                  />
                </div>

                {/* 5. Tags */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Aset / Tags (Pisahkan koma)</label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    placeholder="Contoh: Bitcoin, Regulasi, SEC, ETF"
                    className="w-full px-3.5 py-2 text-xs rounded-xl border-2 border-zinc-150 bg-white outline-none focus:border-amber-400 dark:border-zinc-800 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50"
                  />
                </div>

                {/* 6. Ringkasan Singkat */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Deskripsi Ringkasan Singkat *</label>
                  <textarea
                    rows={2}
                    required
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Tuliskan rangkuman eksekutif singkat satu paragraf di sini..."
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl border-2 border-zinc-150 bg-white outline-none focus:border-amber-400 dark:border-zinc-800 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 resize-none"
                  />
                </div>

                {/* 7. Konten Penuh */}
                <div className="space-y-1.5 md:col-span-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-600 dark:text-zinc-300">Konten Artikel Lengkap *</label>
                    <span className="text-[9px] font-mono text-zinc-400">Gunakan Markdown jika suka</span>
                  </div>
                  <textarea
                    rows={5}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Tuliskan gagasan utama, temuan, atau pembahasan lengkap di sini..."
                    className="w-full px-3.5 py-3.5 text-xs rounded-xl border-2 border-zinc-150 bg-white outline-none focus:border-amber-400 dark:border-zinc-800 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-sans"
                  />
                </div>

                {/* 8. Cover Image Selectors */}
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-bold text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" /> URL Gambar Cover Artikel
                  </label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border-2 border-zinc-150 bg-white outline-none focus:border-amber-400 dark:border-zinc-800 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 font-mono"
                  />
                  
                  {/* Preset quick picker templates */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-bold text-zinc-400 block mt-1">Preset Tema Cepat:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {COVER_PRESETS.map((p) => (
                        <button
                          key={p.name}
                          type="button"
                          onClick={() => setImage(p.url)}
                          className={`px-2 py-1 text-[10px] rounded border transition-colors cursor-pointer ${
                            image === p.url 
                              ? 'bg-amber-400 border-zinc-950 text-zinc-950 font-black'
                              : 'bg-zinc-50 border-zinc-200 text-zinc-600 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                          }`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-2 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-zinc-500 rounded-xl hover:bg-zinc-105 border border-zinc-200 dark:border-zinc-800 dark:text-zinc-400 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 text-xs font-black bg-emerald-400 text-zinc-950 rounded-xl hover:bg-emerald-500 border-2 border-zinc-950 shadow-[3px_3px_0_#000] dark:shadow-[3px_3px_0_rgba(16,185,129,0.2)] flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  {saving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Menyimpan...
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5 text-zinc-950" /> {editingArticle ? 'Simpan Suntingan' : 'Terbitkan Sekarang'}
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
