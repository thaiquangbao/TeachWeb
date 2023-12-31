const express = require('express');
const path = require('path');
const app = express();
const port = 11000;
const morgan = require('morgan');
const { engine } = require('express-handlebars');
const SortMiddleware = require('./node/src/app/middlewares/SortMiddleware')
const route = require('./node/src/routes');
const db = require('./node/src/config/db');
const methodOverride = require('method-override')
const dotenv = require('dotenv')
const cors = require('cors');
var cookieParser = require('cookie-parser')

app.use(cors({
  credentials: true,
  origin: ['http://localhost:6000']
}));
app.use(cookieParser())
// HTTP logger
app.use(morgan('combined'));
//template engine
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers: require('./node/src/helpers/handlebar')
  }) 
);

app.use(
  express.urlencoded({
    extended: true,
  }));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(SortMiddleware)

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'node/src/resources/views'));





app.use(express.static(path.join(__dirname, 'node/src/public')));
dotenv.config()
route(app);
db.connect();

// app.get('/middle', 
//   function (req,res,next) {
//       if(['vethuong','vevip'].includes(req.query.ve))
//       {
//         req.face = '.....';
//         return next();
//       }
//       res.status(403).json({
//         message: "Access denied"
//       });
//   },
//   function (req,res,next){
//     res.json({
//       message: "Vào thành công",
//       face : req.face
//     })
//   }
//   ),

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
