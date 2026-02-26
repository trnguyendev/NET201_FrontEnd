import axiosClient from '@/api/axiosClient';

const brandService = {
  getAllBrand: async () => {
    const url = '/Brands';
    const response = await axiosClient.get(url);
    return response;
  }
};

export default brandService;
