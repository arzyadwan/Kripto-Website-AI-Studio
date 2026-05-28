import React, { useState, useEffect, useRef } from 'react';
import { CoinPrice } from '../types';
import { TrendingUp, TrendingDown, RefreshCw, Star } from 'lucide-react';

interface PriceTickerProps {
  coins: CoinPrice[];
  onSelectCoin: (symbol: string) => void;
  selectedCoinSymbol: string;
}

export default function PriceTicker({ coins: initialCoins, onSelectCoin, selectedCoinSymbol }: PriceTickerProps) {
  const [coins, setCoins] = useState<CoinPrice[]>(initialCoins);
  const [favorites, setFavorites] = useState<string[]>(['BTC', 'ETH', 'SOL']);
  const [flashStates, setFlashStates] = useState<Record<string, 'up' | 'down' | null>>({});
  const prevPricesRef = useRef<Record<string, number>>({});

  // Initialize previous prices ref
  useEffect(() => {
    initialCoins.forEach(coin => {
      prevPricesRef.current[coin.symbol] = coin.price;
    });
  }, [initialCoins]);

  // Simulate real-time price fluctuations
  useEffect(() => {
    const interval = setInterval(() => {
      setCoins(currentCoins => {
        const nextCoins = currentCoins.map(coin => {
          // Dynamic fluctuation: -0.25% to +0.3%
          const scale = coin.symbol === 'BTC' ? 0.001 : coin.symbol === 'ETH' ? 0.0015 : 0.003;
          const percentage = (Math.random() * 0.55 - 0.25) * scale;
          const priceChange = coin.price * percentage;
          const nextPrice = coin.price + priceChange;
          
          const change24h = coin.change24h + (percentage * 100);
          
          // Trigger flash
          const direction = percentage > 0 ? 'up' : percentage < 0 ? 'down' : null;
          if (direction) {
            setFlashStates(prev => ({ ...prev, [coin.symbol]: direction }));
            // Clear flash after 800ms
            setTimeout(() => {
              setFlashStates(prev => ({ ...prev, [coin.symbol]: null }));
            }, 800);
          }

          // Update sparkline - drop first item and append new price
          const updatedSparkline = [...coin.sparkline.slice(1), nextPrice];

          return {
            ...coin,
            price: nextPrice,
            change24h: Number(change24h.toFixed(2)),
            high24h: nextPrice > coin.high24h ? nextPrice : coin.high24h,
            low24h: nextPrice < coin.low24h ? nextPrice : coin.low24h,
            sparkline: updatedSparkline
          };
        });

        return nextCoins;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const toggleFavorite = (symbol: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(symbol) ? prev.filter(s => s !== symbol) : [...prev, symbol]
    );
  };

  const getSparklinePath = (points: number[]) => {
    if (points.length < 2) return '';
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min === 0 ? 1 : max - min;
    const width = 80;
    const height = 30;
    
    return points
      .map((price, i) => {
        const x = (i / (points.length - 1)) * width;
        const y = height - ((price - min) / range) * height;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  };

  return (
    <div id="crypto-price-ticker-section" className="w-full bg-zinc-900 border-b border-amber-400 py-3 px-4 shadow-md overflow-x-auto select-none">
      <div className="max-w-7xl mx-auto flex items-center space-x-6 min-w-max">
        {/* Ticker Header */}
        <div className="flex items-center space-x-2 text-amber-400 font-display font-bold text-xs uppercase tracking-wider border-r border-zinc-700 pr-5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Harga Live (IDR/USD)</span>
          <RefreshCw className="w-3.5 h-3.5 animate-spin text-zinc-500" />
        </div>

        {/* Coins Container */}
        <div className="flex items-center space-x-4 flex-grow">
          {coins.map(coin => {
            const isSelected = selectedCoinSymbol === coin.symbol;
            const isUp = coin.change24h >= 0;
            const flash = flashStates[coin.symbol];
            const isFav = favorites.includes(coin.symbol);

            let flashClass = '';
            if (flash === 'up') flashClass = 'animate-flash-green bg-emerald-950/20';
            if (flash === 'down') flashClass = 'animate-flash-red bg-rose-950/20';

            return (
              <div
                id={`coin-ticker-${coin.symbol.toLowerCase()}`}
                key={coin.id}
                onClick={() => onSelectCoin(coin.symbol)}
                className={`flex items-center space-x-3 py-1.5 px-3.5 rounded-lg cursor-pointer transition-all duration-300 border ${
                  isSelected 
                    ? 'bg-amber-400 text-zinc-950 border-amber-300 shadow-[0_0_12px_rgba(251,191,36,0.3)]' 
                    : 'bg-zinc-800 text-zinc-100 hover:bg-zinc-750 border-zinc-700 hover:border-zinc-600'
                } ${flashClass}`}
              >
                {/* Favorite Icon */}
                <button 
                  id={`fav-btn-${coin.symbol.toLowerCase()}`}
                  onClick={(e) => toggleFavorite(coin.symbol, e)}
                  className={`focus:outline-none transition-colors ${
                    isSelected 
                      ? 'text-zinc-950 hover:text-zinc-800' 
                      : 'text-zinc-500 hover:text-amber-400'
                  }`}
                >
                  <Star className={`w-3.5 h-3.5 ${isFav ? 'fill-current text-amber-500' : ''}`} />
                </button>

                {/* Coin Info */}
                <div>
                  <div className="flex items-center space-x-1">
                    <span className="font-display font-extrabold text-xs tracking-wide">{coin.symbol}</span>
                    <span className={`text-[10px] font-medium leading-none ${isSelected ? 'text-zinc-800' : 'text-zinc-400'}`}>
                      {coin.name}
                    </span>
                  </div>
                  <div className="font-mono text-xs font-semibold mt-0.5">
                    ${coin.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>

                {/* Sparkline Drawing */}
                <div className="w-14 h-6 flex items-center pr-1 overflow-hidden">
                  <svg className="w-full h-full overflow-visible">
                    <path
                      d={getSparklinePath(coin.sparkline)}
                      fill="none"
                      stroke={isUp ? '#10B981' : '#F43F5E'}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Percent Change */}
                <div className="flex flex-col items-end text-[11px] font-semibold">
                  <div className={`flex items-center space-x-0.5 ${
                    isSelected 
                      ? isUp ? 'text-emerald-900' : 'text-rose-950' 
                      : isUp ? 'text-emerald-400' : 'text-rose-400'
                  }`}>
                    {isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span>{isUp ? '+' : ''}{coin.change24h}%</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
