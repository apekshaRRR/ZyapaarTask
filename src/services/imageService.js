// src/services/imageService.js

import axios from 'axios';

const API_URL = 'http://localhost:8081/api/images';

const uploadImage = (file) => {
    let formData = new FormData();
    formData.append('file', file);
    return axios.post(`${API_URL}/upload`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

const getImage = (id) => {
    return axios.get(`${API_URL}/${id}`, { responseType: 'blob' });
};

export { uploadImage, getImage };
