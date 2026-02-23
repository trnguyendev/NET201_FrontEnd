import axiosClient from '@/api/axiosClient';

const orderService = {
  checkout: async data => {
    const url = '/Orders/checkout';
    const response = await axiosClient.post(url, data);
    return response;
  },

  // Lấy đơn hàng của TÔI
  getMyOrders: async () => {
    return await axiosClient.get('/Orders/my-orders');
  },

  // TÔI tự hủy đơn hàng
  cancelMyOrder: async id => {
    return await axiosClient.put(`/Orders/my-orders/${id}/cancel`);
  }
};
export default orderService;
