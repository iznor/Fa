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
const dotenv = require("dotenv").config({ path: '.env' });
const port = process.env.PORT || 3000;


app.use(express.json());
const { /*data*/Router } = require("./routers/"/* insert routes*/);
app.use('/api/'/*data*/, /*data*/Router);

app.use(express.urlencoded({ extended: true }));
router.use((req,res,next) =>{
  console.log("/", req.method);
  next();
});

router.get("/", (req,res) => {
  res.json({"message" : "Hello World"});

  // res.status(404).send('Something is broken!');
});



app.listen(port, () => console.log('Express server is running on port', port));