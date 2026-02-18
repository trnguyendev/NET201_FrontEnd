import axiosClient from '@/api/axiosClient';

const categoryService = {
  getAllCategories: async () => {
    const url = '/Categories';
    const response = await axiosClient.get(url);
    return response.data;
  }
};

export default categoryService;
