const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const port = 3000;
var db = require(path.join(__dirname + '/database/database.js'));

app.use("/scripts", express.static('./scripts/'));

router.get('/', function(req,res){
  res.sendFile(path.join(__dirname + '/index.html'));  
});

router.get('/add_personnel_department_system', function(req,res){
  var personal_affairs = req.query.personal_affairs;
  var photo = req.query.photo;
  db.di.add_personnel_department_system(personal_affairs, photo).then(() => {
    res.redirect('/');
  });
});
router.get('/add_register_of_entries_in_the_workbook', function(req,res){
  var number = req.query.number;
  var date = req.query.date;
  var work_place = req.query.work_place;
  var personnel_department_system_id = parseInt(req.query.personnel_department_system_id , 10);
  db.di.add_register_of_entries_in_the_workbook(number, date, work_place, personnel_department_system_id).then(() => {
    res.redirect('/');
  });
});

router.get('/get_personnel_department_system', function(req,res){
  db.di.get_personnel_department_system().then((sub) => {
    res.json(sub);
  })
});

router.get('/delete_personnel_department_system', function(req,res){
  var id = parseInt(req.query.id, 10);
  db.di.delete_personnel_department_system(id).then(() => {
    res.redirect('/');
  });
});

router.get('/get_register_of_entries_in_the_workbook', function(req,res){
  var id = parseInt(req.query.id, 10);
  db.di.get_register_of_entries_in_the_workbook(id).then((sub) => {
    res.json(sub);
  })
});

app.use('/', router);
app.listen(process.env.port || port);

console.log('Running at Port' + port);
