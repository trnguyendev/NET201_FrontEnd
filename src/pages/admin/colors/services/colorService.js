import axiosClient from '@/api/axiosClient';

const colorService = {
  getAllProductColors: async () => {
    const url = '/ProductColors';
    const response = await axiosClient.get(url);
    return response.data;
  },

  createProductColor: async data => {
    const url = '/ProductColors';
    const response = await axiosClient.post(url, data);
    return response.data;
  },

  deleteProductColor: async id => {
    const url = `/ProductColors/${id}`;
    const response = await axiosClient.delete(url);
    return response.data;
  },

  updateProductColor: async (id, data) => {
    const url = `/ProductColors/${id}`;
    const response = await axiosClient.put(url, data);
    return response.data;
  }
};

export default colorService;
