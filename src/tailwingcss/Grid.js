import React from 'react'

export default function Grid() {
    return (
        <div className="container">
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-red-200">1/3</div>
                <div className="bg-blue-200">1/3</div>
                <div className="bg-green-200">1/3</div>
            </div>
        </div>
    )
}
