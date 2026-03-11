import Layout from '../components/Layout';
import { TrendingUp, ShieldCheck, Zap } from 'lucide-react';

export default function Home() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 animate-in fade-in zoom-in duration-500">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
          Investing for <span className="text-rhGreen">Everyone</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl">
          Search for a stock ticker above to view real-time price charts, historical data, and the latest news moving the markets.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 text-left max-w-4xl">
          <div className="bg-rhGray p-6 rounded-2xl flex flex-col items-start gap-4 hover:shadow-[0_0_15px_rgba(0,200,5,0.1)] transition-shadow">
            <TrendingUp className="w-10 h-10 text-rhGreen" />
            <h3 className="text-xl font-semibold">Interactive Charts</h3>
            <p className="text-gray-400 text-sm">Visualize price actions and historical trends with our interactive charts.</p>
          </div>
          <div className="bg-rhGray p-6 rounded-2xl flex flex-col items-start gap-4 hover:shadow-[0_0_15px_rgba(0,200,5,0.1)] transition-shadow">
            <Zap className="w-10 h-10 text-rhGreen" />
            <h3 className="text-xl font-semibold">Real-Time Data</h3>
            <p className="text-gray-400 text-sm">Powered by Yahoo Finance API to bring you up-to-the-minute market information.</p>
          </div>
          <div className="bg-rhGray p-6 rounded-2xl flex flex-col items-start gap-4 hover:shadow-[0_0_15px_rgba(0,200,5,0.1)] transition-shadow">
            <ShieldCheck className="w-10 h-10 text-rhGreen" />
            <h3 className="text-xl font-semibold">Latest News</h3>
            <p className="text-gray-400 text-sm">Stay informed with curated news articles dynamically loaded for each ticker.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
