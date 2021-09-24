import React, {useRef} from 'react';
import styled from 'styled-components';
import {MdClose} from 'react-icons/md';


const Background = styled.div`
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8) !important;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100000;
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
const ModalImg = styled.img`s
  width: 100%;
  height: 100%;
  border-radius: 10px 0 0 10px;
  background: #000;
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  line-height: 1.8;
  color: #141414;
  p {
    margin-bottom: 1rem;
  }
  button {
    padding: 10px 24px;
    background: #141414;
    color: #fff;
    border: none;
  }
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
                       <ModalContent>
                       <iframe width="800" height="500" src={item.trailer} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                       </ModalContent>
                       <CloseModalButton aria-label="Close modal" onClick={()=>setShowModal(prev => !prev)} />
                   </ModalWrapper>
               </Background>
           ): null}
        </>
    )
}
