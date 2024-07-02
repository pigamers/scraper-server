const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const companyRoutes = require('./routes/companies');

const app = express();
const PORT = process.env.PORT || 8000;
const MONGO_URI = 'your_mongo_connection_string';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

app.use('/api/companies', companyRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
