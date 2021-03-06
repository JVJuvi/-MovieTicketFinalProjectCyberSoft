import { applyMiddleware, combineReducers } from "redux";
import { createStore } from "redux";
import thunk from "redux-thunk";
import QuanLyNguoiDungReducer from './QuanLyNguoiDungReducer';
import CarouselReducer from './CarouselReducer';
import QuanLyPhimReducer from './QuanLyPhimReducer';
import QuanLyRapReducer from './QuanLyRapReducer';
import QuanLyDatVeReducer from './QuanLyDatVeReducer';
import LoadingReducer from './LoadingReducer';
import ModalVideoReducer from './ModalVideoReducer';





const RootReducer = combineReducers({
    QuanLyNguoiDungReducer,
    CarouselReducer,
    QuanLyPhimReducer,
    QuanLyRapReducer,
    QuanLyDatVeReducer,
    LoadingReducer,
    ModalVideoReducer,
})

export const store = createStore(RootReducer, applyMiddleware(thunk))




