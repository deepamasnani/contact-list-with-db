//require the library
const mongoose = require('mongoose');
//connect to db
mongoose.connect('mongodb://localhost/contacts_list_db');
//aquire the conn to check if it is success
var db = mongoose.connection;
//check error
db.on('error',console.error.bind(console,'error in conn'));
//no error
db.once('open',function(){
    console.log("successfully connected");
})