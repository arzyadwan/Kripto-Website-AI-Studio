import { useState, useEffect } from 'react';
import { INITIAL_COINS, MOCK_ARTICLES, MOCK_TECHNICAL_ANALYSIS, MOCK_COMMENTS } from './data/mockData';
import { Article, Comment, NotificationItem } from './types';
import PriceTicker from './components/PriceTicker';
import Navbar from './components/Navbar';
import TechnicalAnalysis from './components/TechnicalAnalysis';
import NewsBlog from './components/NewsBlog';
import ArticleDetail from './components/ArticleDetail';
import NotificationCenter from './components/NotificationCenter';
import PushToast from './components/PushToast';
import EducationScreen from './components/EducationScreen';
import CareerScreen from './components/CareerScreen';
import EventsScreen from './components/EventsScreen';
import AboutScreen from './components/AboutScreen';
import ContentDashboard from './components/ContentDashboard';
import { ShieldAlert, BookOpen, Sparkles, TrendingUp, HelpCircle, Heart, ChevronRight, Globe } from 'lucide-react';

export default function App() {
  // Theme state init
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('kriptokini_dark_mode');
    return saved === 'true';
  });

  // Active Screen page router
  const [activeScreen, setActiveScreen] = useState<'news' | 'education' | 'career' | 'events' | 'about' | 'dashboard'>('news');

  // Articles state initialized from mock data
  const [articles, setArticles] = useState<Article[]>(() => {
    const saved = localStorage.getItem('kriptokini_articles');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return MOCK_ARTICLES; }
    }
    return MOCK_ARTICLES;
  });

  // Comments state with localStorage backup
  const [comments, setComments] = useState<Comment[]>(() => {
    const saved = localStorage.getItem('kriptokini_comments');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return MOCK_COMMENTS; }
    }
    return MOCK_COMMENTS;
  });

  // Categories & Advanced Search states
  const [selectedCategory, setSelectedCategory] = useState<'Berita' | 'Analisis' | 'Edukasi' | 'Regulasi' | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Selected entities handles
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [selectedCoinSymbol, setSelectedCoinSymbol] = useState<string>('BTC');

  // Push notifications logs
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [activePushToast, setActivePushToast] = useState<NotificationItem | null>(null);

  // Informative interactive tips widget inside Sidebar
  const [activeTipIndex, setActiveTipIndex] = useState(0);
  const cryptoTips = [
    {
      title: "Gunakan 2FA Hardware Keys",
      desc: "Menghindari serangan SIM-swap dengan menggunakan kunci keamanan perangkat keras (YubiKey) jauh lebih aman dibandingkan SMS OTP.",
      category: "Keamanan"
    },
    {
      title: "Pahami Konsep Impairment Loss",
      desc: "Saat menyediakan likuiditas di Automated Market Makers (AMM), pergeseran rasio harga token dapat mengurangi nilai portofolio dibanding sekadar holding.",
      category: "DeFi Edukasi"
    },
    {
      title: "Jangan Asal Hubungkan Wallet!",
      desc: "Pastikan selalu memeriksa tanda tangan transaksi (signature). Kontrak pintar jahat dapat secara diam-diam memanggil fungsi approve() saldo Anda.",
      category: "Web3 Tips"
    }
  ];

  // Sync articles and comments to local storage on changes (Acts as backup cache)
  useEffect(() => {
    localStorage.setItem('kriptokini_articles', JSON.stringify(articles));
  }, [articles]);

  useEffect(() => {
    localStorage.setItem('kriptokini_comments', JSON.stringify(comments));
  }, [comments]);

  // Load backend data from REST API endpoints on Mount
  useEffect(() => {
    const syncWithBackend = async () => {
      try {
        const responseList = await fetch('/api/articles');
        if (responseList.ok) {
          const list: Article[] = await responseList.json();
          if (list.length > 0) {
            setArticles(list);
          }
        }
      } catch (err) {
        console.warn('Backend API offline. Using cached browser data.', err);
      }

      try {
        const responseComments = await fetch('/api/comments');
        if (responseComments.ok) {
          const commentList: Comment[] = await responseComments.json();
          setComments(commentList);
        }
      } catch (err) {
        console.warn('Backend comments API offline. Using cached comment list.', err);
      }
    };
    syncWithBackend();
  }, []);

  // Handle HTML document body class toggle for Dark Mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('kriptokini_dark_mode', 'true');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('kriptokini_dark_mode', 'false');
    }
  }, [darkMode]);

  // Set up background timer to spawn high-importance "Live Push News Notifiers"
  useEffect(() => {
    const spawnTimers = [
      setTimeout(() => {
        const newNotif: NotificationItem = {
          id: 'push-notif-1',
          title: 'SEC Menyetujui ETF Sumbu Spot!',
          message: 'Harga Ethereum naik tajam melampaui $3.450! Volume transfer gas fee dApps dikabarkan anjlok pasca Dencun upgrade.',
          time: 'Baru Saja',
          read: false,
          type: 'news',
          linkId: 'art-1'
        };
        setNotifications(prev => [newNotif, ...prev]);
        setActivePushToast(newNotif);
      }, 10000), // Pop first after 10s

      setTimeout(() => {
        const newNotif: NotificationItem = {
          id: 'push-notif-2',
          title: 'Siklus Pasca Halving Bitcoin!',
          message: 'Analis makroekonomi merilis grafik mingguan pola Bullish Flag. Terbuka potensi menguji $85.000.',
          time: 'Baru Saja',
          read: false,
          type: 'analysis',
          linkId: 'art-2'
        };
        setNotifications(prev => [newNotif, ...prev]);
        setActivePushToast(newNotif);
      }, 40000) // Pop second after 40s
    ];

    return () => spawnTimers.forEach(t => clearTimeout(t));
  }, []);

  const handleAddNotificationManual = (title: string, message: string, type: 'news' | 'price' | 'analysis') => {
    const newNotif: NotificationItem = {
      id: `man-notif-${Date.now()}`,
      title,
      message,
      time: 'Baru Saja',
      read: false,
      type
    };
    setNotifications(prev => [newNotif, ...prev]);
    setActivePushToast(newNotif);
  };

  // Likes & interaction controls with backend sync
  const handleLikeArticle = async (articleId: string) => {
    // Optimistic UI update
    setArticles(currentArticles => {
      return currentArticles.map(art => {
        if (art.id === articleId) {
          const nextLikes = art.likes + 1;
          // Update selected article reference too if it is currently viewing
          if (selectedArticle && selectedArticle.id === articleId) {
            setSelectedArticle({ ...selectedArticle, likes: nextLikes });
          }
          return { ...art, likes: nextLikes };
        }
        return art;
      });
    });

    try {
      await fetch(`/api/articles/${articleId}/like`, { method: 'POST' });
    } catch (err) {
      console.error('Server sync like failed.', err);
    }
  };

  const handleLikeComment = async (commentId: string) => {
    setComments(currentComments => {
      return currentComments.map(c => {
        if (c.id === commentId) {
          return { ...c, likes: c.likes + 1 };
        }
        return c;
      });
    });

    try {
      await fetch(`/api/comments/${commentId}/like`, { method: 'POST' });
    } catch (err) {
      console.error('Server sync comment like failed.', err);
    }
  };

  const handleAddComment = async (articleId: string, author: string, content: string) => {
    const tempId = `comment-temp-${Date.now()}`;
    const newComment: Comment = {
      id: tempId,
      articleId,
      author,
      content,
      date: 'Baru saja',
      likes: 0,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop`
    };

    setComments(prev => [newComment, ...prev]);

    // Update comments count on the article representation
    setArticles(currentArticles => {
      return currentArticles.map(art => {
        if (art.id === articleId) {
          const nextCount = art.commentsCount + 1;
          if (selectedArticle && selectedArticle.id === articleId) {
            setSelectedArticle({ ...selectedArticle, commentsCount: nextCount });
          }
          return { ...art, commentsCount: nextCount };
        }
        return art;
      });
    });

    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ articleId, author, content, avatar: newComment.avatar })
      });
      if (res.ok) {
        const saved: Comment = await res.json();
        // swap temp comment with server representation
        setComments(current => current.map(c => c.id === tempId ? saved : c));
      }
    } catch (err) {
      console.error('Failed to post comment to database.', err);
    }
  };

  const handleSelectArticle = (article: Article) => {
    // Increment view count dynamically
    setArticles(currentArticles => {
      return currentArticles.map(art => {
        if (art.id === article.id) {
          const updated = { ...art, views: art.views + 1 };
          setSelectedArticle(updated);
          return updated;
        }
        return art;
      });
    });

    // Fire & Forget View Count sync on server
    fetch(`/api/articles/${article.id}/view`, { method: 'POST' }).catch(() => {});

    // Scroll window up
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticleById = (id: string) => {
    const target = articles.find(art => art.id === id);
    if (target) {
      setActiveScreen('news');
      handleSelectArticle(target);
    }
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
  };

  return (
    <div id="main-layout" className="min-h-screen transition-colors duration-300 bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
      
      {/* 1. Real-Time Flashing Price Ticker */}
      <PriceTicker
        coins={INITIAL_COINS}
        onSelectCoin={(symbol) => {
          setActiveScreen('news');
          setSelectedCoinSymbol(symbol);
        }}
        selectedCoinSymbol={selectedCoinSymbol}
      />

      {/* 2. Brand Navbar (contains Search Bar, Theme Toggle, Notification Badge, and Dynamic Tab Navigation) */}
      <Navbar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim() !== '') {
            setActiveScreen('news');
            setSelectedArticle(null);
          }
        }}
        notifications={notifications}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        activeScreen={activeScreen}
        onSelectScreen={(screen) => {
          setActiveScreen(screen);
          setSelectedArticle(null); // Return back to lists
        }}
        selectedCategory={selectedCategory}
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setSelectedArticle(null); // Return back to list view
        }}
      />

      {/* 3. Main Full-Stack Grid Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* News Grid Column layout if activeTab is news, else render the beautiful target page full width */}
        {activeScreen === 'news' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* LEFT AREA: Article Catalog Grid / Detail Article viewport (Spans 8 cols) */}
            <section id="main-blog-column" className="lg:col-span-8 space-y-6">
              {selectedArticle ? (
                <ArticleDetail
                  article={selectedArticle}
                  comments={comments}
                  onAddComment={handleAddComment}
                  onLikeArticle={handleLikeArticle}
                  onLikeComment={handleLikeComment}
                  onBack={() => setSelectedArticle(null)}
                />
              ) : (
                <NewsBlog
                  articles={articles}
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                  onSelectArticle={handleSelectArticle}
                  onSelectTag={(tag) => setSearchQuery(tag)}
                />
              )}
            </section>

            {/* RIGHT AREA: Daily Technical Analysis Column + Glossary Tips (Spans 4 cols) */}
            <aside id="sidebar-column" className="lg:col-span-4 space-y-6 lg:sticky lg:top-20">
              
              {/* Real-time Technical analysis widget */}
              <TechnicalAnalysis
                analysisList={MOCK_TECHNICAL_ANALYSIS}
                selectedCoinSymbol={selectedCoinSymbol}
                onSelectCoinSymbol={(sym) => setSelectedCoinSymbol(sym)}
              />

              {/* Bonus Interactive Column Widget: Tips Keamanana & Web3 Glossary */}
              <div 
                id="crypto-tips-panel"
                className="bg-white text-zinc-90 w-full rounded-2xl border-2 border-zinc-950 p-5 shadow-[4px_4px_0px_#000000] dark:bg-zinc-900 dark:text-zinc-105 dark:border-zinc-805 dark:shadow-[4px_4px_0_rgba(251,191,36,0.15)] space-y-3"
              >
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-amber-500 animate-pulse" />
                  <h3 className="font-display font-black text-xs uppercase tracking-wider">
                    Tips Keamanan & Edukasi Kripto
                  </h3>
                </div>

                {/* Tips active display with cycle button */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950 rounded-xl border border-zinc-205 dark:border-zinc-850 relative">
                  <span className="text-[9px] font-mono font-black text-amber-500 uppercase">
                    #{cryptoTips[activeTipIndex].category}
                  </span>
                  <h4 className="font-display font-extrabold text-[13px] text-zinc-955 dark:text-zinc-50 mt-1">
                    {cryptoTips[activeTipIndex].title}
                  </h4>
                  <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-normal mt-1.5">
                    {cryptoTips[activeTipIndex].desc}
                  </p>
                  
                  {/* Micro Action link */}
                  <button
                    id="cycle-tips-btn"
                    onClick={() => setActiveTipIndex(prev => (prev + 1) % cryptoTips.length)}
                    className="mt-3 flex items-center justify-end text-[10px] font-mono font-bold text-amber-500 hover:underline gap-0.5 ml-auto cursor-pointer"
                  >
                    <span>Tips Berikutnya</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Highlight Crypto Global Markets */}
                <div className="pt-3 border-t border-zinc-100 dark:border-zinc-850 flex items-center justify-between text-[10px] font-semibold text-zinc-500">
                  <div className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-zinc-400" />
                    <span>Pasar Global: Terbuka 24/7</span>
                  </div>
                  <div className="flex items-center gap-1 text-emerald-500 font-bold">
                    <TrendingUp className="w-3.5 h-3.5" />
                    <span>Suhu Altseason: 62%</span>
                  </div>
                </div>

              </div>

            </aside>

          </div>
        ) : activeScreen === 'dashboard' ? (
          <ContentDashboard
            onArticlesUpdated={(newArticles) => setArticles(newArticles)}
            onAddNotification={handleAddNotificationManual}
            onNavigateHome={() => {
              setActiveScreen('news');
              setSelectedArticle(null);
            }}
          />
        ) : activeScreen === 'education' ? (
          <EducationScreen onAddNotification={handleAddNotificationManual} />
        ) : activeScreen === 'career' ? (
          <CareerScreen onAddNotification={handleAddNotificationManual} />
        ) : activeScreen === 'events' ? (
          <EventsScreen onAddNotification={handleAddNotificationManual} />
        ) : (
          <AboutScreen />
        )}

      </main>

      {/* 4. Drawer & Flyout Elements */}
      {/* Notifications History Drawer Panel */}
      <NotificationCenter
        notifications={notifications}
        onMarkAsRead={handleMarkNotificationRead}
        onClearAll={handleClearAllNotifications}
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onSelectArticleById={handleSelectArticleById}
      />

      {/* Simulated Live Real-Time Push Notification Flyout Alert */}
      <PushToast
        notification={activePushToast}
        onClose={() => setActivePushToast(null)}
        onAction={handleSelectArticleById}
      />

      {/* 5. Footer Content */}
      <footer id="footer-main" className="bg-white border-t border-zinc-200 dark:bg-zinc-950 dark:border-zinc-800 py-10 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-zinc-950 border border-zinc-950 flex items-center justify-center font-display font-extrabold text-base">
              K
            </div>
            <span className="font-display font-black text-base text-zinc-950 dark:text-white">
              KriptoKini
            </span>
          </div>

          {/* Quick Screen footer navigations */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-bold text-zinc-500">
            <button onClick={() => { setActiveScreen('news'); setSelectedArticle(null); }} className="hover:text-amber-500 cursor-pointer">Berita</button>
            <button onClick={() => { setActiveScreen('education'); setSelectedArticle(null); }} className="hover:text-amber-500 cursor-pointer">Education</button>
            <button onClick={() => { setActiveScreen('career'); setSelectedArticle(null); }} className="hover:text-amber-500 cursor-pointer">Career / Karir</button>
            <button onClick={() => { setActiveScreen('events'); setSelectedArticle(null); }} className="hover:text-amber-500 cursor-pointer">Events / Acara</button>
            <button onClick={() => { setActiveScreen('about'); setSelectedArticle(null); }} className="hover:text-amber-500 cursor-pointer">About Us</button>
            <button onClick={() => { setActiveScreen('dashboard'); setSelectedArticle(null); }} className="text-amber-500 font-extrabold hover:underline cursor-pointer flex items-center gap-1">
              🛠️ CMS Admin
            </button>
          </div>

          <p className="text-xs text-zinc-500 max-w-md mx-auto leading-relaxed">
            Portal rilis berita seputar crypto utama dengan penelusuran harga live, rangkuman fundamental berkualitas, dan kalkulasi analisis teknikal untuk memandu strategi dagang Anda.
          </p>

          <div className="text-[10px] text-zinc-450 font-mono">
            © 2026 KriptoKini. Semua hak cipta dilindungi undang-undang. Disclaimer: Perdagangan aset crypto memiliki tingkat risiko tinggi.
          </div>
        </div>
      </footer>

    </div>
  );
}
