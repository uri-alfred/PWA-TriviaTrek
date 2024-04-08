import { urlServer } from '../firebase.js';
import axios from 'axios';

const get = async (endpoint) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.get(urlServer + endpoint, config);
        return await response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-lanzar el error para que pueda ser manejado en el componente que llama a esta función
    }
}

const post = async (endpoint, body = {}) => {
    const token = localStorage.getItem('token');
    const config = {
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        const response = await axios.post(urlServer + endpoint, body, config);
        return await response.data;
    } catch (error) {
        console.error('Error:', error);
        throw error; // Re-lanzar el error para que pueda ser manejado en el componente que llama a esta función
    }
}


export { get, post };
