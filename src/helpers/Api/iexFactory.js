import axios from 'axios';
import key from './iexKeys';

// View https://iextrading.com/developer/docs/ for API docs
const baseUrl = 'https://sandbox.iexapis.com/v1/';

// returns ticker for API ticker validation
const symbolRequest = ticker => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/stock/${ticker}/quote?token=${key}&filter=symbol`)
    .then(res => resolve(res.data.symbol))
    .catch(err => reject(err));
});

// returns full quote from API
const quoteRequest = ticker => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/stock/${ticker}/quote?token=${key}`)
    .then(res => resolve(res.data))
    .catch(err => reject(err));
});

// returns company name and the latest price
const savedStockInfo = ticker => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/stock/${ticker}/quote?token=${key}&filter=companyName,latestPrice`)
    .then(res => resolve(res.data))
    .catch(err => reject(err));
});

// returns chart values from API
const chartValues = (ticker, timeFrame) => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/stock/${ticker}/chart/${timeFrame}?token=${key}&filter=label,low`)
    .then((res) => {
      const validLow = [];
      res.data.forEach((x) => {
        if (x.low !== -1 && typeof x.low === 'number') {
          x.low.toFixed(2);
          validLow.push(x);
        }
      });
      resolve(validLow);
    })
    .catch(err => reject(err));
});

// returns logo images from api database
const getLogo = ticker => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/stock/${ticker}/logo?token=${key}`)
    .then(res => resolve(res.data))
    .catch(err => reject(err));
});

const getFinancialDetail = ticker => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/stock/${ticker}/financials?token=${key}`)
    .then(res => resolve(res.data.financials[0]))
    .catch(err => reject(err));
});

const getCompanyDetails = ticker => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/stock/${ticker}/company?token=${key}`)
    .then(res => resolve(res.data))
    .catch(err => reject(err));
});

const getNewsInfo = ticker => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/stock/${ticker}/news?token=${key}`)
    .then(res => resolve(res.data))
    .catch(err => reject(err));
});


export default {
  symbolRequest,
  quoteRequest,
  savedStockInfo,
  chartValues,
  getLogo,
  getFinancialDetail,
  getNewsInfo,
  getCompanyDetails,
};
