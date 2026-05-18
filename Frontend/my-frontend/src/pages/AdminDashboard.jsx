import React, { useState, useEffect } from 'react';
import { getAllUsers, getUserHistory } from '../services/adminService';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userHistory, setUserHistory] = useState([]);
    
    // סטייט חדש לשמירת השיעור שהמנהל בחר לצפות בו כרגע
    const [selectedLesson, setSelectedLesson] = useState(null);
    
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        loadUsersData();
    }, []);

    const loadUsersData = async () => {
        try {
            setLoadingUsers(true);
            const res = await getAllUsers();
            if (res.success) {
                setUsers(res.data);
            }
        } catch (err) {
            setError('שגיאה בתקשורת עם השרת או בטעינת המשתמשים');
            console.error(err);
        } finally {
            setLoadingUsers(false);
        }
    };

    const handleUserSelect = async (user) => {
        setSelectedUser(user);
        setSelectedLesson(null); // איפוס השיעור הנבחר של המשתמש הקודם
        try {
            setLoadingHistory(true);
            setUserHistory([]); 
            const res = await getUserHistory(user.id);
            if (res.success) {
                setUserHistory(res.data);
            }
        } catch (err) {
            console.error('שגיאה בקבלת היסטוריית המשתמש', err);
        } finally {
            setLoadingHistory(false);
        }
    };

    if (loadingUsers) return <div style={{ padding: '20px', textAlign: 'center' }}>טוען משתמשים...</div>;
    if (error) return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;

    return (
        <div style={{ padding: '20px', direction: 'rtl', fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif' }}>
            <h2 style={{ borderBottom: '2px solid #007bff', paddingBottom: '10px', color: '#333' }}> מנהל - לוח בקרה</h2>
            
            <div style={{ display: 'flex', gap: '25px', marginTop: '20px' }}>
                
                {/* צד ימין: תיבת רשימת המשתמשים */}
                <div style={{ flex: '1', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    <h3 style={{ marginTop: 0 }}>רשימת משתמשים במערכת</h3>
                    
                    <div style={{ maxHeight: '480px', overflowY: 'auto', marginTop: '10px' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f7f7f7', zIndex: 1 }}>
                                <tr style={{ textAlign: 'right' }}>
                                    <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>מזהה</th>
                                    <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>שם משתמש</th>
                                    <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>מספר טלפון</th>
                                    <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>פעולה</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.id} style={{ 
                                        borderBottom: '1px solid #eee',
                                        backgroundColor: selectedUser?.id === user.id ? '#e6f7ff' : 'transparent'
                                    }}>
                                        <td style={{ padding: '12px' }}>{user.id}</td>
                                        <td style={{ padding: '12px', fontWeight: '600' }}>{user.name}</td>
                                        <td style={{ padding: '12px' }}>{user.phone}</td>
                                        <td style={{ padding: '12px' }}>
                                            <button 
                                                onClick={() => handleUserSelect(user)}
                                                style={{ 
                                                    padding: '6px 12px', 
                                                    backgroundColor: '#007bff', 
                                                    color: '#fff', 
                                                    border: 'none', 
                                                    borderRadius: '4px', 
                                                    cursor: 'pointer',
                                                    fontWeight: 'bold'
                                                }}
                                            >
                                                הצג פרומפטים
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* צד שמאל: היסטוריית שיעורים ובחירת שיעור ספציפי */}
                <div style={{ flex: '1', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px', backgroundColor: '#fafafa', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                    {selectedUser ? (
                        <div>
                            <h3 style={{ color: '#007bff', marginTop: 0 }}>היסטוריית בקשות עבור: {selectedUser.name}</h3>
                            <p style={{ color: '#666', fontSize: '13px' }}>מזהה: {selectedUser.id} | טלפון: {selectedUser.phone}</p>
                            <hr style={{ border: '0', borderTop: '1px solid #ddd', margin: '15px 0' }} />

                            {loadingHistory ? (
                                <p>טוען נתוני AI מהדאטה-בייס...</p>
                            ) : selectedLesson ? (
                                /* הצגת השיעור הספציפי שנבחר */
                                <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '6px', border: '1px solid #007bff' }}>
                                    <button 
                                        onClick={() => setSelectedLesson(null)} 
                                        style={{ marginBottom: '15px', padding: '6px 12px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                                    >
                                        🡪 חזור לרשימת השיעורים
                                    </button>
                                    
                                    <div style={{ marginBottom: '15px' }}>
                                        <small style={{ color: '#888' }}>
                                            תאריך יצירה: {selectedLesson.createdAt ? new Date(selectedLesson.createdAt).toLocaleString('he-IL') : 'לא זמין'}
                                        </small>
                                    </div>

                                    <p style={{ margin: '4px 0' }}>
                                        <strong>השאלה שנשאלה (Prompt):</strong>
                                        <span style={{ display: 'block', backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '4px', marginTop: '4px', fontSize: '14px', borderLeft: '3px solid #007bff' }}>
                                            {selectedLesson.prompt}
                                        </span>
                                    </p>
                                    
                                    <p style={{ margin: '15px 0 4px 0' }}>
                                        <strong>השיעור שנוצר (AI Response):</strong>
                                        <span style={{ display: 'block', backgroundColor: '#f4faf6', padding: '12px', borderRadius: '4px', marginTop: '4px', fontSize: '14px', whiteSpace: 'pre-line', borderLeft: '3px solid #28a745', lineHeight: '1.5' }}>
                                            {selectedLesson.response || selectedLesson.aiResponse}
                                        </span>
                                    </p>
                                </div>
                            ) : userHistory.length > 0 ? (
                                /*  רשימת כל השיעורים של המשתמש לבחירה */
                                <div style={{ maxHeight: '430px', overflowY: 'auto' }}>
                                    <p style={{ fontWeight: 'bold', color: '#555', marginBottom: '10px' }}>בחר שיעור כדי לצפות בתוכן המלא:</p>
                                    {userHistory.map((item, index) => (
                                        <div 
                                            key={item.id} 
                                            onClick={() => setSelectedLesson(item)}
                                            style={{ 
                                                backgroundColor: '#fff', 
                                                padding: '12px', 
                                                marginBottom: '10px', 
                                                borderRadius: '6px', 
                                                border: '1px solid #e0e0e0',
                                                cursor: 'pointer',
                                                transition: 'all 0.2s ease',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }}
                                            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#007bff'; e.currentTarget.style.backgroundColor = '#f8f9fa'; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e0e0e0'; e.currentTarget.style.backgroundColor = '#fff'; }}
                                        >
                                            <div style={{ flex: '1', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', paddingLeft: '10px' }}>
                                                <span style={{ fontWeight: 'bold', color: '#333' }}>{index + 1}. </span>
                                                <span style={{ color: '#007bff', fontWeight: '500' }}>{item.prompt}</span>
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#888', whiteSpace: 'nowrap' }}>
                                                {item.createdAt ? new Date(item.createdAt).toLocaleDateString('he-IL') : 'לא זמין'} ⮜
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ color: '#888', fontStyle: 'italic' }}>למשתמש זה אין עדיין היסטוריית למידה רשומה.</p>
                            )}
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', color: '#999', marginTop: '8px', fontStyle: 'italic', padding: '40px 0' }}>
                            בחר משתמש מתוך הרשימה מימין כדי לצפות בכל שיעורי ה-AI והפרומפטים שלו.
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default AdminDashboard;