import React from 'react';
import { Route, Routes } from 'react-router-dom';

import About from '../pages/About';
import EditHome from '../pages/EditHome';
import Home from '../pages/Home';
import Houses from '../pages/Houses';
import NewHome from '../pages/NewHome';
import Record from '../pages/Record';
import RecordHouseById from '../pages/RecordHouseById';
import PrivateRoute from './PrivateRoute';

// const About = lazy(() => import("../pages/About"));
// const Home = lazy(() => import("../pages/Home"));

const AppRoute = () => {
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
          path="/home/edit/:id"
          element={
            <PrivateRoute>
              <EditHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/home/new"
          element={
            <PrivateRoute>
              <NewHome />
            </PrivateRoute>
          }
        />
        <Route
          path="/record"
          element={
            <PrivateRoute>
              <Record />
            </PrivateRoute>
          }
        />
        <Route
          path="/record/:id"
          element={
            <PrivateRoute>
              <RecordHouseById />
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
      </Routes>
    </>
  );
};

export default AppRoute;
