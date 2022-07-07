const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors')
const port = 4000;

const sessionRouter = require('./src/routes/session.route');
const userRouter = require('./src/routes/user.route');
const appointmentsRouter = require('./src/routes/appointment.route');
const checkinRouter = require('./src/routes/checkin.route');

app.use(cors());
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
app.use('/checkin', checkinRouter);

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