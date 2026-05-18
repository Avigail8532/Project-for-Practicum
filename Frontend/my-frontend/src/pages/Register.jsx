import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/endpoints';


 const Register = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    // הוספת useNavigate לניווט לאחר ההרשמה 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();// מניעת רענון הדף בעת שליחת הטופס
        setLoading(true);// הצגת מצב טעינה
        setError("");// איפוס הודעות שגיאה קודמות

        try {
            const userData = await registerUser(name, phone);
            localStorage.setItem('userId', userData.id); // שמירת מזהה המשתמש ב-localStorage
            navigate('/Dashboard');
        } catch (err) {
            console.error(err);
            setError("Failed to register user.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <>

            <h1>Register</h1>
            <h2>הרשמה למערכת הלמידה</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}

        </>

    );
}
export default Register;