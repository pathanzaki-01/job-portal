import express from "express";
import jobs from "./data/jobs.js";

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

app.get('/api/jobs',(req,res)=>{
    res.status(200).json({
        success:true,
         count: jobs.length,
    data: jobs,
    })
})

app.get('/api/jobs/count',(req,res)=>{
    res.json({
        count:jobs.length
    })
})

const port = 5000;

app.listen(port,()=>{
    console.log(`server runing on  http://localhost:${port}`)
})
