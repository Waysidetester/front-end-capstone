import axios from 'axios';

// View https://iextrading.com/developer/docs/ for API docs
const baseUrl = 'https://api.iextrading.com/1.0';

const symbolRequest = ticker => new Promise((resolve, reject) => {
  axios.get(`${baseUrl}/stock/${ticker}/quote?filter=symbol`)
    .then(res => resolve(res.data.symbol))
    .catch(err => reject(err));
});

export default {
  symbolRequest,
};
