import React from 'react';
import './tailwingcss.css';
import StarIcon from '@material-ui/icons/Star';
import { Avatar } from '@material-ui/core';

export default function Padding() {
    return (
        <div className="bg-gray-100">
            <div className="container">
                <div className="flex h-screen justify-center items-center">
                    <div>
                        <div>
                            <p>Entire house</p>
                            <h2>Beach house in collingwood</h2>
                            <StarIcon />
                            <span>494(128) - Collingwood ohio</span>
                            <hr className="w-10 mt-5" />
                        </div>
                        <div className="mt-10">
                            <Avatar src="https://picsum.photos/1000" style={{width: '50px', height: '50px'}} />
                            <span>Hosted by Kevin Francis</span>
                            <p>Availability</p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-full">
                            <img className="rounded-xl w-full" src="https://picsum.photos/1000" alt="..." />
                        </div>
                        <div className="grid grid-rows-2 gap-5">
                            <div>
                                <img className="rounded-xl" src="https://picsum.photos/1000" alt="..." />
                            </div>
                            <div>
                                <img className="rounded-xl" src="https://picsum.photos/1000" alt="..." />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    )
}
