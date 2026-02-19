import axiosClient from '@/api/axiosClient';

const sizeService = {
  getAllSizes: async () => {
    const url = '/ProductSizes';
    const response = await axiosClient.get(url);
    return response.data;
  },

  createSize: async data => {
    const url = '/ProductSizes';
    const response = await axiosClient.post(url, data);
    return response.data;
  },

  deleteSize: async id => {
    const url = `/ProductSizes/${id}`;
    const response = await axiosClient.delete(url);
    return response.data;
  },

  updateSize: async (id, data) => {
    const url = `/ProductSizes/${id}`;
    const response = await axiosClient.put(url, data);
    return response.data;
  }
};

export default sizeService;
