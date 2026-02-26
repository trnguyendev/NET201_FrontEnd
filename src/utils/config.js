export const API_BASE_URL = 'https://localhost:7012/';

export const getImageUrl = path => {
  if (!path) return '/placeholder-image.png';
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_BASE_URL.replace(/\/$/, '')}${cleanPath}`;
};
