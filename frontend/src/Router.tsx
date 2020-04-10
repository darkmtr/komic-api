import React from 'react';
import { Switch, Route } from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';

export default function Router() {
  return (
    <Switch>
      <Route exact path="/" component={() => <h1 className="ok"> komic</h1>} />
      <Route exact path="/register" component={RegisterPage} />
    </Switch>
  );
}
