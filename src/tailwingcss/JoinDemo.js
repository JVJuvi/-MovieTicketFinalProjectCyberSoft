import React from 'react';
import _ from 'lodash';

export default function JoinDemo() {

    let arr = [
        {id: 1, name: 'cuong'},
        {id: 2, name: 'chau'}
    ];


    const firstItem = _.first(arr);
    const lastItem = _.last(arr);

    return (
        <div>
            <p>First name: {firstItem.name}</p>
            <p>Last name: {lastItem.name}</p>
        </div>
    )
}
