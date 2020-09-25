import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './common/Nav-bar';
import Footer from './common/Footer';
import Banner from './common/Banner';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Home from './home/Home';
import PageNotFound from './errors/PageNotFound';
import Login from './login/Login';

library.add(fab);

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Banner}></Route>
        </Switch>
        <Navbar />
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/login" component={Login}></Route>
          <Route component={PageNotFound}></Route>
        </Switch>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
