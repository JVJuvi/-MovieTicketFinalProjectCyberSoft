import {Suspense, lazy} from 'react';
import { BrowserRouter, Router, Switch } from 'react-router-dom';
import { UserTemplate } from './templates/UserTemplate/UserTemplate';

// chuyen huong
import { createBrowserHistory } from 'history';
import { Route } from 'react-router-dom';
import { HomTemplate } from './templates/HomeTemplate/Hometemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import New from './pages/News/New';
import Login from './pages/Login/Login';
import dangNhap from './pages/Login/dangNhap';

import Register from './pages/Resister/Register';
import HomeMenu from './pages/Home/HomeMenu/HomeMenu';
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

const CheckOutTemPlateLazy = lazy(()=> import ('./templates/CheckOutTemPlate/CheckOutTemPlate'))




export const history = createBrowserHistory();


function App() {

  return (
    <Router history={history}>
        <Loading />
        <Switch>
          <HomTemplate path="/" exact component={Home} />
          <HomTemplate path="/home" exact component={Home} />
          <HomTemplate path="/homemenu" exact component={HomeMenu} />
          <HomTemplate path="/contact" exact component={Contact} />
          <HomTemplate path="/detail/:id" exact component={Detail} />
          <HomTemplate path="/new" exact component={New} />
          <HomTemplate path="/profile" exact component={Profile} />

          
          <UserTemplate path="/login" exact component={Login} />
          <UserTemplate path="/dangnhap" exact component={dangNhap} />
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

          
        </Switch>
    </Router>
  );
}

export default App;
