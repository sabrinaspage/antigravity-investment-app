import React from 'react';
import { NewsArticle } from '../lib/api/news';

interface NewsFeedProps {
  news: NewsArticle[];
}

export default function NewsFeed({ news }: NewsFeedProps) {
  if (!news || news.length === 0) {
    return <div className="text-gray-500 py-4">No recent news available.</div>;
  }

  const formatTime = (dateValue: string | number) => {
    const date = new Date(dateValue);
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="space-y-6 mt-6">
      <h2 className="text-2xl font-semibold border-b border-gray-800 pb-4">Latest News</h2>
      <div className="flex flex-col space-y-4">
        {news.map((item, index) => (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-4 p-4 rounded-xl bg-rhGray hover:bg-gray-800 transition-colors border border-transparent hover:border-gray-700"
          >
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-2 text-xs text-gray-400 mb-2">
                  <span className="font-semibold text-white">{item.publisher}</span>
                  <span>•</span>
                  <span>{formatTime(item.providerPublishTime)}</span>
                </div>
                <h3 className="text-base font-medium text-gray-200 group-hover:text-rhGreen transition-colors leading-snug">
                  {item.title}
                </h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
