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
        count:`Total avilable jobs are ${jobs.length} `
    })
})
// app.get('/api/jobs/:id',(req,res)=>{

    
//          const id = Number(req.params.id)
//          const job = jobs.find((job) => job.id=== id)
     
//          if(!job){
//             return res.status(404).json({
//             success:false,
//             message:`job not found at ${id}`
//          });
//         }   
//         else if(Number.isNaN(id)){
//             res.status(404).json({
//                 success:false,
//                 message:`invalid job id $cd{id}`
//             })

//         }

//         res.status(200).json({
//             success:true,
//             data:job
//         })


// })



app.get('/api/job',(req,res)=>{
       
    const {location , type  } = req.query;

    

    let result = jobs;

    if(location){
        result = result.filter(
        (job) => job.location.toLowerCase() === location.toLowerCase() 
        )
    };

    if(type){
        result = result.filter(
            (job) => job.type.toLowerCase() === type.toLowerCase()
        )
    }

    

   

    res.status(200).json({
        success : true ,
        count : result.length,
        data:result,
    })

});


const port = 5000;

app.listen(port,()=>{
    console.log(`server runing on  http://localhost:${port}`)
})
