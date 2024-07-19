import React, { useState } from 'react';
import axios from 'axios';
import { SERVER_HOST } from "../../env";
import Modal from '../../components/Modal'; // Import the Modal component
import { Link } from 'react-router-dom'; 
import styles from './Upload.module.css';

const host = SERVER_HOST;

function Upload() {
    const [file, setFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const doctorId = localStorage.getItem('doctorId'); 
        if (!doctorId) {
            setModalMessage('Doctor ID not found');
            setShowModal(true);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('doctor', doctorId);

        axios.post(`${host}/upload`, formData)
            .then(response => {
                console.log(response.data);
                setModalMessage('File uploaded successfully');
                setShowModal(true);
            })
            .catch(error => {
                console.error('Error uploading file:', error);
                setModalMessage('Error uploading file');
                setShowModal(true);
            });
    };

    return (
        <div className={styles.container}>
        <div className={styles.topLeftLink}>
            <Link to="/patients" className={styles.linkButton}>Link Your Patient</Link>
        </div>
        <div className={styles.uploadForm}>
            <p>Upload your documents here.</p>
            <form onSubmit={handleSubmit}>
                <input type="file" name="file" onChange={handleFileChange} required />
                <button type="submit">Upload</button>
            </form>
        </div>
        <Modal show={showModal} onClose={handleCloseModal} message={modalMessage} />
    </div>
    );
}

export default Upload;
