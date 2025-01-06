const { logErrors, errorHandler } = require('./middlewares/error.handler');
const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

// app.get('/new-route', (req, res) => {
//   res.send('This is a new route');
// });

// app.get('/');

routerApi(app);
app.use(logErrors);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
