export interface Comment {
  id: string;
  articleId: string;
  author: string;
  content: string;
  date: string;
  likes: number;
  avatar: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string;
  image: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  category: 'Berita' | 'Analisis' | 'Edukasi' | 'Regulasi';
  likes: number;
  commentsCount: number;
  tags: string[];
  views: number;
}

export interface CoinPrice {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  high24h: number;
  low24h: number;
  sparkline: number[];
  marketCap: string;
}

export interface TechnicalAnalysisData {
  id: string;
  coinSymbol: string;
  coinName: string;
  title: string;
  summary: string;
  content: string;
  trend: 'up' | 'down' | 'neutral';
  rsi: number;
  macd: string; // e.g. "Bullish Crossover"
  movingAverage: string; // e.g. "BUY (Above EMA 50)"
  support: number;
  resistance: number;
  chartPoints: { label: string; price: number }[];
  date: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'news' | 'price' | 'analysis';
  linkId?: string;
}

export interface CareerItem {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'Webinar' | 'Conference' | 'Meetup' | 'AMA';
  description: string;
  link: string;
  speaker: string;
  registeredCount: number;
}

export interface EducationItem {
  id: string;
  title: string;
  level: 'Pemula' | 'Menengah' | 'Ahli';
  estimatedTime: string;
  modulesCount: number;
  description: string;
  chapters: string[];
}

