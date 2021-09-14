import {Suspense, lazy} from 'react';
import Grid from './tailwingcss/Grid';
import JoinDemo from './tailwingcss/JoinDemo';
import Padding from './tailwingcss/Padding';
import Chunk from './tailwingcss/Chunk';
import Fill from './tailwingcss/Fill';
import { BrowserRouter, Router, Switch } from 'react-router-dom';
import { UserTemplate } from './templates/UserTemplate';
import DangKy from './layouts/DangKy/DangKy';
import DangNhap from './layouts/DangNhap/DangNhap';
// chuyen huong
import { createBrowserHistory } from 'history';
import { AdminTemplate } from './templates/AdminTemplate';
import Films from './layouts/Admin/Films';
import AddFilm from './layouts/Admin/AddFilm';
import Menu from './layouts/MonAn/Menu';
import { Route } from 'react-router-dom';
import { HomTemplate } from './templates/HomeTemplate/Hometemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import New from './pages/News/New';
import Login from './pages/Login/Login';
import Register from './pages/Resister/Register';
import HomeMenu from './pages/Home/HomeMenu/HomeMenu';
import Detail from './pages/Detail/Detail';
// import CheckOutTemPlate from './templates/CheckOutTemPlate/CheckOutTemPlate';
import Checkout from './pages/Checkout/Checkout';
import Loading from './components/Loading/Loading';

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

          <UserTemplate path="/login" exact component={Login} />

          <Route path="/register" exact component={Register} />
          {/* lazy loading react */}
          <Suspense fallback={<h1>Loading ....</h1>}>
            {/* path="/checkout/:id" */}
            <CheckOutTemPlateLazy path="/checkout/:id" exact component={Checkout} />  
          </Suspense>


        </Switch>
    </Router>
  );
}

export default App;
