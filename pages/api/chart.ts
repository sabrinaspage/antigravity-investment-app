import { NextApiRequest, NextApiResponse } from 'next';
import { getStockChartData } from '../../lib/api/stock';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { ticker, range } = req.query;

  if (!ticker || typeof ticker !== 'string') {
    return res.status(400).json({ error: 'Missing ticker' });
  }

  const validRanges = ['1d', '5d', '1mo', '3mo', '1y', '5y'];
  let apiRange = '1mo';
  if (typeof range === 'string' && validRanges.includes(range.toLowerCase())) {
    apiRange = range.toLowerCase();
  }

  try {
    const data = await getStockChartData(ticker, apiRange as any);
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to fetch chart data' });
  }
}
