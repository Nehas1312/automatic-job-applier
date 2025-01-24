import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignUp from './components/Auth/SignUp';
import Login from './components/Auth/Login';
import Dashboard from './components/Dashboard/Dashboard';
// import UploadResume from './components/Dashboard/UploadResume';
// import Preferences from './components/Dashboard/Preferences';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* <Route path="/dashboard/upload-resume" element={<UploadResume />} />
                <Route path="/dashboard/preferences" element={<Preferences />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
