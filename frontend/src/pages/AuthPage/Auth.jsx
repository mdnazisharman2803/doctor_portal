import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Spinner';
import Modal from '../../components/Modal'; // Import the Modal component
import styles from '../Auth.module.css';
import { SERVER_HOST } from "../../env";

import { hashPassword } from '../../utility/Utility';

const host = SERVER_HOST;

function Auth() {
    const [isRegister, setIsRegister] = useState(true); // Initially set to true for registration
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        specialty: ''
    });
    const [error, setError] = useState(null);
    const [modalMessage, setModalMessage] = useState(''); // State for modal message
    const [showModal, setShowModal] = useState(false); // State for modal visibility

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const isFormValid = Object.values(formData).every(value => value.trim() !== '');
        if (!isFormValid) {
            setError('Please fill in all required fields.');
            setLoading(false);
            return;
        }

        const url = isRegister ? `${host}/register` : `${host}/login`;

        console.log("Submitting form data:", formData);
        console.log("URL:", url);

        try {
            const hashedPassword = await hashPassword(formData.password);
            console.log("Hashed Password:", hashedPassword);

            const response = await axios.post(url, {
                ...formData,
                password: hashedPassword
            });

            console.log("Response:", response);

            setLoading(false);

            if (!isRegister) {
                localStorage.setItem('doctorId', response.data.doctor_id);
                document.cookie = `token=${response.data.token};`;
                navigate('/upload');
            } else {
                setIsRegister(false);
                setModalMessage('Registration successful! Please login.');
                setShowModal(true);
            }
        } catch (error) {
            console.error('Error:', error);

            setLoading(false);

            if (error.response) {
                console.log('Error Response:', error.response);
                if (error.response.data && error.response.data.error) {
                    setError(error.response.data.error);
                } else {
                    setError('Something went wrong. Please try again later.');
                }
            } else {
                setError('Failed to connect to the server. Please try again later.');
            }

            setModalMessage(error.message || 'An unexpected error occurred.');
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h2>{isRegister ? 'Register' : 'Login'}</h2>
                <form onSubmit={handleSubmit}>
                    {isRegister && (
                        <>
                            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
                            <input type="text" name="specialty" placeholder="Specialty" value={formData.specialty} onChange={handleChange} required />
                        </>
                    )}
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    {error && <p className={styles.error}>{error}</p>}
                    <button type="submit" disabled={loading || Object.values(formData).some(value => value.trim() === '')}>
                        {loading ? <Spinner /> : (isRegister ? 'Register' : 'Login')}
                    </button>
                </form>
                <button type="button" onClick={() => setIsRegister(!isRegister)} className={styles.switchButton}>
                    {isRegister ? 'Switch to Login' : 'Switch to Register'}
                </button>
            </div>
            <Modal show={showModal} onClose={handleCloseModal} message={modalMessage} /> {/* Add Modal component */}
        </div>
    );
}

export default Auth;

