import axiosClient from '@/api/axiosClient';

const categoryService = {
  getAllCategories: async () => {
    const res = axiosClient.get('/Categories');
    return res;
  }
};

export default categoryService;
