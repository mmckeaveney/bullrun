const API_URL = "http://localhost:5000";

const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

async function fetchStockQuote(symbol) {
  const response = await fetch(`${API_URL}/stocks/${symbol}`, {
    headers: DEFAULT_HEADERS
  });
  return await response.json();
}

async function fetchForexQuotes({ from, to }) {
  const response = await fetch(`${API_URL}/forex?from=${from}&to=${to}`, {
    headers: DEFAULT_HEADERS
  });
  return await response.json();
}

async function searchStocks(search) {
  const response = await fetch(`${API_URL}/search?search=${search}`, {
    headers: DEFAULT_HEADERS
  });
  return await response.json();
}

export { fetchStockQuote, fetchForexQuotes, searchStocks };
