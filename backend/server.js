const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require("./models/db.js");
require('dotenv').config();
const authRoutes = require('./routes/authRoutes.js');
const uploadRoutes = require('./routes/uploadRoutes.js');
const { DeleteFile,
  Uploadfile,
  GetFiles} = require('./routes/historyRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api', uploadRoutes);

// Mount historyRouter at /api/uploads
app.use('/api/history', DeleteFile,
  Uploadfile,
  GetFiles);

app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server is running on port ${PORT}`);
});
