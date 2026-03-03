import axiosClient from '@/api/axiosClient';

const productService = {
  getAllProducts: async (page = 1, limit = 20) => {
    const url = `/Products?page=${page}&limit=${limit}`;
    const response = await axiosClient.get(url);
    return response;
  },

  createProduct: async data => {
    const url = '/Products';
    const response = await axiosClient.post(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response;
  },

  updateProduct: async (id, data) => {
    const url = `/Products/${id}`;
    const response = await axiosClient.put(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response;
  },

  deleteProduct: async id => {
    const url = `/Products/${id}`;
    const response = await axiosClient.delete(url);
    return response;
  },

  getHomeProducts: async (page = 1, limit = 12) => {
    const response = await axiosClient.get(`/Products/home?page=${page}&limit=${limit}`);
    return response;
  },

  getProductDetail: async id => {
    const url = `/Products/detail/${id}`;
    const response = await axiosClient.get(url);
    return response;
  },

  getProductsByCategory: async (id, page = 1, limit = 12) => {
    const response = await axiosClient.get(`/Products/category/${id}?page=${page}&limit=${limit}`);
    return response;
  }
};

export default productService;
