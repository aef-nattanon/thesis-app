import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Loading from '../components/Loading';
// import { useAppSelector } from '../hooks';
import SingIn from '../pages/SingIn';
// import { selectToken } from '../slices/AuthSlice';
import AppRoute from './AppRoute';

const AppRoutes = () => {
  // const token = useAppSelector(selectToken);
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/login" element={<SingIn />} />
        </Routes>
        <AppRoute />
      </Suspense>
    </Router>
  );
};

export default AppRoutes;
