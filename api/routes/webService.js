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

router.get("/checkUsername", function(req, res, next){
    var username = req.query.username;

    var sql = "SELECT COUNT(Username) AS UserExists FROM Users WHERE username = ?";
    db.query(sql,[username], function(err, data){
        (err) ? res.send(err) : res.send(JSON.stringify({UserExists: data[0].UserExists}))
    });
});

router.post("/register", function(req,res,next){
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;

    var values = [[username, password, email, firstName, lastName]];

    console.log(values);

    var sql = "INSERT INTO Users(Username, Password, Email, FirstName, LastName) VALUES ?";
    db.query(sql,[values], function(err,data){
        (err) ? res.send(err) : res.send(JSON.stringify({Registered: 1}))
    });
});

//references: https://www.sitepoint.com/using-node-mysql-javascript-client/
/*
    With using stored procedures, in order to only get the query results,
    we have to use data[0] to not include the object array of 
    {"fieldCount":0,"affectedRows":0,"insertId":0,"serverStatus":2,"warningCount":0,"message":"","protocol41":true,"changedRows":0}
*/
router.get("/getProjects", function(req, res, next){
    var userID = req.query.userID;

    var sql = "CALL GetProjects(?)";
    db.query(sql,[userID], function(err,data){
        (err) ? res.send(err) : res.send(JSON.stringify({projects: data[0]}));
    });
});

router.get("/getTasks", function(req, res, next){
    var ProjectID = req.query.projectID;

    var sql = "CALL GetTasks(?)";
    db.query(sql, [ProjectID], function(err,data){
        (err) ? res.send(err) : res.send(JSON.stringify({tasks: data[0]}));
    });
});
module.exports = router;