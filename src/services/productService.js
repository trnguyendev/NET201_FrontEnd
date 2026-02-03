import axiosClient from '@/api/axiosClient';

const productService = {
  getAllProducts: async () => {
    const url = '/Product';
    const response = await axiosClient.get(url);
    return response.data;
  }
};

export default productService;
