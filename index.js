// 1. import express

const express = require('express')

  // import jsonwebtoken
  const jwt = require('jsonwebtoken')
  
  // import cors
  const cors = require('cors') 


// import dataService

const dataService = require('./services/data.service')

// 2. server app create using express

const app = express()

// cors use in server app

app.use(cors({
   origin:'http://localhost:4200'
}))

// parse .JSON data

app.use(express.json())

//application specific middleware
const appMiddleware = (req,res,next)=>
{
   console.log("application specific middleware");
   next()
}

// use middleware

app.use(appMiddleware)

//bank server

const jwtMiddleware = (req,res,next) => 
{
   // fetch token
   try {token = req.headers['x-access-token']
   // verify token
   const data = jwt.verify(token,'supersecretkey12345')
   // console.log(data);
   next()
   }
   catch
   {
      res.status(401).json({
         status:false,
         statusCode:401,
         message:"Please Log In"
      })
   }
}




//register API
app.post('/register',(req,res)=>{
//register solving - asynchronous
const result = dataService.register(req.body.username,req.body.acno,req.body.password)  
   .then(result=>{
      res.status(result.statusCode).json(result)
   })
})

//login API
app.post('/login',(req,res)=>{
   //login solving - asynchronous
   dataService.login(req.body.acno,req.body.pswd)  
   .then(result=>{
      res.status(result.statusCode).json(result)
   })
   })


   //deposit API - asynchronous
app.post('/deposit',jwtMiddleware, (req,res)=>{
   //login solving
   dataService.deposit(req.body.acno,req.body.password,req.body.amt)  
   .then(result=>{
      res.status(result.statusCode).json(result)
   })
   })

   //withdraw API - asynchronous
   app.post('/withdraw',jwtMiddleware, (req,res)=>{
      //login solving
      dataService.withdraw(req.body.acno,req.body.password,req.body.amt)  
      .then(result=>{
         res.status(result.statusCode).json(result)
      })
      })

   //transaction API - asynchronous
   app.post('/transaction',jwtMiddleware, (req,res)=>{
      //login solving
      dataService.getTransaction(req.body.acno)  
      .then(result=>{
         res.status(result.statusCode).json(result)
      })
      })







// user request resolving

// GET REQUEST - to fetch data

app.get('/',(req,res)=>
{
   res.send("GET Request")
})

// POST REQUEST - to create data

app.post('/',(req,res)=>
{
   res.send("POST Request")
})

// PUT REQUEST - to modify entire data

app.put('/',(req,res)=>
{
   res.send("PUT Request")
})

// PATCH REQUEST - to modify partially

app.patch('/',(req,res)=>
{
   res.send("PATCH Request")
})

// DELETE REQUEST - to delete data

app.delete('/',(req,res)=>
{
   res.send("DELETE Request")
})


// 3. set up port number to the server app

app.listen(3000,()=>
{
    console.log("server started at 3000");
})
