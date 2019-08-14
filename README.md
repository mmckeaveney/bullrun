# BullRun
BullRun is an application that allows you to organise forex and stocks + shares data in a custom dashboard. 

It encompasses a react frontend and a python flask API with websocket support.

*Features*:
  - Ceate candlestick charts in your dashboard for intraday forex pairs data or daily stock price data
  - receive live stock updates from the FTSE 100, driven by a beautifulsoup web scraper, redis and websockets.
  - Drag, resize and rearrange the candlestick charts to get the best view of your financial data. 
  - Fetch the latest stock and forex data from alphavantage.co

BullRun took around 4 hours to build, and I wanted to try and pack a few features in so in the interest of time there are no tests. 

# Running Instructions
You need docker-compose to start BullRun.

```
docker-compose up
```

then go to http://localhost:3000.

