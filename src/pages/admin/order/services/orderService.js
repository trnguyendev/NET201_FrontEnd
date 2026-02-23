import axiosClient from '@/api/axiosClient';

const orderService = {
  // Admin: Lấy tất cả đơn hàng
  getAllOrders: async () => {
    const url = '/Orders';
    return await axiosClient.get(url);
  },

  // Admin: Cập nhật trạng thái
  updateStatus: async (id, status) => {
    const url = `/Orders/${id}/status`;
    return await axiosClient.put(url, status, {
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export default orderService;
