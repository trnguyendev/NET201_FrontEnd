import axiosClient from '@/api/axiosClient';

const categoryService = {
  getAllCategories: async () => {
    const url = '/Categories';
    const response = await axiosClient.get(url);
    return response.data;
  },

  createCategory: async data => {
    const url = '/Categories';
    const response = await axiosClient.post(url, data);
    return response.data;
  },

  deleteCategory: async id => {
    const url = `/Categories/${id}`;
    const response = await axiosClient.delete(url);
    return response.data;
  },

  updateCategory: async (id, data) => {
    const url = `/Categories/${id}`;
    const response = await axiosClient.put(url, data);
    return response.data;
  }
};

export default categoryService;
