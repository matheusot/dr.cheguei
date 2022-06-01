const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const authRouter = require('./src/routes/auth.route');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/auth', authRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  return;
});

/* Starts Express Server */
app.listen(process.env.PORT || port, 
  () => console.log(`App listening at http://localhost:${port}`)
);