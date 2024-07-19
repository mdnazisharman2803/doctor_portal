import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Auth from './pages/AuthPage/Auth';
import Upload from './pages/HomePage/Upload';
import Patients from './pages/PatientPage/Patients';
import styles from './pages/Auth.module.css';

function App() {
    return (
        <Router>
            <div className={styles.container}>
                <h1>Doctor Portal</h1>
                <Routes>
                    <Route path="/" element={<Navigate to="/auth" />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/patients" element={<Patients />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
