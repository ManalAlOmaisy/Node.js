const express = require('express')
const fs = require('fs');
const path = require('path')
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}))
 

// YOUR CODE GOES IN HERE
app.post('/blogs',(req, res)=> {
if(!req.body.title || !req.body.content){
  return res.status(400).json({msg: 'Please include a title and content'})
}
else
{
  let newBlog = {
    title: req.body.title,
    content: req.body.content
  }
  fs.writeFileSync(path.join(__dirname, '/blogs', `${newBlog.title}.json`), JSON.stringify(newBlog))
  res.setHeader('Content-Type', 'application/json');
  res.status(200);
  res.end("OK, Blog is created")
}
})

app.put('/blogs/:title', (req,res) => {
  let newBlog = {
    title: req.body.title,
    content: req.body.content
  }
  if(fs.existsSync(path.join(__dirname,'/blogs',`${newBlog.title}.json`))){
    fs.writeFileSync(path.join(__dirname, '/blogs', `${newBlog.title}.json`), JSON.stringify(newBlog));
    res.setHeader('Content-Type', 'application/json');
    res.status(200)
    res.end("Ok, Updated")
  }
  else{
   return  res.status(400).json({ msg: 'File is not exist'})
  }
})


app.delete('/blogs/:title', (req,res) => {
   let title = req.params.title;
   
  if (fs.existsSync(path.join(__dirname,'/blogs',`${title}.json`))){
    fs.unlinkSync(path.join(__dirname, '/blogs', `${title}.json`))
    res.end("File Deleted")
  }
  else{
   return  res.status(400).json({ msg: 'File is not exist'})
  }

})

app.get('/blogs/:title', (req,res) => {
  let title = req.params.title;
  if (fs.existsSync(path.join(__dirname, "/blogs", `${title}.json`))){ 
    const blog = fs.readFileSync(path.join(__dirname, "/blogs", `${title}.json`));
    res.setHeader('Content-Type', 'application/json');
    res.status(200)
    res.end(blog)
  } 
  else
    {
      return  res.status(400).json({ msg: 'File is not exist'})
   }
})

app.get('/blogs', (req,res) =>{
  // how to get the file names of all files in a folder??
  const allFiles = fs.readdirSync(path.join(__dirname, "/blogs"));
  res.setHeader('Content-Type', 'application/json');
  res.status(200)
  res.end(JSON.stringify(allFiles))
})

 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`server started on port ${PORT}`));