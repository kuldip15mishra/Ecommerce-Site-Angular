import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as express from 'express';
import * as morgan from 'morgan';
import * as mongoose from 'mongoose';
import * as path from 'path';
let session = require('express-session');
import setRoutes from './routes';
let compression = require('compression');
const app = express();
app.use(compression());
dotenv.load({ path: '.env' });
app.set('port', (process.env.PORT || 4100));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET || 'materialshop-secret'
}));
let passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());


//mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/salientink-dev', { useMongoClient: true });
mongoose.connect(process.env.MONGODB_URI || 'mongodb://kuldip:pidluk151@ds039331.mlab.com:39331/salientink-dev' ,{ useMongoClient: true });

const db = mongoose.connection;
(<any>mongoose).Promise = global.Promise;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
  require('./seed'); // Seed database with some sample data
  setRoutes(app);

  app.listen(app.get('port'), () => {
    console.log('SalientInk listening on port ' + app.get('port'));
  });

});

export { app };
