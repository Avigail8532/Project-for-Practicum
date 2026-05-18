const { body, validationResult } = require('express-validator');

// הגדרת חוקי האימות עבור רישום משתמש
const validateRegister = [
    body('name')
        .trim()
        .notEmpty().withMessage('Username is a required field.    ')
        .isLength({ min: 2 }).withMessage('The name must contain at least 2 characters.'),
    
    body('phone')
        .trim()
        .notEmpty().withMessage('Phone number is a required field.')
        .matches(/^[0-9]{9,10}$/).withMessage('The phone number must contain only 9 to 10 digits.'),

    // פונקציה שתופסת את השגיאות ומחזירה אותן לפרונטאנד
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                // מחזירים את הודעת השגיאה הראשונה שנוצרה
                message: errors.array()[0].msg 
            });
        }
        next(); // אם הכל תקין, ממשיכים ל-Controller
    }
];

module.exports = { validateRegister };