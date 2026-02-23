import axiosClient from '@/api/axiosClient';

const productService = {
  getAllProducts: async () => {
    const url = '/Products';
    const response = await axiosClient.get(url);
    return response;
  },

  getHomeProducts: async () => {
    const url = '/Products/home';
    const response = await axiosClient.get(url);
    return response;
  },

  getProductDetail: async id => {
    const url = `/Products/detail/${id}`;
    const response = await axiosClient.get(url);
    return response;
  }
};

export default productService;
