import React from 'react';
import styles from './Modal.module.css'; 

const Modal = ({ show, onClose, message }) => {
    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <p>{message}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default Modal;