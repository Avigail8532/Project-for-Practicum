import React, { useEffect, useState } from 'react';
import axiosInstance from 'axios'; // שימוש ב-axios רגיל לקריאות שרת
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Card, CardContent, Divider, TextField } from '@mui/material';
import axios from "axios";
const UserDashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [history, setHistory] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [subCategories, setSubCategories] = useState([]);
    const [selectedSubCategory, setSelectedSubCategory] = useState(null);
    const [aiLesson, setAiLesson] = useState('');
    const [loadingLesson, setLoadingLesson] = useState(false);
    const navigate = useNavigate();
    const [userFocus, setUserFocus] = useState('');
    //  טעינת נתונים ראשונית (משתמש, קטגוריות והיסטוריה)
    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');

            if (!userId) {
                setError("לא נמצא משתמש מחובר. אנא הרשם מחדש.");
                setLoading(false);
                return;
            }

            try {
                const response = await axiosInstance.get(`http://localhost:3000/api/user/${userId}`);
                setUser(response.data);

                const categoriesResponse = await axiosInstance.get('http://localhost:3000/api/category/categories');
                const fetchedData = categoriesResponse.data.data || categoriesResponse.data || [];
                setCategories(fetchedData);

                const historyResponse = await axiosInstance.get(`http://localhost:3000/api/user/users/${userId}/history`);
                const resData = historyResponse.data;
                const data = resData?.data || resData;

                if (Array.isArray(data)) {
                    setHistory(data);
                } else if (data && Array.isArray(data.prompts)) {
                    setHistory(data.prompts);
                } else if (data && Array.isArray(data.history)) {
                    setHistory(data.history);
                } else {
                    setHistory([]);
                }

            } catch (err) {
                console.error("Error fetching user data:", err);
                setError("נכשלה טעינת נתוני המערכת.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    //  טיפול בלחיצה על קטגוריה ראשית
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);

        if (category.subCategories && category.subCategories.length > 0) {
            setSubCategories(category.subCategories);
        } else {
            const localBackups = {
                'science': [{ id: 2, name: 'אסטרונומיה' }, { id: 9, name: 'פיזיקה קוונטית' }],
                'programing': [{ id: 3, name: 'HTML' }, { id: 4, name: 'C#' }],
                'Mathematics': [{ id: 5, name: 'אלגברה ' }, { id: 6, name: 'מתמטיקה' }],
                'Cooking & BakingCooking & Baking': [{ id: 7, name: 'קונדיטוריה' }, { id: 8, name: 'בישול איטלקי' }]
            };

            console.warn("שים לב: לא חזרו תתי-קטגוריות מהשרת, מפעיל תצוגת גיבוי.");
            setSubCategories(localBackups[category.name] || localBackups[category.name?.toLowerCase()] || []);
        }
    };

    //  פונקציית ייצור שיעור מול ה-AI ושמירה בהיסטוריה
    const handleSelectSubCategory = async () => {
        if (!selectedSubCategory) return;

        setLoadingLesson(true);
        setAiLesson('');

        const cleanPrompt = userFocus.trim() !== '' ? userFocus : `תסביר לי בהרחבה על ${selectedSubCategory.name}`;

        try {
            const response = await axiosInstance.post('http://localhost:3000/api/prompt/prompts', {
                userId: user?.id || localStorage.getItem('userId'),
                categoryId: selectedCategory?.id,
                subCategoryId: selectedSubCategory?.id || 1,
                input: cleanPrompt,
                prompt: cleanPrompt,
                category: selectedCategory?.name,
                subCategory: selectedSubCategory?.name
            });

            const newLesson = response.data.lesson || response.data.text || response.data.response || "השיעור נוצר בהצלחה!";
            setAiLesson(newLesson);

            
            const displayTitle = userFocus.trim() !== '' ? userFocus : selectedSubCategory.name;

            const newHistoryItem = {
                id: response.data.id || Date.now(),
                prompt: displayTitle,
                input: displayTitle,
                response: newLesson,
                text: newLesson,
                lesson: newLesson,
                created_at: new Date().toISOString()
            };

            setHistory(prev => [newHistoryItem, ...prev]);
            setUserFocus('');

        } catch (err) {
            console.error("Error generating AI lesson:", err);
            setAiLesson('אופס! נכשלה יצירת השיעור באמצעות ה-AI. נסה שוב.');
        } finally {
            setLoadingLesson(false);
        }
    };

    if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>טוען נתונים...</div>;
    if (error) return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;

    return (
        <div style={styles.container}>
            <div style={styles.mainGrid}>

                <div style={styles.leftColumn}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'right' }}>
                        שלום, {user?.name || 'סטודנט'}! 👋
                    </Typography>
                    <Divider sx={{ mb: 3 }} />
                    {loadingLesson && (
                        <div style={styles.loadingBox}>
                            🤖 ה-AI שלנו מייצר עבורך שיעור מותאם אישית ברגעים אלו... אנא המתן.
                        </div>
                    )}
                    {aiLesson && !loadingLesson && (
                        <div style={styles.lessonBox}>
                            <button style={styles.backButton} onClick={() => { setAiLesson(''); setSelectedSubCategory(null); }}>
                                ⬅️ חזרה לבחירת נושאים
                            </button>
                            <h2>📚 השיעור המותאם שלך בנושא: {selectedSubCategory?.name}</h2>
                            <div style={styles.lessonContent}>
                                {aiLesson}
                            </div>
                        </div>
                    )}

                    {/* ניווט בתוך קטגוריה שנבחרה */}
                    {selectedCategory && !loadingLesson && !aiLesson && (
                        <div>
                            <button
                                style={styles.backButton}
                                onClick={() => selectedSubCategory ? setSelectedSubCategory(null) : setSelectedCategory(null)}
                            >
                                ⬅️ {selectedSubCategory ? 'חזרה לבחירת נושאים' : 'חזרה לקטגוריות ראשיות'}
                            </button>

                            <Box sx={{ mb: 3, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
                                <Typography variant="h6" sx={{ textAlign: 'right' }}>
                                    נתיב למידה: <strong>{selectedCategory.name}</strong>
                                    {selectedSubCategory && <> ⬅️ <strong>{selectedSubCategory.name}</strong></>}
                                </Typography>
                            </Box>

                            {/*  בחירת תת קטגוריה */}
                            {!selectedSubCategory ? (
                                <div>
                                    <h2 style={{ textAlign: 'right' }}>   מה תרצה ללמוד מתוך :   "{selectedCategory.name}"?</h2>
                                    <div style={styles.cardsGrid}>
                                        {subCategories && subCategories.length > 0 ? (
                                            subCategories.map((sub) => (
                                                <div key={sub.id || sub._id || sub.name} style={styles.card} onClick={() => setSelectedSubCategory(sub)}>
                                                    <h3>{sub.name}</h3>
                                                </div>
                                            ))
                                        ) : (
                                            <p style={{ color: '#666', padding: '10px', width: '100%', textAlign: 'right' }}>לא נמצאו תתי-נושאים.</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                /*  הזנת דגשים וכפתור ייצור */
                                <Box sx={{ p: 3, background: '#fff', borderRadius: 3, boxShadow: 1, maxWidth: '600px', margin: '0 auto' }}>
                                    <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 2, textAlign: 'center' }}>
                                        📚 הכנת השיעור בנושא: {selectedSubCategory.name}
                                    </Typography>

                                    <Typography variant="body1" sx={{ mb: 2, textAlign: 'right', color: 'text.secondary' }}>
                                        ה-AI יודע שהוא מייצר שיעור עבור <strong>{selectedCategory.name}</strong> בתחום <strong>{selectedSubCategory.name}</strong>. רוצה להוסיף דגשים מיוחדים?
                                    </Typography>

                                    <TextField
                                        id="outlined-basic"
                                        label="מה תרצה לדעת? (לדוגמה: תסביר פשוט, תן דוגמאות...)"
                                        variant="outlined"
                                        fullWidth
                                        multiline
                                        rows={3}
                                        value={userFocus}
                                        onChange={(e) => setUserFocus(e.target.value)}
                                        slotProps={{
                                            htmlInput: {
                                                style: { textAlign: 'right', direction: 'rtl' }
                                            }
                                        }}
                                        sx={{
                                            mb: 3,
                                            '& .MuiInputLabel-root': { width: '100%', textAlign: 'right', transformOrigin: 'right' },
                                            '& .MuiInputLabel-outlined': { transform: 'translate(-14px, 16px) scale(1)' },
                                            '& .MuiInputLabel-outlined.MuiInputLabel-shrink': { transform: 'translate(-14px, -6px) scale(0.75)' }
                                        }}
                                    />

                                    <button
                                        style={{ ...styles.cardFooter, width: '100%', padding: '12px', background: '#007BFF', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}
                                        onClick={handleSelectSubCategory}
                                    >
                                        ייצר לי שיעור מותאם אישית עכשיו! 🚀
                                    </button>
                                </Box>
                            )}
                        </div>
                    )}

                    {/* מסך ראשי - הצגת קטגוריות ראשיות */}
                    {!selectedCategory && !loadingLesson && !aiLesson && (
                        <div>
                            <h2 style={{ textAlign: 'right', marginBottom: '20px' }}>איזה תחום מעניין אותך ללמוד היום?</h2>
                            <div style={styles.cardsGrid}>
                                {categories.map((cat) => (
                                    <div key={cat.id || cat._id} style={styles.card} onClick={() => handleCategoryClick(cat)}>
                                        <span style={{ fontSize: '40px' }}>{cat.icon || '📖'}</span>
                                        <h3>{cat.name}</h3>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/*   היסטוריית למידה ופרופיל*/}
                <div style={styles.rightColumn}>
                    <Typography variant="h6" sx={{ textAlign: 'right', fontWeight: 'bold', mb: 2, color: '#333' }}>
                        📋 היסטוריית הלמידה שלך:
                    </Typography>

                    <div style={styles.historyScrollArea}>
                        {history.length === 0 ? (
                            <div style={styles.emptyHistoryBox}>
                                <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>עדיין לא ביצעת שיעורים במערכת. זה הזמן להתחיל! 🚀</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {history.map((item, idx) => (
                                    <Card key={item.id || idx} sx={{ boxShadow: 1, borderRadius: 2, borderRight: '5px solid #007BFF' }}>
                                        <CardContent style={{ textAlign: 'right', padding: '12px' }}>
                                            
                                            <Typography variant="subtitle2" sx={{ fontWeight: 'bold', color: '#333' }}>
                                                ❓ {
                                                    (item.prompt || item.input)?.includes('תסביר לי בהרחבה על')
                                                        ? (item.prompt || item.input).replace('תסביר לי בהרחבה על ', '')
                                                        : (item.prompt || item.input)
                                                }
                                            </Typography>
                                            <details style={{ marginTop: '8px', cursor: 'pointer' }}>
                                                <summary style={{ color: '#007BFF', fontWeight: 'bold', fontSize: '13px' }}>
                                                    📖 הצג שיעור 
                                                </summary>
                                                <Typography variant="body2" component="div" sx={{ mt: 1, whiteSpace: 'pre-line', bgcolor: '#f9f9f9', p: 1, borderRadius: 1, fontSize: '13px', lineHeight: '1.4' }}>
                                                    {item.response || item.text || item.lesson}
                                                </Typography>
                                            </details>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </div>

                    <div style={styles.profileBox}>
                        <h4 style={{ margin: '0 0 8px 0', borderBottom: '1px solid #ddd', paddingBottom: '4px' }}>👤 הפרופיל שלי:</h4>
                        <p style={{ margin: '4px 0' }}><strong>שם:</strong> {user?.name}</p>
                        <p style={{ margin: '4px 0' }}><strong>טלפון:</strong> {user?.phone}</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

const styles = {
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

export default UserDashboard;