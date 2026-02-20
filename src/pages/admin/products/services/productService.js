import axiosClient from '@/api/axiosClient';

const productService = {
  getAllProducts: async () => {
    const url = '/Products';
    const response = await axiosClient.get(url);
    return response.data;
  },

  createProduct: async data => {
    const url = '/Products';
    const response = await axiosClient.post(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  updateProduct: async (id, data) => {
    const url = `/Products/${id}`;
    const response = await axiosClient.put(url, data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  deleteProduct: async id => {
    const url = `/Products/${id}`;
    const response = await axiosClient.delete(url);
    return response.data;
  },

  getHomeProducts: async () => {
    const url = '/Products/home';
    const response = await axiosClient.get(url);
    return response.data;
  }
};

export default productService;
