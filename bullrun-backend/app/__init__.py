from flask import Flask, jsonify, request, abort
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
from monitor.yahoo_finance import YahooFinanceMonitor
from api.alpha_vantage import AlphaVantageClient

YAHOO_FINANCE_SCRAPE_URL = "https://uk.finance.yahoo.com/quote/%5EFTSE/components?p=%5EFTSE"

app = Flask("bullrun-backend")
CORS(app)


socketio = SocketIO(app=app, cors_allowed_origins="*")

monitor = YahooFinanceMonitor(url=YAHOO_FINANCE_SCRAPE_URL)
cron = BackgroundScheduler()
cron.start()

ALPHA_VANTAGE_URL = 'https://www.alphavantage.co/query'
alpha_vantage_client = AlphaVantageClient(ALPHA_VANTAGE_URL)


@cron.scheduled_job('interval', id='scrape_yahoo_finance', seconds=30)
def scrape_yahoo_finance():
    monitor.scrape(socketio)


@app.route('/stocks/<symbol>')
def fetch_stock_quote_for_symbol(symbol):
    stock_quote = alpha_vantage_client.fetch_stock_quotes(
        function='TIME_SERIES_DAILY',
        symbol=symbol
    )
    return jsonify(stock_quote[f"Time Series (Daily)"])


@app.route('/forex')
def fetch_forex_quotes():
    from_currency = request.args.get('from')
    to_currency = request.args.get('to')
    interval = '30min'

    if from_currency is None or to_currency is None:
        abort(400)

    forex_quotes = alpha_vantage_client.fetch_forex_quotes(
        function='FX_INTRADAY',
        from_symbol=from_currency,
        to_symbol=to_currency,
        interval=interval
    )
    return jsonify(forex_quotes[f"Time Series FX ({interval})"])


@app.route('/search')
def search_stocks():
    search = request.args.get('search')
    stocks = alpha_vantage_client.search_stocks(
        function="SYMBOL_SEARCH",
        search=search
    )
    return jsonify(list(stocks["bestMatches"]))


if __name__ == '__main__':
    socketio.run(host="0.0.0.0", app=app)
