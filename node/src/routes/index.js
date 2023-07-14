const userRoute = require('./users');
const siteRoute = require('./site');
const teacherRoute= require('./teachers')
const hocvienRoute = require('./hocviens')
const editCourseRoute = require('./editcourse')
const editteachersRoute= require('./editteachers')
const profileRoute = require('./profiles')
const accountRoute = require('./accounts')
const checkUser = require('../app/middlewares/CheckUser')

function route(app) {
  app.use('/profiles',checkUser.verifyToken,profileRoute);
  app.use('/editcourse',checkUser.verifyToken,editCourseRoute);
  app.use('/hocviens',checkUser.verifyToken,hocvienRoute);
  app.use('/teachers',checkUser.verifyToken,teacherRoute);
  app.use('/editteachers',checkUser.verifyToken,editteachersRoute);
  app.use('/users',checkUser.verifyToken, userRoute);
  app.use('/account',accountRoute);
  app.use('/',checkUser.verifyToken,siteRoute);

  //   app.post('/news', (req, res) => {
  //     console.log(req.body);
  //     res.send('')
  //   })

  //   app.get('/', (req, res) => {
  //     res.render('trangchu')
  //   });
}

module.exports = route;
