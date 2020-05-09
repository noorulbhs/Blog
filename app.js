
const express=require("express");
const bodyParser=require("body-parser");
const _=require("lodash");
const mongoose=require("mongoose");
const app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/blog",{useUnifiedTopology:true});

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// const input=[];
let title;

const blogSchema=new mongoose.Schema({
  title:String,
  body:String
})

const Blog=mongoose.model("Blog",blogSchema);

app.get("/",function(req,res){
  Blog.find(function(err,founditem){
    if(!err){
        res.render("home",{home:homeStartingContent,list:founditem});
      }
    })
});

app.get("/About",function(req,res){
  res.render("about",{about:aboutContent});
});

app.get("/Contact",function(req,res){
  res.render("contact",{contact:contactContent});
});

app.get("/Compose",function(req,res){
  res.render("compose");
});

app.post("/Compose",function(req,res){
  const bl=new Blog({
    title:req.body.postTitle,
    body:req.body.postBody
  })
  bl.save();
 // input.push(formInput);
res.redirect("/");
});

app.get("/posts/:title",function(req,res){
  title=req.params.title;
      Blog.find(function(err,founditem){
        if(!err){
          for(let i=0;i<founditem.length;i++){
            console.log(founditem.title);
            if(_.lowerCase(title) === _.lowerCase(founditem[i].title)){
              res.render("post",{title:founditem[i].title,body:founditem[i].body});
          }
        }
      // res.render("posts",{title:input[i].title,body:input[i].body});
    }
  })
})

app.listen(3000,function(){
  console.log("Server has started");
});
