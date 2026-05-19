export const styles = {
    container: {
        padding: '20px',
        direction: 'rtl',
        maxWidth: '1400px',
        margin: '0 auto',
        fontFamily: 'sans-serif',
        minHeight: '100vh',
        boxSizing: 'border-box'
    },
    mainGrid: {
        display: 'grid',
        gridTemplateColumns: '75% 25%',
        gap: '24px',
        alignItems: 'start',
    },
    leftColumn: {
        background: '#ffffff',
        padding: '20px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
    },
    rightColumn: {
        background: '#fcfcfc',
        padding: '20px',
        borderRadius: '12px',
        border: '1px solid #eaeaea',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - 80px)', 
        position: 'sticky',
        top: '20px'
    },
    cardsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '20px',
        marginTop: '20px'
    },
    card: {
        padding: '25px 20px',
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        borderRadius: '12px',
        cursor: 'pointer',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0,0,0,0.02)',
    },
    cardFooter: { color: '#007BFF', fontSize: '14px', fontWeight: 'bold', marginTop: '10px' },
    backButton: { padding: '8px 16px', background: '#e2e8f0', border: 'none', borderRadius: '6px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' },
    loadingBox: { padding: '30px', background: '#fff9db', border: '1px solid #f59f00', borderRadius: '8px', fontSize: '18px', textAlign: 'center', margin: '20px 0' },
    lessonBox: { background: '#fff', padding: '25px', borderRadius: '12px', borderRight: '6px solid #4CAF50', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginTop: '20px' },
    lessonContent: { whiteSpace: 'pre-line', marginTop: '20px', lineHeight: '1.7', fontSize: '16px', color: '#333' },
    historyScrollArea: {
        flex: 1,
        overflowY: 'auto',
        paddingLeft: '5px', 
        marginBottom: '15px'
    },
    emptyHistoryBox: {
        padding: '20px',
        textAlign: 'center',
        border: '1px dashed #cbd5e1',
        borderRadius: '8px',
        background: '#fff'
    },
    profileBox: {
        padding: '12px',
        background: '#f1f5f9',
        borderRadius: '8px',
        border: '1px solid #cbd5e1',
        fontSize: '14px',
        textAlign: 'right'
    }
};