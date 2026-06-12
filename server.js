require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/recipes', require('./src/routes/recipes'));
app.use('/api/recipes', require('./src/routes/reviews'));
app.use('/api/categories', require('./src/routes/categories'));
app.use('/api/users', require('./src/routes/users'));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
