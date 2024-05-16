var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const http = require("http");
const mongo = require("mongoose");
const bodyParser = require("body-parser");
const mongoconnect = require("./config/dbconnection.json");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var joueurRouter = require("./routes/joueur");

mongo
  .connect(mongoconnect.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongo connecter"))
  .catch((err) => console.log(err));

var app = express();
const server = http.createServer(app);
const {
  addpartiesocket,
  affichesocket,
} = require("./controller/JoueurController");
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const io = require("socket.io")(server);
io.on("connection", async (socket) => {
  console.log("user connected");
  socket.emit("msg", "user is connected");
  
  socket.on("partie", (data) => {
    addpartiesocket(data);
    io.emit("partie", data);
  });



  socket.on("aff", async (data) => {
    const r = await affichesocket(data);
    console.log("jjjjjj", JSON.stringify(r));
    io.emit("aff", r);
  });

  socket.on("typing", (data) => {
    io.emit("typing", data + "is typing");
  });


  socket.on("disconnect", () => {
    console.log("user disconnect");
    io.emit("msg", "user disconnect");
  });
});
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/joueur', joueurRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "twig");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
server.listen(3001, console.log("server run"));

module.exports = app;