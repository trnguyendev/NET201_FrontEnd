import React from 'react';
const Dashboard = React.lazy(() => import('@/pages/admin/dashboard/Dashboard'));
const Category = React.lazy(() => import('@/pages/admin/categories/pages/Category'));
const Brand = React.lazy(() => import('@/pages/admin/brands/pages/Brand'));

const routes = [
  { path: '', exact: true, name: 'Home' },
  { path: 'dashboard', name: 'Dashboard', element: Dashboard },
  { path: 'categories', name: 'Category', element: Category },
  { path: 'brands', name: 'Brand', element: Brand }
];

export default routes;
