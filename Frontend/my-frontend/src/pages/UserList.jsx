import React from 'react';

const UserList = ({ users, selectedUserId, onSelectUser }) => {
    return (
        <div style={{ flex: '1', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ marginTop: 0 }}>List of users in the system</h3>
            <div style={{ maxHeight: '480px', overflowY: 'auto', marginTop: '10px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f7f7f7', zIndex: 1 }}>
                        <tr style={{ textAlign: 'right' }}>
                            <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>ID</th>
                            <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>Username</th>
                            <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>phone</th>
                            <th style={{ padding: '12px', borderBottom: '2px solid #ddd' }}>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user.id} style={{ borderBottom: '1px solid #eee', backgroundColor: selectedUserId === user.id ? '#e6f7ff' : 'transparent' }}>
                                <td style={{ padding: '12px' }}>{user.id}</td>
                                <td style={{ padding: '12px', fontWeight: '600' }}>{user.name}</td>
                                <td style={{ padding: '12px' }}>{user.phone}</td>
                                <td style={{ padding: '12px' }}>
                                    <button onClick={() => onSelectUser(user)} style={{ padding: '6px 12px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
                                      Show prompts
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;