import axios from 'axios';
import { API_URL, API_TOKEN } from '@env';

console.log('changed', API_URL);
const instance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        'Authorization': 'Bearer ' + API_TOKEN,
        'Content-Type': 'application/json',
    }
});

export default instance;
