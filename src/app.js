require('dotenv').config()
const express = require('express') //imports express
const fs = require('fs') //imports file system functions
const path =require('path') //imports path utils
const hbs=require('hbs') //imports handlebars
//add other imports here
const mongoose = require('mongoose')
const LocEntry = require('./models/LocEntry');

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false
})


const app = express(); //creates express application and returns an object
const port=process.env.PORT; //selects the port to be used
app.listen(port) // starts listening for client requests on specified port
app.use(express.json());

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
app.use(express.static('./public')) //points to static resources like css, client side js etc.
app.set('view engine','hbs') //tells express top use handlebars templating engine
app.set('views',viewsPath) //sets the apps view directory to the viewsPath defined above
hbs.registerPartials(partialsPath)//registers the partials for the app

let entries=[]


/* GET index listing. */

app.get('/', (req, res)=> {
    res.render('index',{title :'My Travel Diary!'})
    
});

app.get('/entry', (req, res)=> {
    LocEntry.find({},(error,result)=>{
        if (error)
            console.log(error)
        else{
            
            entries=result
            console.log(entries)
            res.send(entries)
        }
    })
    
});

/* POST users listing. */
app.post('/entry', (req, res)=> {
    console.log(req.body)
    const entry = req.body
    LocEntry.create(entry,(error,result)=>{
        if(error){
            console.log(error)
            res.send('ERROR INSERTING ENTRY!!!')
        }
            
        else{
            console.log(result)
            res.send(entry)
        }
            
    })
    
});

/* GET 404 listing. */
app.get('*', (req, res)=> {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.write('Page does not exist')
        res.end()
});









