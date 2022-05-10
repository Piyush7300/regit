const express = require("express");
const path = require("path");
const parser = require("body-parser")
const app = express();
const port = process.env.PORT ||300;
require("../db/conn");
const hbs = require("hbs");
const async = require("hbs/lib/async");

const pathstatic = path.join(__dirname,"../public")
const viewspath = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials")


app.use(express.static(pathstatic));
app.set("view engine", "hbs")
app.set("views",viewspath);
hbs.registerPartials(partials_path );

app.get("/",(req,res)=>{
res.render("index.hbs")
})
app.get("/login",(req,res)=>{
    res.render("login.hbs")
    })
app.get("/registration",(req,res)=>{
    res.render("registration.hbs")
 })

 //create a new user 
 app.post("/register",async(req,res)=>{
     try{
         const password = req.body.password;
         const cpassword = req.body.confirmpassword;
         if(password===cpassword){
             const registeremp = new Register({
                 firstname: req.body.firstname,
                 lastname: req.body.lastname,
                 email: req.body.email,
                 gender:req.body.gender,
                 phone: req.body.phone,
                 age: req.body.age,
                 password:password,
                 confirmpassword:cpassword
             })
             const register = await registeremp.save();
             res.status(201).render("index");
         }else{
             res.send("password are not same");
         } 
        }
        catch (error){
            res.status(400).send(error);
        }
     
 });


 //app login

app.post("/login",async(req,res)=>{
     try {
         const pi = req.body;
         console.log(pi);
         const email =  await req.body.email;
         const password =await req.body.password;
         console.log(`${email}and ${password}`) 


         
     } catch (error) {
         res.status(400).send(`${error}`);
         console.log(error);
         
     }
 })


app.listen(port,()=>{
    console.log(`server listen on the port : ${port}`)
})