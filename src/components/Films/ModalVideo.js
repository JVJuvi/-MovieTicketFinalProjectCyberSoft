import React, {useRef} from 'react';
import { useDispatch, useSelector } from 'react-redux';


export const ModalVideo = (props) => {

    const {item, showModal} = useSelector(state => state.ModalVideoReducer);

    const dispatch = useDispatch();

    const modalRef = useRef();

    const closeModal = e => {
        if(modalRef.current === e.target) {
            dispatch({
                type: 'CLOSE_MODAL',
                payload: false
            })
        }
    }

    return (
        <>
           {showModal ? (
               <div className="modalVideo" ref={modalRef} onClick={closeModal}>
                   <div className="ModalWrapper" showModal={showModal}>
                      <iframe className="video" src={item.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                      <div className="CloseModalButton" aria-label="Close modal" onClick={()=>{
                          dispatch({
                            type: 'CLOSE_MODAL',
                            payload: false
                        })
                      }}><i class='bx bx-x'></i></div>
                   </div>
               </div>
           ): null}
        </>
    )
}
