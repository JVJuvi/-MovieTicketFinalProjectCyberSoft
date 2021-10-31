import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <div className="not-found">
            <img
                src="https://www.pngitem.com/pimgs/m/561-5616833_image-not-found-png-not-found-404-png.png"
                alt="not-found"
            />
            <Link to="/" className="link">
                <i class='bx bx-left-arrow-alt'></i> Go home
            </Link>
        </div>
    )
}

export default NotFound

