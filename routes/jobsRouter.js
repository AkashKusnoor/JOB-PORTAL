import express from "express";
import  { isAdmin, requireSignIn } from "../middelwares/authMiddleware.js";
import {
    createJobController,
    deleteJobController,
    getAlljobsController,
    jobStatsController,
    jobsFilterByLocation,
    updateJobController
} from "../controllers/jobsController.js";

const router = express.Router()

//routes
//CREATE JOB || POST
// router.post("/create-job",requireSignIn, isAdmin, createJobController);

//GET JOBS || GET
router.get("/get-job?", getAlljobsController);

// //UPDATE JOBS  ||  PATCH
// router.patch("/update-job/:id", requireSignIn,isAdmin ,updateJobController);

// //DELETE JOBS  || DELETE
// router.delete("/delete-job/:id", requireSignIn,isAdmin, deleteJobController);

// //JOB STATS FILTER || GET
// router.get("/job-stats", requireSignIn,isAdmin, jobStatsController);

// //jobs based on location

// router.get("jobs-based-on-location", jobsFilterByLocation)





export default router