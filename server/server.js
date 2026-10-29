import express from "express";
import jobs from "./data/jobs.js";

const app = express();
app.use(express.json());
const PORT = 5000;

// ---------- Basic routes (Day 1) ----------
app.get("/", (req, res) => {
  res.send("Job Portal API is running");
});

app.get("/health", (req, res) => {
  res.send("OK");
});

app.get("/about", (req, res) => {
  res.send("HireHub: Job Portal + Application Tracker");
});

app.get("/api/status", (req, res) => {
  res.json({ status: "ok", project: "Job Portal" });
});

// ---------- Jobs: list + search + filter (Days 2 and 4) ----------
app.get("/api/job", (req, res) => {
  const { search, location, type, minSalary } = req.query;

  let result = jobs;

  if (location) {
    result = result.filter(
      (job) => job.location.toLowerCase() === location.toLowerCase()
    );
  }

  if (type) {
    result = result.filter(
      (job) => job.type.toLowerCase() === type.toLowerCase()
    );
  }

  if (minSalary) {
    result = result.filter((job) => job.salary >= Number(minSalary));
  }

  if (search) {
    const keyword = search.toLowerCase();
    result = result.filter(
      (job) =>
        job.title.toLowerCase().includes(keyword) ||
        job.company.toLowerCase().includes(keyword) ||
        (job.skills || []).some((skill) => skill.toLowerCase().includes(keyword))
    );
  }

  res.status(200).json({
    success: true,
    count: result.length,
    data: result,
  });
});
// ---------- Jobs: count (Day 5 )-------------

app.post('/api/jobs' ,(req,res)=>{
         const { title , company, location, type, salary, skills } = req.body;
        
         if( !title || !company || !location || !type){
          return   res.status(400).json({
                success:false,
            message:"title, company, location and type are required" })
         }

         if( salary === undefined ||
             salary === null ||
             salary === "" ||
             typeof salary !== "number"){
             return   res.status(400).json({
                success:false,
            message:"salaray are required and must be number" })
         }

          if(jobs.some(
            (job)=>job.title.toLowerCase()===title.toLowerCase()
            &&
            job.company.toLowerCase()===company.toLowerCase()
          )){
          return   res.status(409).json({
                success:false,
            message:"duplicate error 409" })
         }

         const newJob = {
    id: jobs.length ? jobs[jobs.length - 1].id + 1 : 1,
    title,
    company,
    location,
    type,
    salary: Number(salary) || 0,
    skills: Array.isArray(skills) ? skills : [],
    postedOn: new Date().toISOString().slice(0, 10),
  };
      
    jobs.push(newJob)

  res.status(201).json({
    success:true,
    data:(newJob)

    
  })
  console.log(req.body)
})

  



// ---------- Jobs: count (Day 2 challenge) ----------
// Must stay ABOVE /api/jobs/:id
app.get("/api/jobs/count", (req, res) => {
  res.status(200).json({ success: true, count: jobs.length });
});

// ---------- Jobs: one job by id (Day 3) ----------
app.get("/api/jobs/:id", (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid job id",
    });
  }

  const job = jobs.find((item) => item.id === id);

  if (!job) {
    return res.status(404).json({
      success: false,
      message: `Job with id ${id} not found`,
    });
  }

  res.status(200).json({
    success: true,
    data: job,
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});