require ('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const {sequelize} = require('./models');
// // Test database connection

const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
const errorHandlerMid = require('./middlewares/errorHandlerMid');

const promptRoutes = require('./routes/promptRoute');
const userRoutes = require('./routes/userRoute');
const categoryRoutes = require('./routes/categoryRoute');
const adminRoutes = require('./routes/adminRoute');


// Middleware

app.use(cors());

app.use(express.json());
// Routes
app.use('/api/prompt', promptRoutes);
app.use('/api/user', userRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/admin', adminRoutes);
// Error handling middleware
app.use(errorHandlerMid);  

//sync db and start
sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log("server is runing");
    });
}).catch((error) => {
    console.error('Unable to sync database:', error);
});



  