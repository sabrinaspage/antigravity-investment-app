import YahooFinance from 'yahoo-finance2';
const yahooFinance = new (YahooFinance as any)();

export interface NewsArticle {
  title: string;
  link: string;
  publisher: string;
  providerPublishTime: number;
  thumbnail?: string;
}

export async function getStockNews(ticker: string): Promise<NewsArticle[]> {
  try {
    // Yahoo Finance search frequently returns news articles for a ticker
    const result = await yahooFinance.search(ticker, { newsCount: 10 });
    
    if (!result || !result.news) {
      return [];
    }

    return result.news.map((item: any) => ({
      title: item.title,
      link: item.link,
      publisher: item.publisher,
      providerPublishTime: item.providerPublishTime,
      thumbnail: item.thumbnail?.resolutions?.[0]?.url
    }));
  } catch (error) {
    console.error(`Error fetching news for ${ticker}:`, error);
    return [];
  }
}
