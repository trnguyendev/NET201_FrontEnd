import axiosClient from '@/api/axiosClient';

const sizeService = {
  getAllSizes: async () => {
    const url = '/ProductSizes';
    const response = await axiosClient.get(url);
    return response;
  },

  createSize: async data => {
    const url = '/ProductSizes';
    const response = await axiosClient.post(url, data);
    return response;
  },

  deleteSize: async id => {
    const url = `/ProductSizes/${id}`;
    const response = await axiosClient.delete(url);
    return response;
  },

  updateSize: async (id, data) => {
    const url = `/ProductSizes/${id}`;
    const response = await axiosClient.put(url, data);
    return response;
  }
};

export default sizeService;
