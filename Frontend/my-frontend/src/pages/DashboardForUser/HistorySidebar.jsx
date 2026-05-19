import { Card, CardContent, Typography } from '@mui/material';
import { styles } from './styles';

const HistorySidebar = ({ history }) => (
    <div style={styles.historyScrollArea}>
        {history.map((item, idx) => (
            <Card key={item.id || idx} sx={{ mb: 2, boxShadow: 1, borderRadius: 2, borderRight: '5px solid #007BFF' }}>
                <CardContent style={{ textAlign: 'right', padding: '12px' }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        ❓ {(item.prompt || item.input)?.replace('Explain to me in detail about ', '')}
                    </Typography>
                    <details style={{ cursor: 'pointer' }}>
                        <summary style={{ color: '#007BFF', fontSize: '13px' }}>📖Show lesson </summary>
                        <Typography variant="body2" sx={{ mt: 1, whiteSpace: 'pre-line', bgcolor: '#f9f9f9', p: 1 }}>
                            {item.response || item.text || item.lesson}
                        </Typography>
                    </details>
                </CardContent>
            </Card>
        ))}
    </div>
);
export default HistorySidebar;