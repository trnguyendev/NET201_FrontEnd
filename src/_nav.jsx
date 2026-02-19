import CIcon from '@coreui/icons-react';
import { cilUser, cilTruck, cilSpeedometer } from '@coreui/icons';
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react';

const _nav = [
  {
    component: CNavItem,
    name: 'Thống kê',
    to: '/admin/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />
  },
  {
    component: CNavTitle,
    name: 'Quản lý'
  },
  {
    component: CNavGroup,
    name: 'Quản lý sản phẩm',
    to: '/admin/base',
    icon: <CIcon icon={cilTruck} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Loại sản phẩm',
        to: '/admin/categories'
      },
      {
        component: CNavItem,
        name: 'Thương hiệu',
        to: '/admin/brands'
      },
      {
        component: CNavItem,
        name: 'Sản phẩm',
        to: '/admin/base/breadcrumbs'
      },
      {
        component: CNavItem,
        name: 'Quản lý đơn hàng',
        to: '/admin/base/cards'
      },
      {
        component: CNavItem,
        name: 'Size',
        to: '/admin/base/carousels'
      },
      {
        component: CNavItem,
        name: 'Màu',
        to: '/admin/base/collapses'
      },
      {
        component: CNavItem,
        name: 'Tồn kho',
        to: '/admin/base/list-groups'
      }
    ]
  },
  {
    component: CNavGroup,
    name: 'Quản lý tài khoản',
    to: '/admin/buttons',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Quản lý người dùng',
        to: '/admin/buttons/buttons'
      },
      {
        component: CNavItem,
        name: 'Nhà phân phối',
        to: '/admin/buttons/button-groups'
      },
      {
        component: CNavItem,
        name: 'Tạo tài khoản',
        to: '/admin/buttons/dropdowns'
      }
    ]
  }
];

export default _nav;
