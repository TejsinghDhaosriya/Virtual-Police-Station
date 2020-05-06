var express = require('express');
var app = express();
var { parse }=require('node-html-parser');
var fs = require('fs');
var pdf = require('html-pdf');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })
var htmlFileToBeChanged ;
// sql stuff
const mysql= require('mysql');

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'wrong-password',
    database:'testDb',
    insecureAuth:'true'
});

app.use(bodyParser.json())

app.get('/', function (req, res) {
    res.send('Its backend for the app, see the documentation for more details');
})

var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
})

app.post('/confirmFIR',urlencodedParser,function(req,res){
    let html = fs.readFileSync('./fir.html', 'utf8');
    let options = { format: 'Letter' };
    let name=req.body.name;
    // let email=req.body.email;
    console.log(" name is "+name);
    htmlFileToBeChanged = parse(html);
    //
    // // setting feilds in html
    htmlFileToBeChanged.querySelector("#person_name").setAttribute('placeholder',name);
    // htmlFileToBeChanged.querySelector('#exampleInputEmail').setAttribute('placeholder',email);
    res.send("confirm fir");
    res.send(htmlFileToBeChanged.toString());
})

app.post('/generateFIR',urlencodedParser,function(req,res){
    let html = fs.readFileSync('./fir1.html', 'utf8');
    let options = { format: 'Letter' };

    let name = req.body.name;
    let address = req.body.address;
    let mobile = req.body.mobile;
    let email = req.body.email;
    let date = req.body.date;
    let police_station_name = req.body.police_station_name;
    let police_station_address = req.body.police_station_address;
    let police_station_pin = req.body.police_station_pin;
    let subject = req.body.subject;
    let applicant_name = req.body.applicant_name;
    let incident = req.body.incident;

    htmlFileToBeChanged = parse(html);
    htmlFileToBeChanged.querySelector("#person_name").setAttribute('value',name);
    htmlFileToBeChanged.querySelector("#person_address").setAttribute('value',address);
    htmlFileToBeChanged.querySelector("#person_mobile_no").setAttribute('value',mobile);
    htmlFileToBeChanged.querySelector("#person_email_id").setAttribute('value',email);
    htmlFileToBeChanged.querySelector("#date").setAttribute('value',date);
    htmlFileToBeChanged.querySelector("#subject").setAttribute('value', subject);
    htmlFileToBeChanged.querySelector("#incident").setAttribute('value',incident);
    htmlFileToBeChanged.querySelector("#police_station_name").setAttribute('value',police_station_name);
    htmlFileToBeChanged.querySelector("#police_station_address").setAttribute('value',police_station_address);
    htmlFileToBeChanged.querySelector("#police_station_pin").setAttribute('value',police_station_pin);
    htmlFileToBeChanged.querySelector("#applicant_name").setAttribute('value',applicant_name);

    console.log("name is " + req.body.name);

    pdf.create(htmlFileToBeChanged.toString(), options).toFile('./pdfForm.pdf', function(err, res) {
        if (err)
            return console.log(err);
        else{
            console.log(res);
        }
    });
    // res.send(htmlFileToBeChanged.toString());
    res.send(req.body);
});

app.get('/getAll',function(request, response){
    const select_all_command="select * from user";
    connection.query(select_all_command,(err,results)=>{
        if(err){
            return response.send(err);
        }
        else{
            return response.json({data:results})
        }
    })
});

app.post('/signUp',function(request,response){
    // first name, last name, email and mobile number and addhar
    const {firstName,lastName,email,mobileNumber,aadhar} =request.body;
    postParams="\""+firstName+"\", \""+lastName+"\", \""+email+"\", \""+mobileNumber+"\", \""+aadhar+"\"";
    const insert_query="Insert into user (firstName, lastName, email, mobileNumber, aadhar) values ("+ postParams+")";
    console.log("query command is "+insert_query);
    connection.query(insert_query,(error,results)=>{
        if(error){
            return response.send(error);
        }else{
            return response.json({data:request.body});
        }
    });
    // response.json({data:"some message "});
})
