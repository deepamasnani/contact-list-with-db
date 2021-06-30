const express = require('express');
const path = require('path');
const port = 8000;

const db = require('./config/mongoose');    
const Contact = require('./models/contact');
const app = express();

app.set('view engine','ejs');
app.set('views',path.join(__dirname , 'views'));
app.use(express.urlencoded());
app.use(express.static('assets'));

app.get('/',function(req,res){

    Contact.find({},function(err,abc){
        if(err){
            console.log("Error in fetchin");
            return;
        }
        else{
            return res.render('home',{
                title: "My Contacts list",
                contacts_list: abc
            });
        }
    })
    
});


app.post('/create-contact',function(req,res){

   Contact.create({
       name: req.body.name,
       phone: req.body.phone
   }, function(err,newContact){
       if(err){
           console.log("Error in creating a contact");
           return;
       }

       console.log('******',newContact);
       return res.redirect('/');
   }) 
   
});

app.get('/delete-contact/',function(req,res){
    //get the id from the query
    let id = req.query.id;

    //find the contact in the database using id and delete it
    
    Contact.findByIdAndDelete(id,function(err){
        if(err){
            console.log("Error in deleting");
            return;
        }
    });
    return res.redirect('/');
    })



app.listen(port,function(err){
    if(err){
        console.log("Error in ",err);
    }
    else{
        console.log("Running on port",port);
    }
});