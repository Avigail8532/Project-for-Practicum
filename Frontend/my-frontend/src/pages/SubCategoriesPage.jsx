import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const SubCategoriesPage = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [subCategories, setSubCategories] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    useEffect(() => {
        const fetchSubCategories = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:3000/api/category/categories/${id}`);
                if (response.data && response.data.success) {
                    // חילוץ המערך מתוך subCategories של אותה קטגוריה
                    setSubCategories(response.data.data.subCategories || []);
                } else {
                    setSubCategories([]);
                }
            } catch (err) {
                console.error("Error fetching subcategories:", err);
                setError("Failed to load subcategories for this topic.");
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchSubCategories();
        }
    }, [id]);

    if (loading) return <div style={styles.centerText}>Loading subtopics...</div>;
    if (error) return <div style={{ color: 'red', padding: '20px' }}>{error}</div>;

    return (
        <div style={styles.container}>
            <button onClick={() => navigate('/dashboard')} style={styles.backButton}>
               ⬅️ Back to main categories
            </button>
            
            <h2>Sub-topics available to you:</h2>
            
            {subCategories.length === 0 ? (
                <p>No subcategories found in this group.</p>
            ) : (
                <div style={styles.grid}>
                    {subCategories.map((sub) => (
                        <div 
                            key={sub.id || sub._id} 
                            style={styles.card}
                            onClick={() => navigate(`/lesson/${id}/${sub.id || sub._id}`)}
                        >
                            <h3>{sub.name}</h3>
                            <p style={styles.cardFooter}>Click to create a customized AI lesson 🚀</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const styles = {
    container: { padding: '20px', direction: 'rtl', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' },
    grid: { display: 'flex', gap: '20px', flexWrap: 'wrap', marginTop: '20px' },
    card: { padding: '20px', background: '#ffffff', border: '1px solid #ddd', borderRadius: '12px', cursor: 'pointer', transition: '0.2s', minWidth: '220px', flex: '1 1 220px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' },
    cardFooter: { color: '#007BFF', fontSize: '14px', fontWeight: 'bold', marginTop: '10px' },
    backButton: { padding: '8px 16px', background: '#e0e0e0', border: 'none', borderRadius: '6px', cursor: 'pointer', marginBottom: '20px', fontWeight: 'bold' },
    centerText: { padding: '50px', textAlign: 'center', fontSize: '18px' }
};

export default SubCategoriesPage;