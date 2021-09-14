import React from 'react';
import _ from 'lodash';

export default function Chunk() {

    const arr = ['id', 1, 'name', 'cuong', 'info', 'CyberSoft']

    const result = _.chunk(arr, 2);

    console.log('result', result)

    return (
        <div>
            
        </div>
    )
}
