import axiosClient from '@/api/axiosClient';

const brandService = {
  getAllBrands: async () => {
    const url = '/Brands';
    const response = await axiosClient.get(url);
    return response.data;
  },

  createBrand: async data => {
    const url = '/Brands';
    // Ép Header multipart/form-data vào tham số thứ 3 của Axios
    const response = await axiosClient.post(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  },

  deleteBrand: async id => {
    const url = `/Brands/${id}`;
    const response = await axiosClient.delete(url);
    return response.data;
  },

  updateBrand: async (id, data) => {
    const url = `/Brands/${id}`;
    // Ép Header multipart/form-data
    const response = await axiosClient.put(url, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
};

export default brandService;
