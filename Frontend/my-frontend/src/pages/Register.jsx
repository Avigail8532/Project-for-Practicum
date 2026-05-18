import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/endpoints';
import { TextField, Box, Button, CircularProgress, Typography } from '@mui/material';

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
            //console.log("This is what returned from registerUser:", userData);
            localStorage.setItem('userId', userData.id); 
            navigate('/UserDashboard');
        } catch (err) {
            console.error(err);
            setError("Failed to register user.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '80vh', 
            p: 2,
            textAlign: 'center'
        }}>
            <Typography
                component="h1"
                sx={{
                    fontSize: { xs: '1.8rem', sm: '2.4rem' }, 
                    fontWeight: 700,                         
                    color: '#2C3E50',                      
                    mb: 5,                                   
                    letterSpacing: '0.5px'                   
                }}
            >
                הרשמה למערכת הלמידה
            </Typography>

            <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    width: '100%',
                    maxWidth: 600
                }}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', sm: 'row' },
                        gap: 2,
                        width: '100%',
                        justifyContent: 'center',
                        mx: 'auto'
                    }}>
                        <TextField
                            label="Name"
                            type='text'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            fullWidth
                        />

                        <TextField
                            label="Phone"
                            type='text'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            fullWidth
                        />
                    </Box>

                    {/* הכפתור ממורכז מתחתיהם */}
                    <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        size="large"
                        startIcon={loading ? <CircularProgress size={20} color='inherit' /> : null}
                        sx={{ px: 6, py: 1.5 }} 
                    >
                        {loading ? "Registering..." : "Register"}
                    </Button>
                </Box>
            </form>

            {error && <p style={{ color: 'red', marginTop: '20px' }}>{error}</p>}
        </Box>
    );
}


export default Register;