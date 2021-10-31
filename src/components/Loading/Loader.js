import React from 'react'

export default function Loader() {

    const loader = () => {
        document.querySelector('.loader').classList.add('fade-out')
    }

    const fadeOut = () => {
        setInterval(loader, 3000);
    }

    window.onload = fadeOut();

    return (
        <div className="loader">
            <img src="./imageFilm/Ellipsis-4.2s-184px.gif" alt="" />
        </div>
    )
}
