import apiClient from "./api";

// פונקציה לרישום משתמש חדש
export const registerUser = async (name, phone) => {
    try {
        const response = await apiClient.post('/user/addUser', { name, phone });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};
// פונקציה לקבלת כל הקטגוריות
export const getCategories = async () => {
    try {
        const response = await apiClient.get('/categories');
        return response.data.data; // גישה ישירה לנתוני הקטגוריות
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw error; // זריקת השגיאה המקורית
    }
}
//
export const sendPrompt = async (userId, categoryId, subCategoryId, prompt) => {
    try {
        const response = await apiClient.post('/prompts', {
            userId,
            categoryId,
            subCategoryId,
            prompt
        });
        return response.data;
    } catch (error) {
        console.error('שגיאה בפונקציית sendPrompt:', error, error);
        throw error;
    }
}



// פונקציה לקבלת היסטוריית השאלות של משתמש

export const getUserHistory = async (userId) => {
    try {
        const response = await apiClient.get(`/prompts/user/${userId}`);
        return response.data;
    } catch (error) {
        console.error('שגיאה בפונקציית getUserHistory:', error);
        throw error;
    }
};

// פונקציה המיועדת למסך הניהול ומחזירה את כל המשתמשים וההיסטוריה שלהם
export const getAdminHistory = async () => {
    try {
        const response = await apiClient.get('/admin/users');
        return response.data.data;
    } catch (error) {
        console.error('שגיאה בפונקציית getAdminHistory:', error);
        throw error;
    }
};

