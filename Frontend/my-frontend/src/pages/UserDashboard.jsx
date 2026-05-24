import apiClient from "../services/api";
import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, TextField } from '@mui/material';
import axios from "axios";
import { styles } from './DashboardForUser/styles';
import CategorySelector from './DashboardForUser/CategorySelector';
import LessonViewer from './DashboardForUser/LessonViewer';
import HistorySidebar from './DashboardForUser/HistorySidebar';
import { useNavigate } from 'react-router-dom';
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

     useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem('userId');

            if (!userId) {
                setError("No logged in user found. Please register again.");
                setLoading(false);
                return;
            }

            try {
                const response = await apiClient.get(`http://localhost:3000/api/user/${userId}`);
                setUser(response.data);

                const categoriesResponse = await apiClient.get('http://localhost:3000/api/category/categories');
                const fetchedData = categoriesResponse.data.data || categoriesResponse.data || [];
                setCategories(fetchedData);

                const historyResponse = await apiClient.get(`http://localhost:3000/api/user/users/${userId}/history`);
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
                setError("Failed to load system data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    // Handling a click on the main category
    const handleCategoryClick = (category) => {
        setSelectedCategory(category);

        if (category.subCategories && category.subCategories.length > 0) {
            setSubCategories(category.subCategories);
        } else {
            const localBackups = {
                'science': [{ id: 2, name: 'astronomy' }, { id: 9, name: 'Quantum Physics' }],
                'programing': [{ id: 3, name: 'HTML' }, { id: 4, name: 'C#' }],
                'Mathematics': [{ id: 5, name: 'algebra ' }, { id: 6, name: 'מתמטיקה' }],
                'Cooking & BakingCooking & Baking': [{ id: 7, name: 'קונדיטוריה' }, { id: 8, name: 'Italian cooking'}]
            };

            console.warn("Note: No subcategories returned from the server, running backup view.‼️");
            setSubCategories(localBackups[category.name] || localBackups[category.name?.toLowerCase()] || []);
        }
    };

    //  פונקציית ייצור שיעור מול ה-AI ושמירה בהיסטוריה
    const handleSelectSubCategory = async () => {
        if (!selectedSubCategory) return;

        setLoadingLesson(true);
        setAiLesson('');

        const cleanPrompt = userFocus.trim() !== '' ? userFocus : `Explain to me in detail about${selectedSubCategory.name}`;

        try {
            const response = await apiClient.post('http://localhost:3000/api/prompt/prompts', {
                userId: user?.id || localStorage.getItem('userId'),
                categoryId: selectedCategory?.id,
                subCategoryId: selectedSubCategory?.id || 1,
                input: cleanPrompt,
                prompt: cleanPrompt,
                category: selectedCategory?.name,
                subCategory: selectedSubCategory?.name
            });

            const newLesson = response.data.lesson || response.data.text || response.data.response || "The lesson was created successfully!";
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
            setAiLesson('Oops! AI lesson creation failed. Try again.');
        } finally {
            setLoadingLesson(false);
        }
    };

    if (loading) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading data...</div>;
    if (error) return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;


    return (
    <div style={styles.container}>
        <div style={styles.mainGrid}>
            <div style={styles.leftColumn}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'right' }}>
                    Hello, {user?.name || 'student'}! 👋
                </Typography>
                
                {loadingLesson && <div style={styles.loadingBox}>🤖 Generates a lesson...</div>}
                
                {!loadingLesson && aiLesson ? (
                    <LessonViewer 
                        aiLesson={aiLesson} 
                        selectedSubCategory={selectedSubCategory} 
                        onBack={() => { setAiLesson(''); setSelectedSubCategory(null); }} 
                    />
                ) : !selectedCategory ? (
                    <CategorySelector 
                        categories={categories} 
                        onCategoryClick={handleCategoryClick} 
                    />
                ) : (
                    <div>
                        <button style={styles.backButton} onClick={() => setSelectedCategory(null)}>
                            ⬅️ Back to main categories
                        </button>
                        
                        <Typography variant="h5" sx={{ textAlign: 'right', mb: 2 }}>
                            מה תרצה ללמוד בתוך "{selectedCategory.name}"?
                        </Typography>

                        {!selectedSubCategory ? (
                            <div style={styles.cardsGrid}>
                                {subCategories.map((sub) => (
                                    <div key={sub.id || sub.name} style={styles.card} onClick={() => setSelectedSubCategory(sub)}>
                                        <h3>{sub.name}</h3>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <Box sx={{ p: 3, background: '#fff', borderRadius: 3 }}>
                                <Typography variant="h6">Lesson preparation: {selectedSubCategory.name}</Typography>
                                <TextField 
                                    fullWidth multiline rows={3}
                                    label="Lesson Highlights (Optional)"
                                    value={userFocus}
                                    onChange={(e) => setUserFocus(e.target.value)}
                                    sx={{ my: 2 }}
                                />
                                <button style={styles.cardFooter} onClick={handleSelectSubCategory}>
                                   Create a lesson! 🚀
                                </button>
                            </Box>
                        )}
                    </div>
                )}
            </div>

            <div style={styles.rightColumn}>
                <Typography variant="h6" sx={{ textAlign: 'right', fontWeight: 'bold' }}>📋 history:</Typography>
                <HistorySidebar history={history} />
            </div>
        </div>
    </div>
);
}
export default UserDashboard;


