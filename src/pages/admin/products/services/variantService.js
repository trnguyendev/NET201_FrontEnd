import axiosClient from '@/api/axiosClient';

const variantService = {
  getVariantsByProductId: async productId => {
    const url = `/ProductVariants/product/${productId}`;
    const response = await axiosClient.get(url);
    return response.data;
  },

  createVariant: async data => {
    const url = '/ProductVariants';
    // Dữ liệu JSON bình thường, không cần FormData
    const response = await axiosClient.post(url, data);
    return response.data;
  },

  deleteVariant: async id => {
    const url = `/ProductVariants/${id}`;
    const response = await axiosClient.delete(url);
    return response.data;
  },

  updateVariant: async (id, data) => {
    const url = `/ProductVariants/${id}`;
    const response = await axiosClient.put(url, data);
    return response.data;
  }
};

export default variantService;
