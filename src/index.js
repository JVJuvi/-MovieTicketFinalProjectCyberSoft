import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';
import App from './App';
// import './App.css'
import reportWebVitals from './reportWebVitals';
import { DOMAIN } from './util/setting';

//cấu hình realtime websocket với signalRß
import * as signalR from '@aspnet/signalr';

import './sass/index.scss';

//set up redux
import {Provider} from 'react-redux'
import { store } from './redux/reducers/RootReducer';

//set up css ant design
import 'antd/dist/antd.css';
//set react slick
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

// import đa ngôn ngữ
import './i18n';





//doan code ket noi backend server lang nghe su kien tu server
export const connection = new signalR.HubConnectionBuilder().withUrl(`${DOMAIN}/DatVeHub`).configureLogging(signalR.LogLevel.Information).build();

connection.start().then(()=>{
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}).catch(error => {
  console.log({error})
})





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
