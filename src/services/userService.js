import axiosClient from '@/api/axiosClient';

const userService = {
  getAllUsers: async (page = 1, limit = 20) => {
    const url = `/Users?page=${page}&limit=${limit}`;
    return await axiosClient.get(url);
  },

  getUserById: async id => {
    const url = `/Users/${id}`;
    return await axiosClient.get(url);
  },

  updateUser: async (id, data) => {
    const url = `/Users/${id}`;
    return await axiosClient.put(url, data);
  },

  toggleUserStatus: async id => {
    const url = `/Users/${id}/toggle-status`;
    return await axiosClient.patch(url);
  }
};

export default userService;
