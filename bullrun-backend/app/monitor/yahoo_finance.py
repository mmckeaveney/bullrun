from requests import get
from bs4 import BeautifulSoup
from redis_client import redis_client
import logging


class YahooFinanceMonitor:
    def __init__(self, url):
        self.url = url

    def scrape(self, socketio):
        response = get(self.url)
        soup = BeautifulSoup(response.text, "html.parser")
        changes = []
        for stock_price_row in soup.tbody.find_all("tr"):
            stock_quote = [cell.text for cell in stock_price_row.find_all("td")]
            symbol = stock_quote[0]
            company_name = stock_quote[1]
            current_price = stock_quote[2]
            old_price = redis_client.getset(symbol, current_price)

            if old_price is None:
                return

            old_price = old_price.decode('utf-8')

            if old_price != current_price:
                logging.info(f"stock price changed! {company_name} to {current_price}")

                changes.append({
                    'company_name': company_name,
                    'old_price': old_price,
                    'current_price': current_price
                })
        socketio.emit('stock_update', changes)

