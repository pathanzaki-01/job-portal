import express from "express";
import jobRoutes from "./routes/jobRoutes.js";

const app = express();
const PORT = 5000;

app.use(express.json());

// ---------- Basic routes ----------
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

// ---------- Feature routes ----------
app.use("/api/jobs", jobRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});