const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname+'/views/partials')
app.set('view engine','hbs');

app.use((req,res,next)=>{
    var now = new Date().toDateString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err)
            console.log('can not append to server.log.');
    });
    next();
});

// app.use((req,res,next)=>{
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname+'/public'));

hbs.registerHelper('getCurrentYear',() => new Date().getFullYear());

hbs.registerHelper('scream',(text) => text.toUpperCase());

app.get('/',(req,res)=>{
    res.render('home.hbs',{
        titlePage: 'Home page',
        welcomeMessage: 'welcome to my website',
        currentYear: new Date().getFullYear()
    });
});

app.get('/about',(req,res)=>{
    res.render('about.hbs',{
        titlePage: 'About page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad',(req,res)=>{
    res.send({
        errorMessage: 'unable to handle request!'
    });
});

app.listen(3000,()=>{
    console.log('Server Started on localhost:3000');
});