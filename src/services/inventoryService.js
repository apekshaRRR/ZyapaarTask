// src/services/inventoryService.js

import axios from "axios";

const API_URL = 'http://localhost:8081/api/inventory';

const createItem = (item) => {
    return axios.post(API_URL, item);
};

const updateItem = (id, item) => {
    return axios.put(`${API_URL}/${id}`, item);
};

const getAllItems = () => {
    return axios.get(API_URL);
};

const deleteItem = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

const getItem = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export default {
    createItem,
    updateItem,
    getAllItems,
    deleteItem,
    getItem,
};
