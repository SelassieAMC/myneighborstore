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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CreateStoreWizard from './stores/CreateStoreWizard';
import StoreEdition from './stores/StoreEdition';
import StoreDetails from './stores/StoreDetails';

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
          <Route path="/store-edition/:id" component={StoreEdition}></Route>
          <Route path="/store-details/:id" component={StoreDetails}></Route>
          <Route path="/create-store-wiz" component={CreateStoreWizard}></Route>
          <Route component={PageNotFound}></Route>
        </Switch>

        <ToastContainer autoClose={3000} closeButton={false} hideProgressBar />
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
