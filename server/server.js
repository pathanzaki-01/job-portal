import express from "express";

const app = express();

app.get("/",(req,res)=>{

    res.send("job portal api is working");

})

app.get("/health",(req,res)=>{

    res.send("everythings its ok")
})

app.get('/about',(req,res)=>{
    res.send("job portal")
})

app.get('/api/status',(req,res)=>{
    res.json({
       status: "ok",
       project : "job portal"

    })
})

const port = 5000;

app.listen(port,()=>{
    console.log(`server runing on localhost ${port}`)
})
