import requests
import os


class AlphaVantageClient:
    def __init__(self, url):
        self.api_key = os.environ["ALPHA_VANTAGE_API_KEY"]
        self.url = url

    def fetch_stock_quotes(self, function, symbol):
        payload = {
            'function':  function,
            'symbol': symbol,
            'apikey': self.api_key
        }
        response = requests.get(f'{self.url}', params=payload)
        return response.json()

    def fetch_forex_quotes(self, function, from_symbol, to_symbol, interval):
        payload = {
            'function':  function,
            'from_symbol': from_symbol,
            'to_symbol': to_symbol,
            'interval': interval,
            'apikey': self.api_key
        }
        response = requests.get(f'{self.url}', params=payload)
        return response.json()

    def search_stocks(self, function, search):
        payload = {
            'function':  function,
            'keywords': search,
            'apikey': self.api_key
        }
        response = requests.get(f'{self.url}', params=payload)
        return response.json()
