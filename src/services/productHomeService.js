import axiosClient from '@/api/axiosClient';

const productHomeService = {
  getAllProducts: async () => {
    const url = '/Products/home';
    const response = await axiosClient.get(url);
    return response.data;
  }
};

export default productHomeService;
