import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { CSpinner } from '@coreui/react';
import routes from '@/router/routes';

const AppContent = () => {
  return (
    <div className="body flex-grow-1 px-3">
      <div className="container-fluid">
        <Suspense fallback={<CSpinner color="primary" />}>
          <Routes>
            {routes.map((route, idx) => (route.element ? <Route key={idx} path={route.path} element={<route.element />} /> : null))}
            <Route index element={<Navigate to="dashboard" replace />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default React.memo(AppContent);
