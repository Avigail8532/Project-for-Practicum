# Project-for-Practicum
Artificial Intelligence-Driven Learning Platform (Mini MVP)

# AI-Powered Learning Platform 

פלטפורמת למידה חכמה ואינטראקטיבית המאפשרת למשתמשים לבחור קטגוריות ותתי-קטגוריות של נושאי לימוד, ולקבל מערכי שיעור מותאמים אישית המיוצרים בזמן אמת.

---

##  טכנולוגיות בשימוש (Tech Stack)

### צד לקוח (Frontend)
* **React.js (Vite):** קומפוננטות פונקציונליות, ניהול State ורנדור מהיר.
* **React Router Dom:** ניהול הניווט והראוטינג באפליקציה (`useNavigate`).
* **Axios:** ביצוע קריאות HTTP ל-API בצורה מנוהלת ומאובטחת באמצעות `axiosInstance`.
* **CSS3:** עיצוב רספונסיבי ומודרני.

### צד שרת (Backend)
* **Node.js & Express:** בניית ארכיטקטורת שרת ו-Web API (RESTful).
* **Sequelize (ORM):** ניהול ותקשורת מול בסיס הנתונים בצורה מונחית עצמים.

### בסיס נתונים וכלים (Database & Tools)
* **PostgreSQL:** בסיס נתונים רלציוני לשמירת משתמשים, קטגוריות ותתי-קטגוריות.
* **Docker & Docker Compose:** קונטיינריזציה של כל חלקי הפרויקט (Frontend, Backend, DB) להרצה אחידה.
* **Git & GitHub:** ניהול גרסאות ומעקב קוד.

---

##  הנחות עבודה (Assumptions)
1. **שימוש ב-Mock AI:** לצורך הרצה מקומית יציבה ומניעת בעיות חיבור/תשלום מול OpenAI API, השרת מחזיר תשובות Mock מובנות המדמות את פעולת ה-AI בזמן אמת.
2. **ניהול משתמשים בסיסי:** המערכת מניחה קיומו של משתמש ברירת מחדל בבסיס הנתונים (ID: 1) לצורך ביצוע פעולות ה-Dashboard.
3. **סביבת Docker אחידה:** ההנחה היא שהרצת הפרויקט מתבצעת כולה תחת Docker Compose כדי למנוע הבדלי גרסאות של Node או PostgreSQL במחשב המקומי.

---

## 💻 איך להריץ מקומית (Local Setup)

### דרישות קדם (Prerequisites)
* התקנת **Docker Desktop** במחשב.
* התקנת **Git**.

### שלבי הגדרה והרצה (צעד אחר צעד)

1. **שיבוט המאגר (Clone):**
   ```bash
   git clone [https://github.com/Avigail8532/Project-for-Practicum.git](https://github.com/Avigail8532/Project-for-Practicum.git)
   cd Project-for-Practicum
   
2. הגדרת קבצי סביבה:

יש ליצור קובץ חדש בשם .env בתיקיית ה-Backend (לפי הפורמט של קובץ ה-.env.example).

יש למלא את פרטי הגישה לדאטהבייס.
3. הרצה באמצעות Docker:
הרץ את הפקודה הבאה בתיקייה הראשית:
docker compose up --build

4. גישה לאפליקציה:

צד לקוח (Frontend): זמין בדפדפן בכתובת http://localhost:5173

צד שרת (Backend API): זמין בכתובת http://localhost:5000

 אכלוס ראשוני של בסיס הנתונים (Database Seeding)
במידה וה-Dropdowns של הקטגוריות ריקים בהרצה הראשונה, יש להיכנס ל-Container של ה-PostgreSQL ולהריץ את פקודות ה-SQL הבאות:
-- הוספת קטגוריות
INSERT INTO "Categories" ("name", "createdAt", "updatedAt") VALUES 
('History', NOW(), NOW()), ('Science', NOW(), NOW()), ('Technology', NOW(), NOW())
ON CONFLICT ("name") DO NOTHING;

-- הוספת תתי-קטגוריות בצורה דינמית
INSERT INTO "SubCategories" ("categoryId", "name", "createdAt", "updatedAt") 
SELECT c."id", sub."name", NOW(), NOW()
FROM (VALUES 
    ('History', 'World War II'), ('Science', 'Quantum Physics'), ('Technology', 'Artificial Intelligence')
) AS sub("cat_name", "name")
JOIN "Categories" c ON c."name" = sub."cat_name";

דוגמה להגדרות סביבה (.env.example)
זהו המבנה הנדרש עבור קובץ ה-.env שלכם בתוך תיקיית ה-Backend:
# --- SERVER CONFIGURATION ---
PORT=5000
NODE_ENV=development

# --- DATABASE CONFIGURATION (POSTGRES) ---
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=your_secure_password_here
DB_NAME=learning_platform
DB_PORT=5432

# --- AI SERVICE CONFIGURATION ---
OPENAI_API_KEY=your_openai_api_key_here
