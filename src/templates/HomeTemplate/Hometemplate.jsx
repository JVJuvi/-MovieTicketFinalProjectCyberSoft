import { Fragment, useEffect } from "react"
import { Route } from "react-router-dom"
import Hello from "../../Hello"
import Footer from "./Layout/Footer/Footer"
import Header from "./Layout/Header/Header"
import { ModalVideo } from '../../components/Films/ModalVideo';



export const HomTemplate = (props) => {
    // không setstate nên sẽ ko chạy cô tận , vì dùng chung 1 template nên ko sễ set chạy 1 lần đc 
    useEffect(()=>{
        window.scrollTo(0, 0);
    })

    // window.onscroll = () => {
    //     if(window.scrollY > 80) {
    //         document.querySelector('#scrollTop').classList.add('active');
    //     }else {
    //         document.querySelector('#scrollTop').classList.remove('active');
    //     }
    // }

    

    return <Route path={props.path} render={(propsRoute) => {
        return <Fragment>
            <a href="#header" id="scrollTop"><i class='bx bx-up-arrow-alt'></i></a>
            <Header id="header"/>    
            <ModalVideo />   
            <props.component {...propsRoute} />
            <Footer />
        </Fragment>
    }} />
}