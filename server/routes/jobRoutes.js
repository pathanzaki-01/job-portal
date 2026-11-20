import express from "express";
import {
  getJobs,
  getJobCount,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
} from "../controllers/jobController.js";

const router = express.Router();

router.get("/", getJobs);
router.post("/", createJob);
router.get("/count", getJobCount);
router.get("/:id", getJobById);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

export default router;