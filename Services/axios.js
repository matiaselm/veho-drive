import axios from 'axios';

axios.defaults.baseURL = 'http://192.168.1.6:3000';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

const instance = axios.create({
    baseURL: 'http://192.168.1.6:3000',
    timeout: 1000,
});

export default instance;
