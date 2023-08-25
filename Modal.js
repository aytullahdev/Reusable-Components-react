import { useState } from "react";
import styled from "styled-components" // npm install styled-components
const ModalBackground = styled.div`
    width:100vw;
    background:gray;
    position: absolute;
    top:0;
    left:0;
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
`
const ModalBody = styled.div`
    background:white;
    padding:10px;
    border-radius:10px;
    height:400px;
    width:300px;
    
`
const Modal = ({ children }) => {
    const [showModal, setShowModal] = useState(false)
    return (
        <>
            <button onClick={() => setShowModal(true)}>Show Modal</button>
            {showModal && <ModalBackground onClick={() => setShowModal(false)}>
                <ModalBody onClick={(e) => e.stopPropagation()}>
                    {children}
                    <button onClick={() => setShowModal(false)}>Close</button>
                </ModalBody>

            </ModalBackground>}
        </>
    );
};

export default Modal;
