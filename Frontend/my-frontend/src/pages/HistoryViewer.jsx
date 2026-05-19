import React from 'react';

const HistoryViewer = ({ selectedUser, loadingHistory, userHistory, selectedLesson, setSelectedLesson }) => {
    if (!selectedUser) {
        return <div style={{ textAlign: 'center', color: '#999', marginTop: '8px', fontStyle: 'italic', padding: '40px 0' }}>Select a user from the list on the right to view all their AI lessons and prompts.</div>;
    }

    return (
        <div style={{ flex: '1', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px', backgroundColor: '#fafafa', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
            <h3 style={{ color: '#007bff', marginTop: 0 }}>Request history for: {selectedUser.name}</h3>
            <p style={{ color: '#666', fontSize: '13px' }}>id: {selectedUser.id} | phone: {selectedUser.phone}</p>
            <hr style={{ border: '0', borderTop: '1px solid #ddd', margin: '15px 0' }} />

            {loadingHistory ?<p>Loading AI data from database...</p> : 
             selectedLesson ? (
                <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '6px', border: '1px solid #007bff' }}>
                    <button onClick={() => setSelectedLesson(null)} style={{ marginBottom: '15px', padding: '6px 12px', backgroundColor: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>🡪Return to the list of lessons</button>
                    <div style={{ marginBottom: '15px' }}><small style={{ color: '#888' }}>Date of creation: {selectedLesson.createdAt ? new Date(selectedLesson.createdAt).toLocaleString('he-IL') : 'לא זמין'}</small></div>
                    <p><strong>The question asked(Prompt):</strong><span style={{ display: 'block', backgroundColor: '#f8f9fa', padding: '10px', marginTop: '4px', fontSize: '14px', borderLeft: '3px solid #007bff' }}>{selectedLesson.prompt}</span></p>
                    <p><strong>The lesson created(AI Response):</strong><span style={{ display: 'block', backgroundColor: '#f4faf6', padding: '12px', marginTop: '4px', fontSize: '14px', whiteSpace: 'pre-line', borderLeft: '3px solid #28a745', lineHeight: '1.5' }}>{selectedLesson.response || selectedLesson.aiResponse}</span></p>
                </div>
            ) : userHistory.length > 0 ? (
                <div style={{ maxHeight: '430px', overflowY: 'auto' }}>
                    {userHistory.map((item, index) => (
                        <div key={item.id} onClick={() => setSelectedLesson(item)} style={{ backgroundColor: '#fff', padding: '12px', marginBottom: '10px', borderRadius: '6px', border: '1px solid #e0e0e0', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}>
                            <div><span style={{ fontWeight: 'bold' }}>{index + 1}. </span><span style={{ color: '#007bff' }}>{item.prompt}</span></div>
                            <div style={{ fontSize: '12px', color: '#888' }}>{item.createdAt ? new Date(item.createdAt).toLocaleDateString('he-IL') : 'לא זמין'} ⮜</div>
                        </div>
                    ))}
                </div>
            ) : <p style={{ color: '#888', fontStyle: 'italic' }}>This user has no recorded learning history yet.</p>}
        </div>
    );
};

export default HistoryViewer;