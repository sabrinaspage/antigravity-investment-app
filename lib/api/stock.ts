import YahooFinance from 'yahoo-finance2';
const yahooFinance = new (YahooFinance as any)();

export interface ChartDataPoint {
  time: string;
  value: number;
}

export async function getStockQuote(ticker: string) {
  try {
    const quote = await yahooFinance.quote(ticker);
    return quote;
  } catch (error) {
    console.error(`Error fetching quote for ${ticker}:`, error);
    return null;
  }
}

export async function getStockChartData(ticker: string, range: '1d' | '5d' | '1mo' | '3mo' | '1y' | '5y' = '1mo'): Promise<ChartDataPoint[]> {
  try {
    const period1 = new Date();
    
    switch (range) {
      case '1d': period1.setDate(period1.getDate() - 1); break;
      case '5d': period1.setDate(period1.getDate() - 5); break;
      case '1mo': period1.setMonth(period1.getMonth() - 1); break;
      case '3mo': period1.setMonth(period1.getMonth() - 3); break;
      case '1y': period1.setFullYear(period1.getFullYear() - 1); break;
      case '5y': period1.setFullYear(period1.getFullYear() - 5); break;
    }
    
    const queryOptions = { period1: period1.toISOString() };
    const result = await yahooFinance.chart(ticker, queryOptions);
    
    if (!result || !result.quotes || result.quotes.length === 0) {
      return [];
    }
    
    return result.quotes.map((q: any) => ({
      time: q.date.toISOString().split('T')[0], // Simple YYYY-MM-DD for lightweight-charts
      value: q.close ?? 0
    })).filter((q: any) => q.value !== 0);
    
  } catch (error) {
    console.error(`Error fetching chart data for ${ticker}:`, error);
    return [];
  }
}
