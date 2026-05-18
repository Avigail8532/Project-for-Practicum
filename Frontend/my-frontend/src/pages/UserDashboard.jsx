import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserData = async () => {
            // 1. שליפת ה-ID של המשתמש ששמרנו בעת ההרשמה/התחברות
            const userId = localStorage.getItem('userId');
            
            if (!userId) {
                setError("לא נמצא משתמש מחובר. אנא הרשם מחדש.");
                setLoading(false);
                return;
            }

            try {
                // 2. שליחת בקשה לשרת לקבלת נתוני המשתמש (תתאימי את ה-URL לשרת שלך)
                const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
                
                // שמירת נתוני המשתמש ב-State
                setUser(response.data); 
            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("נכשלה טעינת נתוני המשתמש.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // מצב טעינה
    if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>טוען נתונים...</div>;
    
    // מצב שגיאה
    if (error) return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;

    return (
        <div style={{ padding: '20px', direction: 'rtl' }}>
            <h1>שלום, {user?.name || 'סטודנט'}! 👋</h1>
            <h2>ברוך הבא לדשבורד הלמידה האישי שלך</h2>
            <hr />
            
            {/* כאן בהמשך נוסיף את רכיבי הלמידה */}
            <div style={{ marginTop: '20px', padding: '15px', background: '#f5f5f5', borderRadius: '8px' }}>
                <h3>הפרטים שלי:</h3>
                <p><strong>שם:</strong> {user?.name}</p>
                <p><strong>טלפון:</strong> {user?.phone}</p>
            </div>
        </div>
    );
};

export default Dashboard;