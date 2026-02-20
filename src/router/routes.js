import React from 'react';
const Dashboard = React.lazy(() => import('@/pages/admin/dashboard/Dashboard'));
const Category = React.lazy(() => import('@/pages/admin/categories/pages/Category'));
const Brand = React.lazy(() => import('@/pages/admin/brands/pages/Brand'));
const Size = React.lazy(() => import('@/pages/admin/sizes/pages/Size'));
const ProductColor = React.lazy(() => import('@/pages/admin/colors/pages/ProductColor'));
const Product = React.lazy(() => import('@/pages/admin/products/pages/Product'));

const routes = [
  { path: '', exact: true, name: 'Home' },
  { path: 'dashboard', name: 'Dashboard', element: Dashboard },
  { path: 'categories', name: 'Category', element: Category },
  { path: 'brands', name: 'Brand', element: Brand },
  { path: 'sizes', name: 'Size', element: Size },
  { path: 'colors', name: 'ProductColor', element: ProductColor },
  { path: 'products', name: 'Product', element: Product }
];

export default routes;
