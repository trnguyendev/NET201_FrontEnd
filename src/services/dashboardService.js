import axiosClient from '../api/axiosClient';

const dashboardService = {
  getSummary: async () => {
    const url = '/Dashboard/summary';
    return await axiosClient.get(url);
  }
};

export default dashboardService;
