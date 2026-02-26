import { AppContent, AppSidebar, AppFooter, AppHeader } from '@/components/admin';
import '../scss/style.scss';

const AdminLayout = () => {
  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader />
        <AppContent />
        <AppFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
