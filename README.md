# Antigravity Investment App

A Robinhood-inspired web application for viewing stock information, interactive charts, and latest news. Built using Next.js (Pages Router), Tailwind CSS v3, Recharts, and Yahoo Finance API.

## Architecture

```mermaid
graph TD
    Client[User Browser]
    
    subPages[Pages]
    Index[pages/index.tsx]
    StockView[pages/stocks/[ticker].tsx]
    APIChart[pages/api/chart.ts]
    
    subComponents[Components]
    Layout[components/Layout.tsx]
    SearchBar[components/SearchBar.tsx]
    StockChart[components/StockChart.tsx]
    NewsFeed[components/NewsFeed.tsx]
    
    subAPI[Yahoo Finance API]
    YFQuote[quote]
    YFChart[chart]
    YFNews[search news]
    
    Client -->|Loads Home| Index
    Index --> Layout
    Client -->|Searches Ticker| SearchBar
    SearchBar -->|Navigates| StockView
    
    %% Server Side Render
    StockView -->|SSR| SSR[getServerSideProps]
    SSR --> YFQuote
    SSR --> YFNews
    
    %% Client Side Fetch
    Client -->|Changes Time Range| APIChart
    APIChart --> YFChart
    
    %% Renders Components
    StockView --> Layout
    StockView --> StockChart
    StockView --> NewsFeed
```

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
