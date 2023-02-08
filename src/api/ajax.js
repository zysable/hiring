import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:4000';
axios.defaults.withCredentials = true;

export default function ajax(url, data = {}, method = 'GET') {
  return new Promise((resolve, reject) => {
    if (method === 'GET') {
      let queryStr = Object.keys(data).map(key => key + '=' + data[key]).join('&');
      queryStr = queryStr ? `?${queryStr}` : queryStr;
      axios.get(url + queryStr).then(res => resolve(res.data)).catch(err => reject(err));
    } else {
      axios({url, method, data}).then(res => resolve(res.data)).catch(err => reject(err));
    }
  });
};