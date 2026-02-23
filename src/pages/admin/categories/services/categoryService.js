import axiosClient from '@/api/axiosClient';

const categoryService = {
  getAllCategories: async () => {
    const url = '/Categories';
    const response = await axiosClient.get(url);
    return response;
  },

  createCategory: async data => {
    const url = '/Categories';
    const response = await axiosClient.post(url, data);
    return response;
  },

  deleteCategory: async id => {
    const url = `/Categories/${id}`;
    const response = await axiosClient.delete(url);
    return response;
  },

  updateCategory: async (id, data) => {
    const url = `/Categories/${id}`;
    const response = await axiosClient.put(url, data);
    return response;
  }
};

export default categoryService;
