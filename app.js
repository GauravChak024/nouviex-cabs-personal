require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const express = require('express');
const app = express();

app.use(express.urlencoded({extended: true}))

const connectDB = require('./db/connect');
// const authenticateUser = require('./middleware/authentication');
// routers
const agentRouter = require('./routes/agentRoute');
const affiliateRouter = require('./routes/affiliateRoute');
const tripDetailsRouter = require('./routes/tripDetailsRoute');

app.set('trust proxy', 1);
app.use(express.json());
app.use(helmet());

app.use(cors());
app.use(express.static('./uploadedFiles'))


app.get('/', (req, res) => {
  res.send('First page');
});

// routes
app.use('/cabs/agent', agentRouter);
app.use('/cabs/affiliate', affiliateRouter);
app.use('/cabs/newTrip', tripDetailsRouter);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};


start();