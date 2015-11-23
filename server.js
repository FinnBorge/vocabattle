var mongoose = require('mongoose'),
    server = require('./lib/createserver')(),
    MONGOURI = process.env.MONGOLAB_URI || "mongodb://localhost:27017",
    DBNAME = "vocabattle",
    PORT = process.env.PORT || 3000;

  /* set controllers */
  // var articleRouter = require('./controllers/article.js');
  // server.use('/article', articleRouter);
  //
  // var userRouter = require('./controllers/user.js');
  // server.use('/user', userRouter);

  server.get('/', function(req, res, next){
  res.redirect(302, '/article/index');
  });

mongoose.connect(MONGOURI + "/" + DBNAME);
server.listen(PORT, function(){
  console.log("SERVER IS UP ON PORT:" + PORT);
});
