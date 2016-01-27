var promise  = require('promise');
var options = {
    promiseLib: promise // overriding the default (ES6 Promise);
};

var pgp = require('pg-promise')(options);

var cn = "postgres://ygrplbehjbnwql:3LkE8j7RkmPUihq6aV2IE7eWbI@ec2-54-225-192-128.compute-1.amazonaws.com:5432/d3cu4huiao9qrr?ssl=true";
var db = pgp(cn);

var qrm = pgp.queryResult;

exports.GetAll =  function(req, res, next){
	var results = [];
	var query = "SELECT * FROM public.tbl_entry order by date desc";
	db.many(query, results)
	.then(function(results){
		console.log(results);
		return res.json(results);
	})
	.catch(function(error){
		console.log(error);
	});
};

exports.GetEntryById = function(req, res, next){
	var results = [];

	db.oneOrNone("SELECT * FROM public.tbl_entry where id =${id}",{ id: req.params.id }, results)
	.then(function(results){
		console.log(results);
		return res.json(results);
	})
	.catch(function(error){
		console.log(error);
	});
};

exports.GetEntriesByDateRange = function(req, res, next){
//http://localhost:3000/GetEntriesByDateRange/2015-12-01,2015-12-02
	var results = [];
	var dateRange = req.params.range.split(',');
/*SELECT 
id,
amt,
date,
description,
category,
"timestamp"
FROM 
public.tbl_entry 
WHERE
date >= '2015-12-01'
AND date <  '2015-12-31'
*/
	var whereParams = { 
						dateStart: dateRange[0],  
						dateEnd: dateRange[1],  
						}
	db.manyOrNone("SELECT * FROM public.tbl_entry 	\
		    WHERE date >=${dateStart}		\
			AND	   date <=${dateEnd}		", whereParams, results)
	
	.then(function(results){
		console.log(results);
		return res.json(results);
	})
	.catch(function(error){
		console.log(error);
	});
};

exports.AddEntry =  function(req, res){
	//http://localhost:3000/AddEntry
	/*
INSERT INTO 
public.tbl_entry
(
	amt,
	date,
	description,
	category,
	"timestamp"
)
VALUES (
	36,
	'2015-12-01',
	'dosa ferment',
	'RAT',
	'12/30/2015 4:44:01 PM'
);
	*/
	var insertParams = {
		amt : req.body.amt,
		date : req.body.date,
		description : req.body.description,
		category : req.body.category,
		timestamp : "now",
	};
	
	
	var results = [];

	db.oneOrNone("INSERT INTO public.tbl_entry(	amt, date, description,	category, \"timestamp\")	\
					VALUES (	${amt},	${date}, ${description}, ${category}, ${timestamp})",insertParams, results)
	.then(function(results){
		console.log(results);
		return res.send('SUCCESS: Desc[' + req.body.description +'] Amt [' +req.body.amt + ']');
	})
	.catch(function(error){
		console.log(error);
	});
}

exports.UpdateEntry = function(req,res){
	//http://localhost:3000/UpdEntry/138
	/*UPDATE 
	  public.tbl_entry 
	SET 
	  amt = ?amt,
	  date = ?date,
	  description = ?description,
	  category = ?category,
	  "timestamp" = ?timestamp
	WHERE 
	  id = ?id
	;
	*/
	var results = [];
	var updParams = {
		id : req.params.id,
		amt : req.body.amt,
		date : req.body.date,
		description : req.body.description,
		category : req.body.category,
		timestamp : "now",
	};
		
	console.log(updParams);
	console.log(req.body);
	
	db.oneOrNone("UPDATE public.tbl_entry SET amt = ${amt}, date = ${date}, description = ${description}, category = ${category}, \"timestamp\" = ${timestamp} WHERE id = ${id}",updParams, results)
	.then(function(results){
		console.log('Sucessfully updated');
		return res.json(results);
	})
	.catch(function(error){
		console.log(error);
	});
}

exports.DeleteEntry = function(req,res){
	//http://localhost:3000/DelEntry/138
	var results = [];

	db.oneOrNone("DELETE FROM public.tbl_entry where id =${id}",{ id: req.params.id }, results)
	.then(function(results){
		console.log('Deletion completed');
		return res.json(results);
	})
	.catch(function(error){
		console.log(error);
	});
};	

