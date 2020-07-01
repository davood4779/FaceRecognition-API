const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : '4779',
    database : 'smartbrain'
  }
}); 


const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/' , (req , res) =>{ res.send(database.users) })
app.post('/signin' , signin.handleSignin(db , bcrypt)) //Advanced way (some changes in signin.js => call  (req , res) function after we call handleSign function)
app.post('/register' , register.handleRegister(db , bcrypt , saltRounds))
app.get('/profile/:id' , profile.handleProfileGet(db))
app.post('/imageurl' , (req , res) => { image.handleApiCall(req , res) }) 
app.put('/image' , (req , res) => { image.handleImage(req , res , db) }) //Common way (just call handleImage function )


app.listen(process.env.PORT || 3000 , ()=>{
  console.log(`app is running on port ${process.env.PORT}`)
}) 



/*
/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT = user
*/

//My profile end point
// app.get('/profile/:id' , (req , res)=>{
//   const { id } = req.params;
//   const foundUser = database.users.filter((user)=>{
//     return user.id === id
//   })
//   if(foundUser.length){
//     res.json(foundUser[0])
//   }else{
//     res.status(404).json('no such user')
//   }
// })



//My image end point
// app.get('/image' , (req , res)=>{
//   const { id } = req.body;
//   const foundUser = database.users.filter((user)=>{
//     return user.id === id
//   })
//   if(foundUser.length){
//     foundUser[0].entries++;
//     res.json(foundUser[0].entries)
//   }else{
//     res.status(404).json('no such user')
//   }
// })