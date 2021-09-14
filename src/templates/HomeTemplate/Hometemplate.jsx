import { Fragment } from "react"
import { Route } from "react-router-dom"
import Hello from "../../Hello"
import Footer from "./Layout/Footer/Footer"
import Header from "./Layout/Header/Header"



export const HomTemplate = (props) => {
    return <Route path={props.path} render={(propsRoute) => {
        return <Fragment>
            <Header />        
            <props.component {...propsRoute} />
            <Footer />
        </Fragment>
    }} />
}