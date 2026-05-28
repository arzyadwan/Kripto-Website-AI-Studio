import React, { useState } from 'react';
import { Article, Comment } from '../types';
import { ArrowLeft, Heart, MessageSquare, Share2, Copy, Check, Twitter, ArrowUpRight, Award, Trash } from 'lucide-react';

interface ArticleDetailProps {
  article: Article;
  comments: Comment[];
  onAddComment: (articleId: string, author: string, content: string) => void;
  onLikeArticle: (articleId: string) => void;
  onLikeComment: (commentId: string) => void;
  onBack: () => void;
}

export default function ArticleDetail({
  article,
  comments,
  onAddComment,
  onLikeArticle,
  onLikeComment,
  onBack
}: {
  article: Article;
  comments: Comment[];
  onAddComment: (articleId: string, author: string, content: string) => void;
  onLikeArticle: (articleId: string) => void;
  onLikeComment: (commentId: string) => void;
  onBack: () => void;
}) {
  const [commentAuthor, setCommentAuthor] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [copied, setCopied] = useState(false);
  const [sharedPlatform, setSharedPlatform] = useState<string | null>(null);

  const articleComments = comments.filter(c => c.articleId === article.id);

  const handleShareCopy = () => {
    const shareUrl = window.location.href;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const triggerSocialSimulation = (platform: string) => {
    setSharedPlatform(platform);
    setTimeout(() => setSharedPlatform(null), 3000);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentContent.trim()) return;
    onAddComment(article.id, commentAuthor.trim(), commentContent.trim());
    setCommentContent('');
  };

  return (
    <article id={`article-page-${article.id}`} className="max-w-4xl mx-auto space-y-6">
      
      {/* Back Button and action row */}
      <div className="flex items-center justify-between">
        <button
          id="back-list-btn"
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold font-display uppercase tracking-wider bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 hover:bg-zinc-200 dark:hover:bg-zinc-805 text-zinc-800 dark:text-zinc-200 py-2 px-4 rounded-xl transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Berita</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-zinc-500 font-mono">
            {article.readTime}
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">|</span>
          <span className="text-xs font-semibold bg-amber-400 text-zinc-955 px-2 py-0.5 rounded-md border border-zinc-950/20">
            {article.category}
          </span>
        </div>
      </div>

      {/* Hero Header Cover */}
      <div className="space-y-4">
        <h1 className="font-display font-black text-2xl sm:text-4xl leading-tight tracking-tight text-zinc-900 dark:text-zinc-50">
          {article.title}
        </h1>

        {/* Author details / Metadata Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-zinc-200 dark:border-zinc-855">
          <div className="flex items-center space-x-3">
            <img
              src={article.authorAvatar}
              alt={article.author}
              className="w-10 h-10 rounded-full border-2 border-amber-400 object-cover"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="font-display font-bold text-sm text-zinc-950 dark:text-zinc-50">
                {article.author}
              </div>
              <div className="text-[10px] text-zinc-500 font-mono">
                Jurnalis KriptoKini • {article.date}
              </div>
            </div>
          </div>

          {/* Interaction Counter Row */}
          <div className="flex items-center space-x-3 text-zinc-500 text-xs font-semibold font-mono">
            <span>Views: {article.views.toLocaleString()}</span>
            <span>•</span>
            <button
              id={`like-article-btn-${article.id}`}
              onClick={() => onLikeArticle(article.id)}
              className="flex items-center gap-1 hover:text-rose-500 transition-colors"
            >
              <Heart className="w-4 h-4 text-rose-500 fill-current" />
              <span>{article.likes} Likes</span>
            </button>
            <span>•</span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{articleComments.length}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Featured Image Banner */}
      <div className="relative aspect-video rounded-2xl overflow-hidden border-2 border-zinc-950 dark:border-zinc-800 shadow-[4px_4px_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_rgba(251,191,36,0.2)]">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-4 left-4 bg-zinc-950/80 backdrop-blur px-3 py-1 rounded-lg text-[10px] text-amber-400 font-mono border border-amber-400/20">
          Foto: Unsplash
        </div>
      </div>

      {/* Article HTML Content Section */}
      <div id="article-main-text" className="article-rich-content text-sm sm:text-base text-zinc-800 dark:text-zinc-200 leading-relaxed font-sans whitespace-pre-line prose dark:prose-invert max-w-none">
        {article.content}
      </div>

      {/* Tag List */}
      <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-100 dark:border-zinc-850">
        {article.tags.map(tag => (
          <span
            id={`tag-badge-${tag.toLowerCase()}`}
            key={tag}
            className="text-[11px] font-bold bg-zinc-100 text-zinc-700 dark:bg-zinc-900 dark:text-zinc-350 px-2.5 py-1 rounded-lg border border-zinc-200/50 dark:border-zinc-800/80"
          >
            #{tag}
          </span>
        ))}
      </div>

      {/* Interactive Social Media Sharing Bar */}
      <div id="social-share-integration" className="bg-amber-100 border-2 border-zinc-950 dark:bg-zinc-900/60 dark:border-zinc-800 p-5 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h4 className="font-display font-black text-sm text-zinc-900 dark:text-zinc-50 leading-none">
            Suka ulasan berita ini? Bagikan ke teman trader Anda!
          </h4>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Gunakan tombol berikut untuk berbagi analisis terkini.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Twitter / X */}
          <button
            id="share-twitter-btn"
            onClick={() => triggerSocialSimulation('X (Twitter)')}
            className="flex items-center gap-1.5 text-xs font-bold bg-zinc-950 hover:bg-zinc-850 text-white border-2 border-zinc-950 py-1.5 px-3 rounded-lg shadow-[2px_2px_0_rgba(251,191,36,1)] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Twitter className="w-3.5 h-3.5 text-amber-400" />
            <span>Bagikan di X</span>
          </button>

          {/* Telegram / Whatsapp general sim */}
          <button
            id="share-whatsapp-btn"
            onClick={() => triggerSocialSimulation('WhatsApp')}
            className="flex items-center gap-1.5 text-xs font-bold bg-emerald-600 hover:bg-emerald-500 text-white py-1.5 px-3 rounded-lg border-2 border-zinc-950 shadow-[2px_2px_0_rgba(251,191,36,1)] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>

          {/* URL Clipboard Copy */}
          <button
            id="share-copy-btn"
            onClick={handleShareCopy}
            className="flex items-center gap-1.5 text-xs font-bold bg-amber-400 text-zinc-950 border-2 border-zinc-950 py-1.5 px-3 rounded-lg shadow-[2px_2px_0_rgba(0,0,0,1)] transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Tercopy!' : 'Salin Tautan'}</span>
          </button>
        </div>
      </div>

      {/* Share Toast banner */}
      {sharedPlatform && (
        <div id="simulated-share-toast" className="fixed bottom-6 right-6 z-55 bg-zinc-950 text-white px-4 py-3 rounded-xl border border-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.45)] text-xs flex items-center gap-2">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Simulasi: Berhasil membuka tautan berbagi untuk {sharedPlatform}!</span>
        </div>
      )}

      {/* Interactive Comments Engine */}
      <div id="interactive-comments-section" className="space-y-6 pt-6 border-t border-zinc-200 dark:border-zinc-850">
        <h3 className="font-display font-black text-xl text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
          <span>Komentar Komunitas ({articleComments.length})</span>
          <MessageSquare className="w-5 h-5 text-amber-500" />
        </h3>

        {/* Comment list */}
        <div className="space-y-4">
          {articleComments.length === 0 ? (
            <p className="text-xs text-zinc-500 dark:text-zinc-400 py-3 text-center border border-dashed border-zinc-200 dark:border-zinc-800 rounded-xl">
              Belum ada komentar untuk berita ini. Jadilah yang pertama memberikan masukan!
            </p>
          ) : (
            articleComments.map(comment => (
              <div
                id={`comment-card-${comment.id}`}
                key={comment.id}
                className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-4 rounded-xl flex items-start gap-3 transition-colors hover:border-amber-400/30"
              >
                <img
                  src={comment.avatar}
                  alt={comment.author}
                  className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-800 object-cover shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-grow space-y-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-display font-bold text-xs text-zinc-900 dark:text-zinc-100">
                        {comment.author}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono ml-2">
                        {comment.date}
                      </span>
                    </div>

                    <button
                      id={`like-comment-btn-${comment.id}`}
                      onClick={() => onLikeComment(comment.id)}
                      className="flex items-center gap-1 text-[11px] font-semibold text-zinc-500 hover:text-rose-500 border border-zinc-200 dark:border-zinc-850 px-2 py-0.5 rounded-md hover:bg-white dark:hover:bg-zinc-900 transition-colors"
                    >
                      <Heart className="w-3 h-3 text-rose-500 text-xs shrink-0 fill-current" />
                      <span>{comment.likes}</span>
                    </button>
                  </div>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* New comment input form */}
        <form id="comment-add-form" onSubmit={handleSubmitComment} className="bg-zinc-55 border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-850 p-4 rounded-xl space-y-3.5">
          <h4 className="font-display font-bold text-xs text-zinc-900 dark:text-zinc-50">
            Tinggalkan Balasan Komentar:
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="commenter-name" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
                Nama Pengguna / Nickname
              </label>
              <input
                id="commenter-name"
                type="text"
                required
                maxLength={20}
                placeholder="e.g., SatoshisSon"
                value={commentAuthor}
                onChange={(e) => setCommentAuthor(e.target.value)}
                className="w-full text-xs outline-none bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-2 rounded-lg focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="commenter-text" className="block text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1">
              Komentar Anda
            </label>
            <textarea
              id="commenter-text"
              required
              rows={3}
              placeholder="Berikan tanggapan yang sehat dan cerdas seputar ulasan artikel..."
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              className="w-full text-xs outline-none bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 p-2.5 rounded-lg focus:border-amber-400 resize-none"
            />
          </div>

          <div className="flex justify-end">
            <button
              id="comment-submit-btn"
              type="submit"
              className="bg-zinc-950 text-white hover:bg-zinc-850 dark:bg-amber-400 dark:text-zinc-950 dark:hover:bg-amber-500 font-bold font-display text-xs px-4 py-2 rounded-lg border-2 border-zinc-950/20 shadow-[2px_2px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_rgba(251,191,36,0.3)] cursor-pointer"
            >
              Kirim Komentar
            </button>
          </div>
        </form>
      </div>

    </article>
  );
}
