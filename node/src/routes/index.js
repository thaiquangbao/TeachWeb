const userRoute = require('./users');
const siteRoute = require('./site');
const teacherRoute= require('./teachers')
const hocvienRoute = require('./hocviens')
const editCourseRoute = require('./editcourse')
const editteachersRoute= require('./editteachers')
function route(app) {
  app.use('/editcourse',editCourseRoute);
  app.use('/hocviens',hocvienRoute);
  app.use('/teachers',teacherRoute);
  app.use('/editteachers',editteachersRoute);
  app.use('/users', userRoute);
  app.use('/', siteRoute);

  //   app.post('/news', (req, res) => {
  //     console.log(req.body);
  //     res.send('')
  //   })

  //   app.get('/', (req, res) => {
  //     res.render('trangchu')
  //   });
}

module.exports = route;
