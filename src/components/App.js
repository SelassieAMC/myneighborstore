import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './common/Nav-bar';
import Footer from './common/Footer';
import Banner from './common/Banner';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Home from './home/Home';
import PageNotFound from './errors/PageNotFound';
import StoresPage from './stores/StoresPage';
import CreateStore from './stores/CreateStore';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddStoreBsDetails from './stores/AddStoreBsDetails';

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
          <Route path="/stores" component={StoresPage}></Route>
          <Route path="/create-store" component={CreateStore}></Route>
          <Route path="/add-store-photos" component={AddStoreBsDetails}></Route>
          <Route component={PageNotFound}></Route>
        </Switch>
        <ToastContainer autoClose={3000} closeButton={false} hideProgressBar />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
