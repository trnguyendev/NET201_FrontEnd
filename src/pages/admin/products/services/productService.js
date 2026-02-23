import axiosClient from '@/api/axiosClient';

const productService = {
  getAllProducts: async () => {
    const url = '/Products';
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

  getHomeProducts: async () => {
    const url = '/Products/home';
    const response = await axiosClient.get(url);
    return response;
  }
};

export default productService;
