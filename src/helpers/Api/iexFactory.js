import axios from 'axios';

// View https://iextrading.com/developer/docs/ for API docs
const baseUrl = 'https://api.iextrading.com/1.0';

// returns ticker for API ticker validation
const symbolRequest = ticker => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/stock/${ticker}/quote?filter=symbol`)
    .then(res => resolve(res.data.symbol))
    .catch(err => reject(err));
});

// returns full quote from API
const quoteRequest = ticker => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/stock/${ticker}/quote`)
    .then(res => resolve(res.data))
    .catch(err => reject(err));
});

// returns company name and the latest price
const savedStockInfo = ticker => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/stock/${ticker}/quote?filter=companyName,latestPrice`)
    .then(res => resolve(res.data))
    .catch(err => reject(err));
});

// returns chart values from API
const chartValues = (ticker, timeFrame) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/stock/${ticker}/chart/${timeFrame}?filter=label,low`)
    .then((res) => {
      const validLow = [];
      res.data.forEach((x) => {
        if (x.low !== -1) {
          validLow.push(x);
        }
      });
      resolve(validLow);
    })
    .catch(err => reject(err));
});

export default {
  symbolRequest,
  quoteRequest,
  savedStockInfo,
  chartValues,
};
