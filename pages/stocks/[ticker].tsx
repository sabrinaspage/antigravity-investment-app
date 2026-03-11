import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Layout from '../../components/Layout';
import StockChart from '../../components/StockChart';
import NewsFeed from '../../components/NewsFeed';
import { getStockQuote, getStockChartData, ChartDataPoint } from '../../lib/api/stock';
import { getStockNews, NewsArticle } from '../../lib/api/news';
import { GetServerSideProps } from 'next';

interface StockDashboardProps {
  ticker: string;
  quote: any;
  chartData: ChartDataPoint[];
  news: NewsArticle[];
  error?: string;
}

export default function StockDashboard({ ticker, quote, chartData, news, error }: StockDashboardProps) {
  const [selectedRange, setSelectedRange] = useState('1M');
  const [currentChartData, setCurrentChartData] = useState<ChartDataPoint[]>(chartData);
  const [isChartLoading, setIsChartLoading] = useState(false);

  const handleRangeClick = async (range: string) => {
    if (range === selectedRange) return;
    setSelectedRange(range);
    setIsChartLoading(true);
    
    const rangeMap: Record<string, string> = {
      '1D': '1d',
      '1W': '5d',
      '1M': '1mo',
      '3M': '3mo',
      '1Y': '1y',
      '5Y': '5y'
    };
    
    try {
      const res = await fetch(`/api/chart?ticker=${ticker}&range=${rangeMap[range]}`);
      if (res.ok) {
        const data = await res.json();
        setCurrentChartData(data);
      }
    } catch (e) {
      console.error("Failed to fetch new chart data", e);
    } finally {
      setIsChartLoading(false);
    }
  };

  useEffect(() => {
    setCurrentChartData(chartData);
    setSelectedRange('1M');
  }, [ticker, chartData]);

  if (error) {
    return (
      <Layout title="Error">
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center">
          <h1 className="text-3xl font-bold mb-4">Error loading data</h1>
          <p className="text-gray-400">{error}</p>
        </div>
      </Layout>
    );
  }

  if (!quote) {
    return (
      <Layout>
        <div className="flex justify-center mt-20">No matching ticker found.</div>
      </Layout>
    );
  }

  const price = quote.regularMarketPrice ?? 0;
  const change = quote.regularMarketChange ?? 0;
  const changePercent = quote.regularMarketChangePercent ?? 0;
  const isPositive = change >= 0;
  const colorClass = isPositive ? 'text-rhGreen' : 'text-rhRed';
  const colorHex = isPositive ? '#00C805' : '#FF5000';

  return (
    <Layout title={`${ticker.toUpperCase()} | InvestApp`}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-4 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Left Column: Chart and Stats */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-4xl font-bold">{quote.shortName || ticker.toUpperCase()}</h1>
            <div className="mt-2">
              <span className="text-4xl font-bold">${price.toFixed(2)}</span>
              <div className={`mt-1 font-semibold text-lg flex items-center space-x-2 ${colorClass}`}>
                <span>{isPositive ? '+' : ''}{change.toFixed(2)}</span>
                <span>({isPositive ? '+' : ''}{changePercent.toFixed(2)}%)</span>
                <span className="text-gray-500 text-sm font-normal ml-2">Today</span>
              </div>
            </div>
          </div>

          <div className="relative">
            {isChartLoading && (
              <div className="absolute inset-0 z-10 flex items-center justify-center bg-rhDark/50 backdrop-blur-sm">
                <span className="text-rhGreen font-semibold animate-pulse">Loading Chart...</span>
              </div>
            )}
            <StockChart data={currentChartData} color={colorHex} />
          </div>

          <div className="flex space-x-4 border-b border-gray-800 pb-4">
            {/* Time range selectors (styling only for now) */}
            {['1D', '1W', '1M', '3M', '1Y', '5Y'].map((range) => (
              <button
                key={range}
                onClick={() => handleRangeClick(range)}
                className={`font-semibold pb-1 border-b-2 transition-colors ${
                  selectedRange === range 
                    ? `text-${isPositive ? 'rhGreen' : 'rhRed'} border-${isPositive ? 'rhGreen' : 'rhRed'}` 
                    : 'text-gray-500 border-transparent hover:text-gray-300'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-b border-gray-800">
            <div>
              <p className="text-gray-400 text-sm mb-1">Open</p>
              <p className="font-semibold">${quote.regularMarketOpen?.toFixed(2) ?? '-'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">High</p>
              <p className="font-semibold">${quote.regularMarketDayHigh?.toFixed(2) ?? '-'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Low</p>
              <p className="font-semibold">${quote.regularMarketDayLow?.toFixed(2) ?? '-'}</p>
            </div>
            <div>
              <p className="text-gray-400 text-sm mb-1">Vol</p>
              <p className="font-semibold">{(quote.regularMarketVolume / 1000000).toFixed(2)}M</p>
            </div>
          </div>
        </div>

        {/* Right Column: News */}
        <div className="lg:col-span-1">
          <NewsFeed news={news} />
        </div>

      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ticker = context.params?.ticker as string;

  if (!ticker) {
    return { notFound: true };
  }

  try {
    const quote = await getStockQuote(ticker);
    const chartData = await getStockChartData(ticker, '1mo');
    const news = await getStockNews(ticker);

    return {
      props: {
        ticker,
        quote: JSON.parse(JSON.stringify(quote)), // Handle serialization
        chartData: JSON.parse(JSON.stringify(chartData)),
        news: JSON.parse(JSON.stringify(news)),
      }
    };
  } catch (error) {
    return {
      props: { ticker, error: 'Failed to fetch data. Ticker might be invalid or rate limited.' }
    };
  }
};
