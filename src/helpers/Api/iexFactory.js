import axios from 'axios';

// View https://iextrading.com/developer/docs/ for API docs
const baseUrl = 'https://api.iextrading.com/1.0';

const bookRequest = (ticker) => {
  axios.get(`${baseUrl}/stock/${ticker}/book`)
    .then(res => console.log(res.data))
    .catch(err => console.error(err));
};

export default {
  bookRequest,
};
