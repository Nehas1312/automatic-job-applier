import React, { useState } from 'react';
import axios from 'axios';
import '../../Styles/dashboard.css';

const Dashboard = () => {
    const [name, setName] = useState('');
    const [jobRole, setJobRole] = useState('');
    const [resume, setResume] = useState(null);

    const handleFileUpload = (e) => {
        setResume(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('jobRole', jobRole);
        formData.append('resume', resume);

        const token = localStorage.getItem('token'); // Retrieve the JWT from localStorage

        try {
            const response = await axios.post('http://localhost:5000/user/upload-resume', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${token}`, // Include the JWT in the headers
                },
            });
            alert(response.data.message);
        } catch (err) {
            alert('Error uploading data.');
        }
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-box">
                <h2>Dashboard</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Job Role"
                        value={jobRole}
                        onChange={(e) => setJobRole(e.target.value)}
                        required
                    />
                    <input type="file" onChange={handleFileUpload} required />
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Dashboard;
