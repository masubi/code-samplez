var express = require('express');
var app = express();

var pg = require('pg');

var genQueryParamMap = function(request){
  var queryParamMap = {
    "max_discharges":undefined,
    "min_discharges":undefined,
    "max_average_covered_charges":undefined,
    "min_average_covered_charges":undefined,
    "min_average_medicare_payments":undefined,
    "max_average_medicare_payments":undefined,
    "state":undefined
  };
  for(key in queryParamMap){
    if(request.query[key]){
      queryParamMap[key]=request.query[key]
    }else{
      console.error("missing key: "+key+" in query param");
    }
  }
  return queryParamMap;
};

var genDbQry = function(qryParamMap){
  var prefix = "SELECT * FROM health_data where ";
  var and = " AND ";
  var suffix = ";";

  var dischargeCond = "total_discharges>"+ qryParamMap["min_discharges"] +" AND total_discharges<"+qryParamMap["max_discharges"];

  var coveredCharges = "Average_Covered_Charges > '"+ qryParamMap["min_average_covered_charges"] +"' AND Average_Covered_Charges <'"+qryParamMap["max_average_covered_charges"]+"'";

  var medicarePayments = "Average_Medicare_Payments > '"+ qryParamMap["min_average_medicare_payments"] +"' AND Average_Medicare_Payments <'"+qryParamMap["max_average_medicare_payments"]+"'";

  var state = "Provider_State='"+qryParamMap["state"]+"'"

  var qryRes = prefix+
  dischargeCond+and+
  coveredCharges+and+
  medicarePayments+and+
  state+
  suffix;

  console.log(qryRes);
  return qryRes;
};

//GET http://localhost:5000/providers?max_discharges=12&min_discharges=6&max_average_covered_charges=50000.00&min_average_covered_charges=10000.00&min_average_medicare_payments=6000&max_average_medicare_payments=7000&state=WA
app.get('/providers', function (request, response) {
  var qpMap = genQueryParamMap(request);
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    var queryStr = genDbQry(qpMap);
    console.log("using queryStr='"+queryStr+"'");
    client.query(queryStr, function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       {
         //console.log(result.rows);
         //response.render('pages/db', {results: result.rows} );
           response.setHeader('Content-Type', 'application/json');
           response.send(JSON.stringify(result.rows, null, '  '));
       }
    });
  });
});

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
