import jobs from "../data/jobs.js";

export const getJobs = (req, res) => {
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
};

export const getJobCount = (req, res) => {
  res.status(200).json({ success: true, count: jobs.length });
};

export const getJobById = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid job id" });
  }

  const job = jobs.find((item) => item.id === id);

  if (!job) {
    return res
      .status(404)
      .json({ success: false, message: `Job with id ${id} not found` });
  }

  res.status(200).json({ success: true, data: job });
};

export const createJob = (req, res) => {
  const { title, company, location, type, salary, skills } = req.body;

  if (!title || !company || !location || !type) {
    return res.status(400).json({
      success: false,
      message: "title, company, location and type are required",
    });
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

  jobs.push(newJob);

  res.status(201).json({ success: true, data: newJob });
};

export const updateJob = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid job id" });
  }

  const job = jobs.find((item) => item.id === id);

  if (!job) {
    return res
      .status(404)
      .json({ success: false, message: `Job with id ${id} not found` });
  }

  const allowedFields = ["title", "company", "location", "type", "salary", "skills"];
  const updates = {};

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  if (updates.salary !== undefined) {
    const salary = Number(updates.salary);
    if (Number.isNaN(salary)) {
      return res
        .status(400)
        .json({ success: false, message: "salary must be a number" });
    }
    updates.salary = salary;
  }

  if (updates.skills !== undefined && !Array.isArray(updates.skills)) {
    return res
      .status(400)
      .json({ success: false, message: "skills must be an array" });
  }

  Object.assign(job, updates);

  res.status(200).json({ success: true, data: job });
};

export const deleteJob = (req, res) => {
  const id = Number(req.params.id);

  if (Number.isNaN(id)) {
    return res.status(400).json({ success: false, message: "Invalid job id" });
  }

  const index = jobs.findIndex((item) => item.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: `Job with id ${id} not found` });
  }

  const [deletedJob] = jobs.splice(index, 1);

  res.status(200).json({
    success: true,
    message: "Job deleted",
    data: deletedJob,
  });
};