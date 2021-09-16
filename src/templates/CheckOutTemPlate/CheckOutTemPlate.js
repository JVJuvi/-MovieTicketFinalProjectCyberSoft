import { Fragment, useEffect } from "react"
import { Redirect, Route } from "react-router-dom"
import { USER_LOGIN } from '../../util/setting';



const CheckOutTemPlate = (props) => {

    useEffect(()=>{
        window.scrollTo(0, 0);
    })

    if(!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to="/login" />
    }


    return <Route path={props.path} render={(propsRoute) => {
        return <Fragment>
                    
            <props.component {...propsRoute} />

        </Fragment>
    }} />
}

export default CheckOutTemPlate ;