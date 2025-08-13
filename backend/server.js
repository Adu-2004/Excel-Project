const express = require('express');
const bodyParse = require('body-parser');
const cors = require('cors');
const { connectDB } = require("./models/db.js");
require('dotenv').config();
const authRoutes = require('./routes/authRoutes.js');

const uploadRoutes = require('./routes/uploadRoutes.js');
const historyRouter = require('./routes/history');
const adminRoutes = require('./routes/adminRoutes.js')


const app = express();
const PORT = process.env.PORT || 3000;

/*app.get('/home', (req, res) => {
    res.send('Hello Friends:)');
}); */

app.use(bodyParse.json());
app.use(cors());
app.use('/auth',authRoutes);
app.use('/api/admin', adminRoutes);

app.use('/api',uploadRoutes);
app.use('/history', historyRouter);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on ${PORT}`)
});
