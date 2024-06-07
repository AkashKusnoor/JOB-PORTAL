import mongoose from "mongoose";
const trainerSchema = new mongoose.Schema({
    // userId:{
    //     type:String,
    //     require:true
    // },
    firstName:{
        type:String,
        require:true
    },
    lastName:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    typeOfTraining:{
        type:String,
        require:true
    },
    experience:{
        type:String,
        require:true
    },  
    // budget:{
    //     type:Number,
    //     require:true
    // },
    modeOfTraining:{
        type:String,
        require:true
    },
    timings:{
        type:Array,
        require:true
    },
    status:{
        type:String,
        default:'pending'
    },
    },
    {
        timestamps:true
    }
    );
export default mongoose.model('Trainer', trainerSchema) 