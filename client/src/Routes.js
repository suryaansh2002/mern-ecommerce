import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Home from './core/Home';
import PrivateRoute from './auth/PrivateRoute';
import Dashboard from './user/UserDashboard';
import AdminRoute from './auth/AdminRoute';
import AdminDashboard from './user/AdminDashboard';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
import Orders from './admin/Orders';
import Profile from './user/Profile';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import CategoryList from './admin/CategoryList';
import NotFound from './core/NotFound';
import About from './core/About';
import Testimonials from './core/Testimonials';
import Contact from './core/Contact';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Shop} exact />
        <Route path='/about' component={About} exact />
        <Route path='/contact' component={Contact} exact />
        <Route path='/testimonials' component={Testimonials} exact />
        <Route path='/signin' component={Signin} exact />
        <Route path='/signup' component={Signup} exact />
        <PrivateRoute path='/user/dashboard' component={Dashboard} exact />
        <AdminRoute path='/admin/dashboard' component={AdminDashboard} exact />
        <AdminRoute path='/create/category' component={AddCategory} exact />
        <AdminRoute path='/create/product' component={AddProduct} exact />
        <Route path='/product/:productId' component={Product} exact />
        <Route path='/cart' component={Cart} exact />
        <AdminRoute path='/admin/orders' component={Orders} exact />
        <PrivateRoute path='/profile/:userId' component={Profile} exact />
        <AdminRoute path='/admin/products' component={ManageProducts} exact />
        <AdminRoute
          path='/admin/product/update/:productId'
          component={UpdateProduct}
          exact
        />
        <AdminRoute path='/admin/categories' component={CategoryList} exact />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
