
const express = require('express');
require('dotenv').config();
const cors = require('cors');
const connectDB = require('./configs/db');
const adminRoute = require("./routes/adminRoutes")
const blogRoute = require("./routes/blogRoutes")

const app = express();
connectDB()
const allowedOrigins = [
    'http://localhost:5173',
    "https://quick-blog-rouge.vercel.app"


]
// Middleware
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.send('API is running...');
})
app.use('/api/admin', adminRoute)
app.use('/api/blog', blogRoute)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

module.exports = app; // Export the app for testing purposes