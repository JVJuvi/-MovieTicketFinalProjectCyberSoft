import React, { Fragment } from 'react'
import { useSelector } from 'react-redux';

export default function Loading() {

    const {isLoading} = useSelector(state => state.LoadingReducer);

    return (
        <Fragment>
            { isLoading ? 
                <div className="loading">
                    <div>
                        
                    </div>
                </div>
                : ''
            }
        </Fragment>
    )
}
