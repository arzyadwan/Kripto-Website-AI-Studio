import React, { useState } from 'react';
import { Sun, Moon, Search, Bell, Menu, X, BookOpen, Briefcase, Calendar as CalendarIcon, Info, LayoutDashboard } from 'lucide-react';
import { NotificationItem } from '../types';

interface NavbarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  activeScreen: 'news' | 'education' | 'career' | 'events' | 'about' | 'dashboard';
  onSelectScreen: (screen: 'news' | 'education' | 'career' | 'events' | 'about' | 'dashboard') => void;
  onSelectCategory: (category: 'Berita' | 'Analisis' | 'Edukasi' | 'Regulasi' | null) => void;
  selectedCategory: 'Berita' | 'Analisis' | 'Edukasi' | 'Regulasi' | null;
}

export default function Navbar({
  darkMode,
  onToggleDarkMode,
  searchQuery,
  onSearchChange,
  notifications,
  onOpenNotifications,
  activeScreen,
  onSelectScreen,
  onSelectCategory,
  selectedCategory
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleScreenClick = (screen: 'news' | 'education' | 'career' | 'events' | 'about' | 'dashboard') => {
    onSelectScreen(screen);
    if (screen !== 'news') {
      onSelectCategory(null);
    }
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (cat: 'Berita' | 'Analisis' | 'Edukasi' | 'Regulasi' | null) => {
    onSelectScreen('news');
    onSelectCategory(cat);
    setMobileMenuOpen(false);
  };

  return (
    <nav id="navbar-main" className="sticky top-0 z-40 w-full transition-colors duration-300 border-b border-zinc-200 bg-white text-zinc-900 shadow-sm dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-50">
      {/* Upper main header bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          
          {/* Logo Brand / Title */}
          <div className="flex items-center gap-2 cursor-pointer shrink-0" onClick={() => handleScreenClick('news')}>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-amber-400 text-zinc-900 border-2 border-zinc-950 font-display font-extrabold text-lg shadow-[3px_3px_0px_#000000] dark:shadow-[3px_3px_0px_#f59e0b]">
              K
            </div>
            <div>
              <span className="font-display font-black text-xl tracking-tight leading-none text-zinc-955 dark:text-white">
                Kripto<span className="text-amber-500">Kini</span>
              </span>
              <div className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase leading-none mt-0.5">
                Portal Berita Utama
              </div>
            </div>
          </div>

          {/* Desktop Core Navigation Section - Dynamic Tab menus */}
          <div className="hidden lg:flex items-center space-x-1">
            <button
              id="menu-news-btn"
              onClick={() => handleScreenClick('news')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                activeScreen === 'news'
                  ? 'bg-amber-400 text-zinc-950 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                  : 'text-zinc-650 hover:text-zinc-90 w-auto dark:text-zinc-300 dark:hover:text-zinc-150 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-2 border-transparent'
              }`}
            >
              Berita
            </button>
            <button
              id="menu-edu-btn"
              onClick={() => handleScreenClick('education')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeScreen === 'education'
                  ? 'bg-amber-400 text-zinc-950 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                  : 'text-zinc-650 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-2 border-transparent'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-amber-500" />
              <span>Education</span>
            </button>
            <button
              id="menu-career-btn"
              onClick={() => handleScreenClick('career')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeScreen === 'career'
                  ? 'bg-amber-400 text-zinc-950 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                  : 'text-zinc-650 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-2 border-transparent'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5 text-amber-500" />
              <span>Career</span>
            </button>
            <button
              id="menu-events-btn"
              onClick={() => handleScreenClick('events')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeScreen === 'events'
                  ? 'bg-amber-400 text-zinc-950 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                  : 'text-zinc-650 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-2 border-transparent'
              }`}
            >
              <CalendarIcon className="w-3.5 h-3.5 text-amber-500" />
              <span>Events</span>
            </button>
            <button
              id="menu-about-btn"
              onClick={() => handleScreenClick('about')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeScreen === 'about'
                  ? 'bg-amber-400 text-zinc-950 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)]'
                  : 'text-zinc-650 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-900 border-2 border-transparent'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-amber-500" />
              <span>About Us</span>
            </button>
            <button
              id="menu-dashboard-btn"
              onClick={() => handleScreenClick('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeScreen === 'dashboard'
                  ? 'bg-amber-400 text-zinc-950 border-2 border-zinc-950 shadow-[2px_2px_0px_rgba(0,0,0,1)] font-black'
                  : 'text-amber-500 hover:text-amber-600 dark:text-amber-400 dark:hover:text-amber-300 bg-zinc-50 hover:bg-zinc-100 dark:bg-zinc-900 dark:hover:bg-zinc-850/80 border-2 border-zinc-950 dark:border-zinc-800 rounded-lg shadow-2xs'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>CMS Admin</span>
            </button>
          </div>

          {/* Advanced Search Input & Settings Utilities */}
          <div className="flex items-center gap-3 flex-grow max-w-sm justify-end ml-auto">
            
            {/* Search input bar */}
            <div className="relative w-full max-w-[160px] sm:max-w-[220px] group hidden md:block">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 group-focus-within:text-amber-500 transition-colors" />
              <input
                id="search-input-desktop"
                type="text"
                placeholder="Cari konten atau tags..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg border border-zinc-200 bg-zinc-50 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 dark:bg-zinc-900 dark:border-zinc-800 dark:focus:ring-amber-500/10 placeholder:text-zinc-400 text-zinc-900 dark:text-white"
              />
            </div>

            {/* Notifications Button */}
            <button
              id="notification-bell-btn"
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-600 hover:text-amber-500 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 transition-all hover:scale-105 cursor-pointer"
              aria-label="Pemberitahuan"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-[10px] font-bold text-zinc-900 ring-2 ring-white dark:ring-zinc-950 animate-pulse">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Dark & Light Theme Switcher */}
            <button
              id="theme-toggle-btn"
              onClick={onToggleDarkMode}
              className="p-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-650 hover:text-amber-500 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 transition-all hover:scale-105 cursor-pointer"
              aria-label="Toggle tema"
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-zinc-50 border border-zinc-200 text-zinc-650 hover:text-amber-500 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 transition-all cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* News Category Sub-bar layout ONLY when viewing News screen on desktop */}
      {activeScreen === 'news' && (
        <div className="hidden lg:block border-t border-zinc-200 bg-zinc-50 dark:bg-zinc-900 dark:border-zinc-800 py-2">
          <div className="max-w-7xl mx-auto px-8 flex items-center space-x-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-400 mr-4">Filter Kabar:</span>
            <button
              onClick={() => handleCategoryClick(null)}
              className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === null
                  ? 'bg-zinc-950 text-white dark:bg-amber-400 dark:text-zinc-950 shadow-sm'
                  : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800'
              }`}
            >
              Semua Berita
            </button>
            {(['Berita', 'Analisis', 'Edukasi', 'Regulasi'] as const).map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                className={`px-3 py-1 rounded-md text-xs font-bold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-zinc-950 text-white dark:bg-amber-400 dark:text-zinc-950 shadow-sm'
                    : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100 hover:bg-zinc-200/50 dark:hover:bg-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Advanced Search Input Bar - On Mobile */}
      <div className="px-4 pb-3 md:hidden border-t border-zinc-150 dark:border-zinc-800 pt-3 bg-zinc-50 dark:bg-zinc-950">
        <div className="relative w-full group shadow-xs">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400 group-focus-within:text-amber-500" />
          <input
            id="search-input-mobile"
            type="text"
            placeholder="Cari berita atau tags..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-zinc-200 bg-zinc-50 outline-none transition-all duration-300 focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 dark:bg-zinc-900 dark:border-zinc-800 placeholder:text-zinc-400 text-zinc-900 dark:text-white"
          />
        </div>
      </div>

      {/* Mobile Drawer Menu (Extended with screen tabs + categories) */}
      {mobileMenuOpen && (
        <div id="mobile-menu-drawer" className="lg:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-4 space-y-4">
          
          <div className="space-y-1.5">
            <div className="font-display font-black text-[10px] uppercase tracking-wider text-zinc-400 mb-2">
              Menu Utama
            </div>
            
            <button
              onClick={() => handleScreenClick('news')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold flex items-center justify-between transition-all ${
                activeScreen === 'news'
                  ? 'bg-amber-400 text-zinc-950 border border-zinc-950'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
              }`}
            >
              <span>Berita & Artikel</span>
              {activeScreen === 'news' && <span className="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>}
            </button>

            <button
              onClick={() => handleScreenClick('education')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold flex items-center justify-between transition-all ${
                activeScreen === 'education'
                  ? 'bg-amber-400 text-zinc-950 border border-zinc-950'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
              }`}
            >
              <span>Education</span>
              {activeScreen === 'education' && <span className="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>}
            </button>

            <button
              onClick={() => handleScreenClick('career')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold flex items-center justify-between transition-all ${
                activeScreen === 'career'
                  ? 'bg-amber-400 text-zinc-950 border border-zinc-950'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
              }`}
            >
              <span>Career / Karir</span>
              {activeScreen === 'career' && <span className="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>}
            </button>

            <button
              onClick={() => handleScreenClick('events')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold flex items-center justify-between transition-all ${
                activeScreen === 'events'
                  ? 'bg-amber-400 text-zinc-950 border border-zinc-950'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
              }`}
            >
              <span>Events / Acara</span>
              {activeScreen === 'events' && <span className="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>}
            </button>

            <button
              onClick={() => handleScreenClick('about')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold flex items-center justify-between transition-all ${
                activeScreen === 'about'
                  ? 'bg-amber-400 text-zinc-950 border border-zinc-950'
                  : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-900'
              }`}
            >
              <span>About Us</span>
              {activeScreen === 'about' && <span className="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>}
            </button>

            <button
              onClick={() => handleScreenClick('dashboard')}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-bold flex items-center justify-between transition-all ${
                activeScreen === 'dashboard'
                  ? 'bg-amber-400 text-zinc-950 border border-zinc-950 font-black'
                  : 'text-amber-500 dark:text-amber-450 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-amber-400/20'
              }`}
            >
              <span className="flex items-center gap-1.5 font-bold">🛠️ CMS Admin Dashboard</span>
              {activeScreen === 'dashboard' && <span className="w-1.5 h-1.5 rounded-full bg-zinc-950"></span>}
            </button>
          </div>

          {/* Sub category filter panel shown if news is open */}
          {activeScreen === 'news' && (
            <div className="pt-2 border-t border-zinc-150 dark:border-zinc-800 space-y-1.5">
              <div className="font-display font-black text-[10px] uppercase tracking-wider text-zinc-400 mb-1">
                Kategori Berita
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                <button
                  onClick={() => handleCategoryClick(null)}
                  className={`px-3 py-1.5 rounded text-xs font-bold text-center border ${
                    selectedCategory === null
                      ? 'bg-zinc-905 text-white dark:bg-amber-400 dark:text-zinc-950 border-transparent font-extrabold'
                      : 'text-zinc-600 bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300'
                  }`}
                >
                  Semua
                </button>
                {(['Berita', 'Analisis', 'Edukasi', 'Regulasi'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryClick(cat)}
                    className={`px-3 py-1.5 rounded text-xs font-bold text-center border ${
                      selectedCategory === cat
                        ? 'bg-zinc-905 text-white dark:bg-amber-400 dark:text-zinc-950 border-transparent font-extrabold'
                        : 'text-zinc-600 bg-zinc-50 border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>
      )}
    </nav>
  );
}
