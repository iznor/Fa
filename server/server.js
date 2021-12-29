/***********************************Fa - EXPRESS SERVER*******************************************/
/* Created By: Ido Dor, Ohad Baehr, Bader Daka
/* SERVER TO-DO: 
/*    1) Add routes
/*    2) Update JSON files
/*    3) Crete CRUD functions (POST, GET, PUT, DELETE) on each controller - use POSTMAN to test
/*************************************************************************************************/
const express = require("express");
const app = express();
const router = express.Router();
// const dotenv = require("dotenv").config({ path: '.env' });
const { infologger, errorlogger } = require("./logs/logs");
const port = process.env.PORT || 3000;
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header('Access-Control-Allow-Headers', "*");
  // res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.set('Content-Type', 'application/json; charset=utf-8');
  next();
});
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
const { scraperRouter } = require("./routers/scraperRouter");
const { artistRouter } = require("./routers/artistRouter");
const { genreRouter } = require("./routers/genreRouter");
const { songRouter } = require("./routers/songRouter");
const { widgetRouter } = require("./routers/widgetRouter");

app.use('/api/scraper', scraperRouter);
app.use('/api/artists', artistRouter);
app.use('/api/genres', genreRouter);
app.use('/api/songs', songRouter);
app.use('/api/widget', widgetRouter);

// app.use('/api/'/*data*/, /*data*/Router);
// router.use((req, res, next) => {
//   console.log("/", req.method);
//   next();
// });
app.use((req, res) => {
  errorlogger.error(`Bad Methode Request!:${req.method} ${req.url}`);
  res.status(400).send('Bad Methode Request!');
});

app.listen(port, () => {
  infologger.info(`Express server is running on port ${port}`);
});