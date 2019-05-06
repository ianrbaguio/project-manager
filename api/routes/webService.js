var express = require('express');
var router = express.Router();
const mysql = require('mysql');
var app = express();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "iTsuna10",
    database: "ProjectManager"
});

db.connect((err) => {
    if(err){
        throw err;
    }

    console.log("Database connected!");
});

//reference: https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
// app.use(bodyParser.urlencoded({
//     extended: true
// }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

router.post("/login", function(req, res, next){
    var body = req.body;
    var username = req.body.username;
    var password = req.body.password;
    console.log(body);
    console.log("username: " + username + " password: " + password);
    var sql = "SELECT UserID, Username, FirstName, LastName FROM Users WHERE username = ? AND password = ?"
    db.query(sql,[username, password], function(err, data){
        (err)?res.send(err):res.send(JSON.stringify({user:data}));
    });
});
module.exports = router;