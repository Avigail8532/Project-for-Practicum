import React, { useState, useEffect } from 'react';
import { getAllUsers, getUserHistory } from '../services/adminService';
import UserList from '../pages/UserList';
import HistoryViewer from '../pages/HistoryViewer';

const AdminDashboard = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userHistory, setUserHistory] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [loadingHistory, setLoadingHistory] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => { loadUsersData(); }, []);

    const loadUsersData = async () => {
        try {
            setLoadingUsers(true);
            const res = await getAllUsers();
            if (res.success) setUsers(res.data);
        } catch (err) { setError('Error loading users'); } 
        finally { setLoadingUsers(false); }
    };

    const handleUserSelect = async (user) => {
        setSelectedUser(user);
        setSelectedLesson(null);
        setLoadingHistory(true);
        setUserHistory([]);
        try {
            const res = await getUserHistory(user.id);
            if (res.success) setUserHistory(res.data);
        } catch (err) { console.error(err); } 
        finally { setLoadingHistory(false); }
    };

    if (loadingUsers) return <div>Users claim...</div>;
    
    return (
        <div style={{ padding: '20px', direction: 'rtl', fontFamily: 'Segoe UI' }}>
            <h2 >Administrator - Control Panel</h2>
            <div style={{ display: 'flex', gap: '25px', marginTop: '20px' }}>
                <UserList users={users} selectedUserId={selectedUser?.id} onSelectUser={handleUserSelect} />
                <HistoryViewer 
                    selectedUser={selectedUser} 
                    loadingHistory={loadingHistory} 
                    userHistory={userHistory} 
                    selectedLesson={selectedLesson} 
                    setSelectedLesson={setSelectedLesson} 
                />
            </div>
        </div>
    );
};

export default AdminDashboard;