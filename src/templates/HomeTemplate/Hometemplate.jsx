import { Fragment, useEffect } from "react"
import { Route } from "react-router-dom"
import Hello from "../../Hello"
import Footer from "./Layout/Footer/Footer"
import Header from "./Layout/Header/Header"



export const HomTemplate = (props) => {
    // không setstate nên sẽ ko chạy cô tận , vì dùng chung 1 template nên ko sễ set chạy 1 lần đc 
    useEffect(()=>{
        window.scrollTo(0, 0);
    })

    return <Route path={props.path} render={(propsRoute) => {
        return <Fragment>
            <Header/>        
            <props.component {...propsRoute} />
            <Footer />
        </Fragment>
    }} />
}