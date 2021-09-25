import React, { Fragment, useEffect } from 'react'
import { Route } from 'react-router-dom';
import './UserTemplate.css';

export const UserTemplate = (props) => {

    useEffect(()=>{
        window.scrollTo(0, 0);
    })

    return <Route exact path={props.path} render={(propsRoute) => {
        return <Fragment>
            <div className="lg:flex">
                <div className="userTemplate hidden lg:flex items-center justify-center flex-1 h-screen">
                    <props.component {...propsRoute} />
                </div>
            </div>
        </Fragment>
    }} />
}
