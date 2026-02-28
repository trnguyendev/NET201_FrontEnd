import axiosClient from '@/api/axiosClient';

const productService = {
  getAllProducts: async () => {
    const url = '/Products';
    const response = await axiosClient.get(url);
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
