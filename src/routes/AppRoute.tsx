import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import About from '../pages/About';
import Home from '../pages/Home';
import HouseById from '../pages/HouseById';
import Houses from '../pages/Houses';
import ImageById from '../pages/ImageById';
import Upload from '../pages/Upload';
import PrivateRoute from './PrivateRoute';

// const About = lazy(() => import("../pages/About"));
// const Home = lazy(() => import("../pages/Home"));

const AppRoute: React.FC = () => {
  // const token = useAppSelector(selectToken);
  // if (!token) {
  //   return <Navigate to="/login" />;
  // }
  return (
    <>
      <Routes>
        <Route
          path="/about"
          element={
            <PrivateRoute>
              <About />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/upload"
          element={
            <PrivateRoute>
              <Upload />
            </PrivateRoute>
          }
        />
        <Route
          path="/house/:id"
          element={
            <PrivateRoute>
              <HouseById />
            </PrivateRoute>
          }
        />
        <Route
          path="/houses"
          element={
            <PrivateRoute>
              <Houses />
            </PrivateRoute>
          }
        />

        <Route
          path="/house/:id/:image"
          element={
            <PrivateRoute>
              <ImageById />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default AppRoute;
