import React from 'react';
import { CCloseButton, CImage, CSidebar, CSidebarBrand, CSidebarFooter, CSidebarHeader, CSidebarToggler } from '@coreui/react';
import AppSidebarNav from './AppSidebarNav';
import logo from '@/assets/images/logoTN.png';
import navigation from '@/_nav';

const AppSidebar = () => {
  const [visible, setVisible] = React.useState(true);
  const [unfoldable, setUnfoldable] = React.useState(false);

  return (
    <CSidebar className="border-end" colorScheme="dark" position="fixed" unfoldable={unfoldable} visible={visible} onVisibleChange={visible => setVisible(visible)}>
      <CSidebarHeader className="border-bottom">
        <CSidebarBrand to="/admin/dashboard" className="d-flex">
          <CImage className="sidebar-brand-full" src={logo} height={32} />
          <h4 className="ms-2">TN SPORT</h4>
        </CSidebarBrand>

        <CCloseButton className="d-lg-none" dark onClick={() => setVisible(false)} />
      </CSidebarHeader>

      <AppSidebarNav items={navigation} />

      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler onClick={() => setUnfoldable(!unfoldable)} />
      </CSidebarFooter>
    </CSidebar>
  );
};

export default React.memo(AppSidebar);
