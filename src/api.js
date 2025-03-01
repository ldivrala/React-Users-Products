import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com/',
  timeout: 5000,
});

export const fetchUsers = (params) => api.get('/users', { params });
export const fetchFilterUsers = (params) => api.get('/users/filter', { params });
export const fetchProducts = (params) => api.get('/products', { params });
export const fetchCategories = () => api.get('/products/categories');
export const searchProducts = (query, params) => api.get(`/products/search?q=${query}`, { params });
export const filterProductsByCategory = (category) => api.get(`/products/category/${category}`);