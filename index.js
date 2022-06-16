const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

const sessionRouter = require('./src/routes/session.route');
const userRouter = require('./src/routes/user.route');
const appointmentsRouter = require('./src/routes/appointments.routes');

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/session', sessionRouter);
app.use('/user', userRouter);
app.use('/appointment', appointmentsRouter);

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