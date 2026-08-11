const express = require("express");
const app = express();
const port = 3000;
const path=require("path");
const { v4 : uuidv4 } = require("uuid");
const methodOverride = require("method-override");

app.use(methodOverride('_method')) ;
app.set("view engine","ejs");
app.set("views" , path.join(__dirname ,"views"));

app.use(express.urlencoded({extended: true }));

app.use(express.static( path.join(__dirname,"public")));

let posts =[
    {
        id: uuidv4(),
        username: "sahil",
        content: "Hardork always pays off"
    },
 
     {
        id:uuidv4(),
        username: "getting.insane",
        content: "Always be  Consistent"
    },

     {
        id : uuidv4(),
        username: "Sahil__ll",
        content: "Got the job ,10lpa"
    },

];


app.get("/posts" ,(req,res) =>{
    res.render("index.ejs",{posts});
});
app.get("/posts/new",(req,res) =>{
    res.render("new.ejs");
   
})
app.post("/posts" ,(req,res) => {
    let id=uuidv4();
 let {username , content,}=req.body;
 posts.push({username,content,id});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res) =>{
    let { id }=req.params;
     let post = posts.find((p) => id===p.id);
    res.render("detail.ejs",{post});
   
});

app.patch("/posts/:id" , (req,res) =>{ //update route
     let {id}= req.params;
     let newcontent = req.body.content;
       let post = posts.find((p) => id===p.id);     
     post.content = newcontent;
     console.log(post);
     res.redirect("/posts");


});
app.get("/posts/:id/edit",(req,res)=>{
         let {id}= req.params;
        let post = posts.find((p) => id===p.id);
 
    res.render("edit.ejs",{post});

  
});

app.delete("/posts/:id",(req,res)=>{
     let {id}= req.params;
      posts = posts.filter((p) => id!==p.id);
           res.redirect("/posts"); 

});

app.listen(port , (req,res) =>{
    console.log(`listening at ${port}`);
});
