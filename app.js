const express = require('express');
const app = new express();
const Credentialdata = require('./src/model/Credentialdata');
const port=process.env.PORT || 3000;


let nav=  []; 

app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');

app.use(express.urlencoded({ extended: true }));

const bookRouter = require('./src/routes/bookRoutes')(nav);

const authorRouter = require('./src/routes/authorRoutes')(nav);

//const loginRouter = require('./src/routes/loginRoute')();

const adminRouter=require('./src/routes/adminRoutes')(nav);
const adminAuthorRouter=require('./src/routes/adminAuthorRoutes')(nav);
const updatebookRouter=require('./src/routes/updatebookRoutes')(nav);
const updateauthorRouter=require('./src/routes/updateauthorRoute')(nav);
const deletebookRouter=require('./src/routes/deleteBookRoute')(nav);
const deleteauthorRouter=require('./src/routes/deleteAuthorRoute')(nav);
const listbookupdateRouter=require('./src/routes/listbookupdateRoute')(nav);
const listauthorupdateRouter=require('./src/routes/listauthorsforupdateRoute')(nav);
const signupRouter=require('./src/routes/signupRoute')();



app.use("/books", bookRouter);
app.use("/authors", authorRouter);
app.use("/addbooks",adminRouter);
app.use("/addauthor",adminAuthorRouter);
///app.use("/login", loginRouter);
app.use("/updatebook",updatebookRouter);
app.use("/updateauthor",updateauthorRouter);
app.use("/deletebook",deletebookRouter);
app.use("/deleteauthor",deleteauthorRouter);
app.use("/signUp",signupRouter);
app.use("/listbookforupdate",listbookupdateRouter);
app.use("/listauthorsforupdate",listauthorupdateRouter);









///------------------------------Login----------------------------------------------------------

  
app.get('/login', function(req, res){
    console.log("inside get");
         res.render('login',{ message: ' ' });
          
 });

 app.post('/login', function(req, res){
      console.log("login entry");
 
   try{
       Credentialdata.find({"username":req.body.userName})
        .then(function (credential) {
            console.log("--------Credential-----"+credential);
            if (credential.length != 0) {

                if(credential[0].username==req.body.userName&&credential[0].password==req.body.password){
                    if(credential[0].username==="admin"){
                         nav.length=0; //empty array


                        nav.push( { link: '/books', name: 'Books' },
                        { link: '/authors', name: 'Authors' },
                        { link: '/addbooks', name: 'Add Books' },
                        { link: '/addauthor', name: 'Add Author'},
                        {link:'/listbookforupdate',name:'Update Book'},
                        {link:'/listauthorsforupdate',name:'Update Author'},
                        { link: '/', name: 'Log Out' });
                        
                        
                        res.render('index', { 
                            nav,
                            title: "Library",
                            img: "admin.png"
                     });
                    }
                    else{
                        nav.length=0; //empty array

                         nav .push(

                            { link: '/books', name: 'Books' },
                            { link: '/authors', name: 'Authors' },
                           
                            { link: '/', name: 'Log Out' }
                         ); 
                        res.render('index', { nav,
                            title: "Library",
                            img: "library.png"
                     });
                        

                    }
                }
            }
            else {
                res.render('login', { message: 'Username doesnot exist...' });
            }
     
        
        
     
  
})
.catch(function (err) {
    res.send(err);

});
   }
   catch(error){

    res.send(error);
   }

});

 
  



///------------------------------End of login---------------------------------------------------


app.get('/index', function (req, res) {
        
    
    res.render("index", {
    nav,
    title: "Library",
    img: "library.png"


});

});


app.get('/', function (req, res) {

res.render('login', { message: ' ' });
});





app.listen(port,()=>{console.log("Server Ready at "+port)});
