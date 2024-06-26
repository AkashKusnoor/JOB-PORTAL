import { isAdmin, requireSignIn } from "../middelwares/authMiddleware.js";
import jobsModel from "../models/jobsModel.js";
import mongoose from "mongoose";


//=======CREATE JOB========
export const createJobController = async (req, res, next) => {
    const { company, position } = req.body
    if (!company || !position) {
        next('Please provid All fields')
    }
    // req.body.createdBy = req.user.userId
    const job = await jobsModel.create(req.body)
    res.status(201).json({ job });
}

//====== GET JOBS ======
export const getAlljobsController = async (req, res, next) => {
    //
   try {
     const {status , position, location} = req.params;
     //console.log(req.query)
     //condition for searching filters
    const params = { }
    console.log()
 
    //let query = {};
 
     //based on position
     if(position){              //we are using regex because we need job based on key word & by default mongoose will supprt regex 
         query.position  = {$regex: search, $options:"i"};
     }
 
     if(location){
         query.workLocation = {$regex: location, $options:"i"}
     }
 
     //const queryResult = jobsModel.find( queryObject );
     //console.log(queryResult)
     const jobs = await jobsModel.find( query )
 
    
     // const jobs = await jobsModel.find({ });
     res.status(200).json({
         totalJobs: jobs.length,
         jobs
     });
    
   } catch (error) {
    
   }

};

//======= UPDATE JOBS ========
export const updateJobController = async (req, res, next) => {
    const { id } = req.params
    const { company, position } = req.body
    //validation
    if (!company || !position) {
        next('Please provide all Fields')
    }
    //find job
    const job = await jobsModel.findOne({ _id:id })
    //validation
    if (!job) {
        next(`no jobs found with this id ${id}`)
    }
    // if (!req.user.userId === job.createdBy.toString()) {
    //     next('Your not Authorized to update this job')
    //     return
    // }
    const updateJob = await jobsModel.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    })
    //response
    res.status(200).json({ updateJob });

};

//========DELETE JOB ==========
export const deleteJobController = async (req, res, next) => {
    const { id } = req.params
    //find job
    const job = await jobsModel.findOne({ _id: id })
    //validation
    if (!job) {
        next(`No job found with this Id ${id}`)
    }
    //  if (!isAdmin || !requireSignIn) {
    //     next('Your not Authorized to delete this job')
    //     return
     
    //}
    await job.deleteOne();
    res.status(200).json({ message: " Job Deleted Successfully...!" })
}

//JOBS STATS AND FILTER
export const jobStatsController = async (req,res)=>{
    try {
        const stats = await jobsModel.aggregate([
            //search by user jobs
            {
                $match:{

                }
            }
        ])
    } catch (error) {

    }
}

//jobs filter on location
export const jobsFilterByLocation = async (req,res)=>{

}
