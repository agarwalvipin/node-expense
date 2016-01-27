var express = require('express');
var router = express.Router();

var getExpense = require('./getExpense');
var path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Hey', message: 'Hello there!'});
	res.sendFile(path.join(__dirname+'./../main.html'));
});

router.get('/test', function(req, res, next) {
  res.render('testform');
});

router.get('/expense', function(req, res, next) {
  res.render('expenseform');
});

router.get('/viewexpenses', function(req, res, next) {
  //var results = getExpense.GetAll();
  //res.render('viewexpenses', {'entryList' : getExpense.GetAll()});
  res.render('viewexpenses');
});

router.get('/GetAll', getExpense.GetAll);

router.get('/GetEntryById/:id', getExpense.GetEntryById);

router.get('/GetEntriesByDateRange/:range', getExpense.GetEntriesByDateRange);

router.post('/AddEntry', getExpense.AddEntry);

router.put('/UpdEntry/:id', getExpense.UpdateEntry);

router.delete('/DelEntry/:id', getExpense.DeleteEntry);

module.exports = router;
