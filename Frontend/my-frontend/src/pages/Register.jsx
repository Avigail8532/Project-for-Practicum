import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../services/endpoints';
import { TextField, Box, Button, CircularProgress, Typography, ThemeProvider, createTheme } from '@mui/material';

const Register = () => {

    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const turquoiseTheme = createTheme({
        palette: {
            primary: {
                main: '#5dbfaa', // צבע הטורקיז בזמן לחיצה (פוקוס)
            },
        },
        components: {
            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        // צבע המסגרת במצב רגיל
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#a3e2d5',
                        },
                        // צבע המסגרת בריחוף עכבר (Hover)
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#5dbfaa',
                        },
                    },
                },
            },
            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: '#67c4b0', // צבע הלייבל במצב רגיל
                    },
                },
            },
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const userData = await registerUser(name, phone);
            localStorage.setItem('userId', userData.id);
            navigate('/UserDashboard');
        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Communication error: Cannot connect to the server at this time.");
            }
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
            textAlign: 'center',
            position: 'relative'
        }}>
            <Typography
                component="h1"
                sx={{
                    fontSize: { xs: '1.8rem', sm: '2.4rem' },
                    fontWeight: 700,
                    color: '#5dbfaa',
                    mb: 5,
                    letterSpacing: '0.5px'
                }}
            >
                Register for the learning system
            </Typography>

            {/* ה-form הוחזר לפעילות מלאה כדי שהטופס יישלח כראוי */}
            <form onSubmit={handleSubmit} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    width: '100%',
                    maxWidth: 600
                }}>
                    
                    {/* ה-ThemeProvider עוטף אך ורק את ה-Box של שני השדות ומחליף את הכחול בטורקיז */}
                    <ThemeProvider theme={turquoiseTheme}>
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
                    </ThemeProvider>

                    <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                        size="large"
                        startIcon={loading ? <CircularProgress size={20} color='inherit' /> : null}
                        sx={{ 
                            px: 6, 
                            py: 1.5, 
                            mt: 3,
                            backgroundColor: "#67c4b0 !important", 
                            '&:hover': {
                                backgroundColor: '#4ca693 !important'
                            }
                        }}
                    >
                        {loading ? "Registering..." : "Register"}
                    </Button>

                    <Button
                        variant="outlined"
                        onClick={() => navigate('/admin')}
                        sx={{
                            position: 'absolute',
                            top: '20px',
                            left: '100px',
                            minWidth: 'auto',
                            zIndex: 1000,
                            color: '#f4fbfa',
                            backgroundColor: '#326a5e',
                            '&:hover': {
                                borderColor: '#23463e',
                                backgroundColor: '#23463e'
                            }
                        }}
                    >
                        Administrator login
                    </Button>
                </Box>
            </form>

            {error && (
                <Typography
                    variant="body1"
                    sx={{
                        color: 'error.main',
                        mt: 3,
                        fontWeight: 'bold',
                        backgroundColor: '#fdf2f2',
                        p: 1.5,
                        borderRadius: '4px',
                        border: '1px solid #fde8e8'
                    }}
                >
                    ⚠️ {error}
                </Typography>
            )}
        </Box>
    );
}

export default Register;