import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/home/Index';
import CreatePoint from './pages/createPoint/Index';

function Routes() {
  return (
    <BrowserRouter>
      <Route component={Home} path="/" exact />
      <Route component={CreatePoint} path="/create-point" />
    </BrowserRouter>
  );
}

export default Routes;
