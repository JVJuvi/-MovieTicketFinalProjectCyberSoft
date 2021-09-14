import { Fragment } from "react"
import { Redirect, Route } from "react-router-dom"
import { USER_LOGIN } from '../../util/setting';



const CheckOutTemPlate = (props) => {

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