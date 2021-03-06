import {Suspense, lazy} from 'react';
import { BrowserRouter, Router, Switch, Route } from 'react-router-dom';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';

// chuyen huong
import { createBrowserHistory } from 'history';
import { HomTemplate } from './templates/HomeTemplate/Hometemplate';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';

import Register from './pages/Resister/Register';
import Detail from './pages/Detail/Detail';
import { AdminTemplate } from './templates/AdminTemplate/AdminTemplate';
import Dashboard from './pages/Admin/Dashboard/Dashboard';
// import CheckOutTemPlate from './templates/CheckOutTemPlate/CheckOutTemPlate';
import Checkout from './pages/Checkout/Checkout';
import Loading from './components/Loading/Loading';
import Profile from './pages/Profile/Profile';
import Films from './pages/Admin/Films/Films';
import ShowTime from './pages/Admin/ShowTime/ShowTime';
import AddNew from './pages/Admin/Films/AddNew/AddNew';
import Edit from './pages/Admin/Films/Edit/Edit';
import Users from './pages/Admin/Users/Users';
import AddUserNew from './pages/Admin/Users/AddNew/AddUserNew';
import EditUser from './pages/Admin/Users/Edit/EditUser';
import Loader from './components/Loading/Loader';
import NotFound from './pages/NotFound/NotFound';

const CheckOutTemPlateLazy = lazy(()=> import ('./templates/CheckOutTemPlate/CheckOutTemPlate'))




export const history = createBrowserHistory();


function App() {

  return (
    <Router history={history}>
        <Loading />
        <Loader />
        <Switch>
          <HomTemplate path="/" exact component={Home} />
          <HomTemplate path="/home" exact component={Home} />
          <HomTemplate path="/detail/:id" exact component={Detail} />
          <HomTemplate path="/profile" exact component={Profile} />


          
          <UserTemplate path="/login" exact component={Login} />
          <UserTemplate path="/register" exact component={Register} />

          <AdminTemplate path="/admin" exact component={Dashboard} />
          <AdminTemplate path="/admin/films" exact component={Films} />
          <AdminTemplate path="/admin/films/addnew" exact component={AddNew} />
          <AdminTemplate path="/admin/films/edit/:id" exact component={Edit} />
          <AdminTemplate path="/admin/films/showtime/:id/:tenphim" exact component={ShowTime} />
          <AdminTemplate path="/admin/showtime" exact component={ShowTime} />

          <AdminTemplate path="/admin/users" exact component={Users} />
          <AdminTemplate path="/admin/users/addnew" exact component={AddUserNew} />
          <AdminTemplate path="/admin/users/edit/:taikhoan" exact component={EditUser} />

          {/* lazy loading react */}
          <Suspense fallback={<h1>Loading ....</h1>}>
            <CheckOutTemPlateLazy path="/checkout/:id" exact component={Checkout} />  
          </Suspense>


          {/* <Route path="*" exact component={NotFound} /> */}
        </Switch>
    </Router>
  );
}

export default App;
