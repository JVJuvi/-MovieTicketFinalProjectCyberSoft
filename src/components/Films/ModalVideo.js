import React, {useRef} from 'react';
import styled from 'styled-components';
import {MdClose} from 'react-icons/md';


const Background = styled.div`
  width: 100% !important;
  height: 100% !important;
  background: rgba(0, 0, 0, 0.8) !important;
  position: fixed !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  z-index: 9999 !important;
`;
const ModalWrapper = styled.div`
  width: 800px;
  height: 500px;
  color: #000;
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 10;
  border-radius: 10px;
`;

const CloseModalButton = styled(MdClose)`
  cursor: pointer;
  position: absolute;
  top: -20px;
  right: -20px;
  width: 40px;
  height: 40px;
  padding: 0;
  z-index: 10;
  color: white;
  border: 2px solid white;
  border-radius: 100%
`;

export default function ModalVideo({showModal, setShowModal, item}) {

    const modalRef = useRef();

    const closeModal = e => {
        if(modalRef.current === e.target) {
            setShowModal(false)
        }
    }

    return (
        <>
           {showModal ? (
               <Background onClick={closeModal}>
                   <ModalWrapper showModal={showModal}>
                      <iframe width="800" height="500" src={item.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                      <CloseModalButton aria-label="Close modal" onClick={()=>setShowModal(prev => !prev)} />
                   </ModalWrapper>
               </Background>
           ): null}
        </>
    )
}
