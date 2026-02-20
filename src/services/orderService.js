import axiosClient from '@/api/axiosClient';

const orderService = {
  checkout: async data => {
    const url = '/Orders/checkout';
    const response = await axiosClient.post(url, data);
    return response.data;
  }
};
export default orderService;
