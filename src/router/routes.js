import React from 'react';
const Dashboard = React.lazy(() => import('@/pages/admin/dashboard/Dashboard'));
const CategoryPage = React.lazy(() => import('@/pages/admin/categories/CategoryPage'));
const BrandPage = React.lazy(() => import('@/pages/admin/brands/BrandPage'));
const SizePage = React.lazy(() => import('@/pages/admin/sizes/SizePage'));
const ProductColorPage = React.lazy(() => import('@/pages/admin/colors/ProductColorPage'));
const ProductPage = React.lazy(() => import('@/pages/admin/products/ProductPage'));
const OrderListPage = React.lazy(() => import('@/pages/admin/orders/OrderListPage'));
const UserPage = React.lazy(() => import('@/pages/admin/users/UserPage'));

const routes = [
  { path: '', exact: true, name: 'Home' },
  { path: 'dashboard', name: 'Dashboard', element: Dashboard },
  { path: 'categories', name: 'Category', element: CategoryPage },
  { path: 'brands', name: 'Brand', element: BrandPage },
  { path: 'sizes', name: 'Size', element: SizePage },
  { path: 'colors', name: 'ProductColor', element: ProductColorPage },
  { path: 'products', name: 'Product', element: ProductPage },
  { path: 'orders', name: 'Order', element: OrderListPage },
  { path: 'users', name: 'User', element: UserPage }
];

export default routes;
