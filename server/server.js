const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;
require('dotenv').config();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../build/')));

// serve html
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../client/index.html'));
});
// catch all
app.use('*', (req, res) => {
  res.status(404).send('Page Not Found');
});
// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}...`);
});
