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









/*
const test_entry = {
    title: 'Weekend Trip to NYC',
      description: 'Visited the Empire State Building',
      image: 'https://en.wikipedia.org/wiki/Empire_State_Building#/media/File:Empire_State_Building_(aerial_view).jpg',
      rating: 8,
      latitude: 40.748351, 
      longitude: -73.985718,
      dateVisited: Date.now()
}
*/
/*
const test_entry = {
    title: 'Day Trip to Traverse City',
      description: 'Saw the Sleeping Bear Sand Dunes',
      image: 'https://upload.wikimedia.org/wikipedia/commons/3/38/Sleeping_Bear_Dune_Aerial_View.jpg',
      rating: 7,
      latitude: 44.882472,
      longitude:  -86.042127 ,
      dateVisited: Date.now()
}
*/
/*
const test_entry = {
    title: 'Summer Vacation in Europe',
      description: 'Went to the top of the Eiffel Tower, its overrated',
      image: 'https://en.wikipedia.org/wiki/Eiffel_Tower#/media/File:Tour_Eiffel_Wikimedia_Commons_(cropped).jpg',
      rating: 5,
      latitude: 48.8584, 
      longitude:  2.2945,
      dateVisited: Date.now()
}
*/

/*
LocEntry.create(test_entry,(error,result)=>{
    if(error)
        console.log(error)
    else
        console.log(result)
})
*/
