const { logErrors, errorHandler } = require('./middlewares/error.handler');
const express = require('express');
const routerApi = require('./routes');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whiteList = ['http://localhost:8080', 'https://myapp.co'];
const options = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

app.get('/api', (req, res) => {
  res.send('Hello World');
});

// app.get('/new-route', (req, res) => {
//   res.send('This is a new route');
// });

// app.get('/');

routerApi(app);
app.use(logErrors);
app.use(errorHandler);
app.use(cors(options));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
