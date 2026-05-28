import { useState } from 'react';
import { TechnicalAnalysisData } from '../types';
import { TrendingUp, TrendingDown, Target, Info, Sparkles, Sliders, ChevronRight } from 'lucide-react';

interface TechnicalAnalysisProps {
  analysisList: TechnicalAnalysisData[];
  selectedCoinSymbol: string;
  onSelectCoinSymbol: (symbol: string) => void;
}

export default function TechnicalAnalysis({
  analysisList,
  selectedCoinSymbol,
  onSelectCoinSymbol
}: TechnicalAnalysisProps) {
  const activeAnalysis = analysisList.find(ta => ta.coinSymbol === selectedCoinSymbol) || analysisList[0];
  const [indicatorTab, setIndicatorTab] = useState<'chart' | 'indicators' | 'calculator'>('chart');
  
  // Calculator state
  const [calcPrice, setCalcPrice] = useState<string>('');
  const [calcResult, setCalcResult] = useState<{
    zone: string;
    action: string;
    color: string;
    distance: string;
  } | null>(null);

  const calculateAction = () => {
    const numPrice = parseFloat(calcPrice);
    if (isNaN(numPrice) || numPrice <= 0) return;

    const supp = activeAnalysis.support;
    const res = activeAnalysis.resistance;

    let zone = '';
    let action = '';
    let color = '';
    let distance = '';

    if (numPrice <= supp) {
      zone = 'Di Bawah Support Utama';
      action = 'STRONG BUY (Oversold / Potensi Rebound)';
      color = 'text-emerald-500 border-emerald-500 bg-emerald-500/10';
      const pct = (((supp - numPrice) / numPrice) * 100).toFixed(1);
      distance = `${pct}% di bawah Level Support ($${supp})`;
    } else if (numPrice >= res) {
      zone = 'Di Atas Resistance Utama';
      action = 'STRONG SELL / TAKE PROFIT (Overbought)';
      color = 'text-rose-500 border-rose-500 bg-rose-500/10';
      const pct = (((numPrice - res) / res) * 100).toFixed(1);
      distance = `${pct}% di atas Level Resisten ($${res})`;
    } else {
      // Inside range
      const midPoint = (supp + res) / 2;
      const range = res - supp;
      const relativePosition = (numPrice - supp) / range; // 0 (at support) to 1 (at resistance)

      if (relativePosition < 0.3) {
        zone = 'Dekat Zona Support (Beli)';
        action = 'BUY / ACCUMULATE (Lebih Dekat ke Support)';
        color = 'text-emerald-400 border-emerald-400/30 bg-emerald-500/5';
        const pct = (((numPrice - supp) / supp) * 100).toFixed(1);
        distance = `${pct}% dari Level Support`;
      } else if (relativePosition > 0.7) {
        zone = 'Dekat Zona Resisten (Jual)';
        action = 'SELL / REDUCE (Dekat Batas Atas)';
        color = 'text-amber-500 border-amber-400/30 bg-amber-500/5';
        const pct = (((res - numPrice) / numPrice) * 100).toFixed(1);
        distance = `${pct}% menuju Level Resisten`;
      } else {
        zone = 'Konsolidasi Tengah Jangkauan';
        action = 'HOLD / WAIT & SEE';
        color = 'text-blue-400 border-blue-400/30 bg-blue-500/5';
        distance = 'Rentang harga netral konsolidasi';
      }
    }

    setCalcResult({ zone, action, color, distance });
  };

  // Generate SVG path points for chart preview
  const getGraphPath = () => {
    const points = activeAnalysis.chartPoints;
    const width = 360;
    const height = 140;
    const padding = 20;
    
    const prices = points.map(p => p.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const range = max - min === 0 ? 1 : max - min;

    return points.map((p, i) => {
      const x = padding + (i / (points.length - 1)) * (width - padding * 2);
      const y = height - padding - ((p.price - min) / range) * (height - padding * 2);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  return (
    <div id="technical-analysis-container" className="w-full bg-white text-zinc-950 rounded-2xl border-2 border-zinc-950 p-6 shadow-[5px_5px_0px_#000000] dark:bg-zinc-900 dark:text-zinc-50 dark:border-zinc-800 dark:shadow-[5px_5px_0px_rgba(251,191,36,0.2)]">
      
      {/* Widget Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-400 text-zinc-900 border border-zinc-950 dark:border-zinc-800">
            <Sliders className="w-4 h-4 text-zinc-950" />
          </div>
          <div>
            <h2 className="font-display font-black text-lg tracking-tight leading-none">
              Analisis Teknikal Harian
            </h2>
            <p className="text-[10px] text-zinc-500 font-mono mt-1 uppercase tracking-wider">
              Berdasarkan Indikator Pasar 24H
            </p>
          </div>
        </div>
        
        {/* Coin Selection dropdown/pill */}
        <div className="flex items-center space-x-1 bg-zinc-100 dark:bg-zinc-800 p-1 rounded-lg border border-zinc-200 dark:border-zinc-700">
          {analysisList.map(ta => (
            <button
              id={`ta-tab-${ta.coinSymbol.toLowerCase()}`}
              key={ta.id}
              onClick={() => {
                onSelectCoinSymbol(ta.coinSymbol);
                setCalcResult(null);
                setCalcPrice('');
              }}
              className={`px-3 py-1 rounded text-xs font-bold font-display transition-all ${
                selectedCoinSymbol === ta.coinSymbol
                  ? 'bg-amber-400 text-zinc-900 shadow-sm border border-zinc-950/20'
                  : 'text-zinc-650 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-zinc-100'
              }`}
            >
              {ta.coinSymbol}
            </button>
          ))}
        </div>
      </div>

      {/* Main Analysis Block */}
      <div id="ta-main-content" className="space-y-4">
        <div>
          <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${
            activeAnalysis.trend === 'up' 
              ? 'bg-emerald-100 text-emerald-850 border border-emerald-300 dark:bg-emerald-950/35 dark:text-emerald-400' 
              : 'bg-rose-100 text-rose-850 border border-rose-300 dark:bg-rose-950/35 dark:text-rose-400'
          }`}>
            {activeAnalysis.trend === 'up' ? (
              <>
                <TrendingUp className="w-3 h-3" />
                Sinyal: Bullish Trend
              </>
            ) : (
              <>
                <TrendingDown className="w-3 h-3" />
                Sinyal: Bearish Trend
              </>
            )}
          </span>
          <h3 className="font-display font-extrabold text-base leading-snug hover:text-amber-500 transition-colors">
            {activeAnalysis.title}
          </h3>
          <p className="text-zinc-400 text-[10px] font-mono mt-1">Diterbitkan: {activeAnalysis.date}</p>
        </div>

        {/* Dynamic Subtabs */}
        <div className="flex border-b border-zinc-200 dark:border-zinc-800">
          <button
            id="ta-subtab-chart"
            onClick={() => setIndicatorTab('chart')}
            className={`flex-1 pb-2 text-xs font-bold text-center border-b-2 transition-all ${
              indicatorTab === 'chart' 
                ? 'border-amber-400 text-amber-500' 
                : 'border-transparent text-zinc-400 hover:text-zinc-205'
            }`}
          >
            Grafik Mini
          </button>
          <button
            id="ta-subtab-indicators"
            onClick={() => setIndicatorTab('indicators')}
            className={`flex-1 pb-2 text-xs font-bold text-center border-b-2 transition-all ${
              indicatorTab === 'indicators' 
                ? 'border-amber-400 text-amber-500' 
                : 'border-transparent text-zinc-400 hover:text-zinc-205'
            }`}
          >
            Indikator Utama
          </button>
          <button
            id="ta-subtab-calculator"
            onClick={() => setIndicatorTab('calculator')}
            className={`flex-1 pb-2 text-xs font-bold text-center border-b-2 transition-all ${
              indicatorTab === 'calculator' 
                ? 'border-amber-400 text-amber-500' 
                : 'border-transparent text-zinc-400 hover:text-zinc-205'
            }`}
          >
            Kalkulator Sinyal
          </button>
        </div>

        {/* Tab content 1: Mini interactive SVG chart */}
        {indicatorTab === 'chart' && (
          <div id="ta-panel-chart" className="space-y-4">
            <div className="relative bg-zinc-50 border border-zinc-200 rounded-xl p-3 h-40 flex items-center justify-center dark:bg-zinc-950 dark:border-zinc-850 overflow-hidden">
              <svg className="w-full h-full" viewBox="0 0 360 140">
                {/* Horizontal gridlines */}
                <line x1="20" y1="35" x2="340" y2="35" stroke="rgba(161,161,170,0.15)" strokeDasharray="3,3" />
                <line x1="20" y1="70" x2="340" y2="70" stroke="rgba(161,161,170,0.15)" strokeDasharray="3,3" />
                <line x1="20" y1="105" x2="340" y2="105" stroke="rgba(161,161,170,0.15)" strokeDasharray="3,3" />

                {/* Graph Path */}
                <path
                  d={getGraphPath()}
                  fill="none"
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />

                {/* Active value glow dot */}
                {(() => {
                  const pts = activeAnalysis.chartPoints;
                  const idx = pts.length - 1;
                  const width = 360;
                  const height = 140;
                  const padding = 20;
                  const prices = pts.map(p => p.price);
                  const min = Math.min(...prices);
                  const max = Math.max(...prices);
                  const range = max - min === 0 ? 1 : max - min;
                  const x = padding + (idx / (pts.length - 1)) * (width - padding * 2);
                  const y = height - padding - ((pts[idx].price - min) / range) * (height - padding * 2);
                  return (
                    <g>
                      <circle cx={x} cy={y} r="6" fill="#FBBF24" className="animate-ping" style={{ transformOrigin: `${x}px ${y}px` }} />
                      <circle cx={x} cy={y} r="4.5" fill="#f59e0b" stroke="#ffffff" strokeWidth="1" />
                    </g>
                  );
                })()}

                {/* Axis text placeholders */}
                <text x="25" y="15" fill="#A1A1AA" fontSize="8" fontFamily="var(--font-mono)">Max: ${Math.max(...activeAnalysis.chartPoints.map(p=>p.price))}</text>
                <text x="25" y="135" fill="#A1A1AA" fontSize="8" fontFamily="var(--font-mono)">Min: ${Math.min(...activeAnalysis.chartPoints.map(p=>p.price))}</text>
              </svg>

              <div className="absolute top-2 right-2 text-[9px] font-mono bg-zinc-900 text-amber-400 px-2 py-0.5 rounded border border-amber-400/20">
                Live 24H Spark
              </div>
            </div>

            {/* Support and Resistance Pills */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-850 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Level Support</div>
                  <div className="font-mono font-bold text-sm text-emerald-500 dark:text-emerald-400">
                    ${activeAnalysis.support.toLocaleString()}
                  </div>
                </div>
                <div className="p-1 px-2 rounded font-mono text-[9px] bg-emerald-50 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900">
                  BELI (BUY)
                </div>
              </div>
              <div className="bg-zinc-50 border border-zinc-200 dark:bg-zinc-950 dark:border-zinc-850 p-3 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Level Resisten</div>
                  <div className="font-mono font-bold text-sm text-rose-500 dark:text-rose-400">
                    ${activeAnalysis.resistance.toLocaleString()}
                  </div>
                </div>
                <div className="p-1 px-2 rounded font-mono text-[9px] bg-rose-50 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400 border border-rose-200 dark:border-rose-900">
                  JUAL (SELL)
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab content 2: Core oscillators indicators */}
        {indicatorTab === 'indicators' && (
          <div id="ta-panel-indicators" className="space-y-3 bg-zinc-50 dark:bg-zinc-950 rounded-xl p-4 border border-zinc-200 dark:border-zinc-850">
            {/* RSI row */}
            <div className="flex items-center justify-between py-1 border-b border-zinc-200/50 dark:border-zinc-800/50">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span className="text-xs font-semibold">Relative Strength Index (RSI)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-300">{activeAnalysis.rsi}</span>
                <span className={`text-[10px] uppercase font-mono px-1.5 py-0.5 rounded font-black ${
                  activeAnalysis.rsi > 70 
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950/20 dark:text-rose-400' 
                    : activeAnalysis.rsi < 30 
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/20 dark:text-emerald-400'
                    : 'bg-zinc-200 text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300'
                }`}>
                  {activeAnalysis.rsi > 70 ? 'Overbought' : activeAnalysis.rsi < 30 ? 'Oversold' : 'Netral'}
                </span>
              </div>
            </div>

            {/* Moving average representation */}
            <div className="flex items-center justify-between py-1 border-b border-zinc-200/50 dark:border-zinc-800/50">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span className="text-xs font-semibold">Exponential Moving Average (EMA)</span>
              </div>
              <span className="font-mono text-[11px] font-bold text-emerald-500 dark:text-emerald-400">
                {activeAnalysis.movingAverage}
              </span>
            </div>

            {/* MACD representation */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                <span className="text-xs font-semibold">Garis Momentum MACD</span>
              </div>
              <span className="font-mono text-[11px] font-bold text-amber-500">
                {activeAnalysis.macd}
              </span>
            </div>

            <p className="text-[10.5px] text-zinc-500 flex items-start gap-1 mt-2">
              <Info className="w-3.5 h-3.5 shrink-0 text-amber-400 mt-0.5" />
              <span>
                Indikator diperbarui secara otomatis setiap koin mengalami pergeseran harga dinamis seketika.
              </span>
            </p>
          </div>
        )}

        {/* Tab content 3: Sinyal Range Trade calculator */}
        {indicatorTab === 'calculator' && (
          <div id="ta-panel-calculator" className="space-y-4">
            <div className="bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 p-4 rounded-xl">
              <label htmlFor="calc-price-input" className="block text-xs font-semibold mb-1.5 text-zinc-700 dark:text-zinc-300">
                Masukkan Harga Ambil Posisi Anda ($):
              </label>
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <span className="absolute left-3 top-2.5 font-mono text-xs text-zinc-400">$</span>
                  <input
                    id="calc-price-input"
                    type="number"
                    value={calcPrice}
                    onChange={(e) => setCalcPrice(e.target.value)}
                    placeholder={`e.g., ${activeAnalysis.support + 500}`}
                    className="w-full pl-6 pr-3 py-2 text-xs rounded-lg border border-zinc-200 dark:border-zinc-850 bg-white dark:bg-zinc-900 outline-none focus:border-amber-400 font-mono"
                  />
                </div>
                <button
                  id="calc-check-btn"
                  onClick={calculateAction}
                  className="bg-amber-400 text-zinc-950 hover:bg-amber-500 font-bold text-xs px-4 py-2 rounded-lg border border-zinc-900 transition-colors"
                >
                  Hitung Sinyal
                </button>
              </div>

              {/* Calculator Output */}
              {calcResult ? (
                <div className={`mt-4 border p-3 rounded-lg text-xs leading-relaxed transition-all ${calcResult.color}`}>
                  <div className="font-bold uppercase tracking-wider text-[10px] opacity-75">Zona Posisi:</div>
                  <div className="font-display font-extrabold text-sm mb-1">{calcResult.zone}</div>
                  <div className="font-bold flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Rekomendasi: {calcResult.action}</span>
                  </div>
                  <div className="mt-1 font-mono text-[10px] opacity-90">{calcResult.distance}</div>
                </div>
              ) : (
                <p className="text-[10px] text-zinc-400 mt-2 text-center">
                  Bandingkan harga entry Anda dengan support harian dan resistensi saat ini.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Written Expert Analysis */}
        <div className="border-t border-zinc-100 dark:border-zinc-800 pt-4 leading-relaxed">
          <p className="text-xs text-zinc-650 dark:text-zinc-300 italic">
            "{activeAnalysis.summary}"
          </p>
          
          <details className="mt-2 group">
            <summary className="text-xs font-bold text-amber-500 cursor-pointer list-none flex items-center gap-1 hover:underline select-none">
              <span>Baca Analisis Ahali Selengkapnya</span>
              <ChevronRight className="w-3 h-3 group-open:rotate-90 transition-transform" />
            </summary>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 mt-2 whitespace-pre-line border-l-2 border-amber-300 pl-3 leading-relaxed">
              {activeAnalysis.content}
            </p>
          </details>
        </div>
      </div>
    </div>
  );
}
