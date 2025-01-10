const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors')
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true,})
  .then(() => console.log(`MongoDB is connected at port ${PORT}`))
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1); // Exit the process with failure code
  });

  const nosql = require('./model/model')(mongoose);
  app.use((req, res, next) => {
    req.nosql = nosql; // Attach models object to req
    next();
  });

  // require('./model/model')(mongoose);
  // app.use((req, res, next) => {
  //   req.nosql = mongoose; // Attach models object to req
  //   global.nosql = req.nosql;
  //   next();
  // });
  

// Import routes
// const indexRouter = require('./routes/index');
// const usersRouter = require('./routes/users');
const teacherRouter = require('./routes/teacher');

// Setup routes
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/teacher', teacherRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
