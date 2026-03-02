import axiosClient from '@/api/axiosClient';

const orderService = {
  checkout: async data => {
    const url = '/Orders/checkout';
    const response = await axiosClient.post(url, data);
    return response;
  },

  getMyOrders: async () => {
    return await axiosClient.get('/Orders/my-orders');
  },

  cancelMyOrder: async id => {
    return await axiosClient.put(`/Orders/my-orders/${id}/cancel`);
  },

  getAllOrders: async () => {
    const url = '/Orders';
    return await axiosClient.get(url);
  },

  updateStatus: async (id, status) => {
    const url = `/Orders/${id}/status`;
    return await axiosClient.put(url, status, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
export default orderService;
