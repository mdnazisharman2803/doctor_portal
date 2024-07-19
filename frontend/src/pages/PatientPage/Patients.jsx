import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { SERVER_HOST } from "../../env";

const host = SERVER_HOST;

function Patients() {
    const [patients, setPatients] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchPatients();
    }, []);

    const fetchPatients = async () => {
        const doctorId = localStorage.getItem('doctorId');
        if (!doctorId) {
            console.error('Doctor ID not found');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.get(`${host}/get_patients`, {
                params: { doctor_id: doctorId }
            });
            setPatients(response.data.patients);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching patients:', error);
            setLoading(false);
        }
    };

    const handleLinkPatient = async (e) => {
        e.preventDefault();
        const doctorId = localStorage.getItem('doctorId');
        if (!doctorId) {
            console.error('Doctor ID not found');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${host}/link_patient`, {
                doctor_id: doctorId,
                name,
                email
            });
            console.log('Link Patient Response:', response.data);
            setLoading(false);
            fetchPatients(); // Re-fetch patients to update the list
            setName('');
            setEmail('');
        } catch (error) {
            console.error('Error linking patient:', error);
            setLoading(false);
        }
    };

//     return (
//         <div>
//             <h2>Patients Page</h2>
//             <div>
//                 <h3>Link New Patient</h3>
//                 <form onSubmit={handleLinkPatient}>
//                     <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
//                     <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                     <button type="submit" disabled={loading}>Link Patient</button>
//                 </form>
//             </div>
//             <div>
//                 <h3>Linked Patients</h3>
//                 {loading && <p>Loading...</p>}
//                 {!loading && patients.length === 0 && <p>No patients linked yet.</p>}
//                 {!loading && patients.length > 0 && (
//                     <table>
//                         <thead>
//                             <tr>
//                                 <th>Patient ID</th>
//                                 <th>Name</th>
//                                 <th>Email</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {patients.map(patient => (
//                                 <tr key={patient.PatientID}>
//                                     <td>{patient.patient_id}</td>
//                                     <td>{patient.name}</td>
//                                     <td>{patient.email}</td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default Patients;

return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h2>Patients Page</h2>
        <div style={{ marginBottom: '20px' }}>
            <h3>Link New Patient</h3>
            <form onSubmit={handleLinkPatient} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                />
                <button type="submit" disabled={loading} style={{ padding: '10px', borderRadius: '5px', border: 'none', background: '#007bff', color: '#fff', cursor: 'pointer' }}>
                    Link Patient
                </button>
            </form>
        </div>
        <div>
            <h3>Linked Patients</h3>
            {loading && <p>Loading...</p>}
            {!loading && patients.length === 0 && <p>No patients linked yet.</p>}
            {!loading && patients.length > 0 && (
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '8px', background: '#f2f2f2' }}>Patient ID</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', background: '#f2f2f2' }}>Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '8px', background: '#f2f2f2' }}>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map(patient => (
                            <tr key={patient.patient_id}>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{patient.patient_id}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{patient.name}</td>
                                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{patient.email}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    </div>
);
};

export default Patients;