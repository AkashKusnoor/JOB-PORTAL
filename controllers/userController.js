import userModel from "../models/userModel.js";
import trainerModel from "../models/trainerModel.js";

export const updateUserController = async (req,res,next) =>{
    const {name,email,lastName,location} = req.body;
    //validation
    if(!name || !email || !lastName || !location ){
        next("Please provide all fields");
    }
    const user = await userModel.findOne({_id: req.user.userId})
    user.name = name
    user.lastName = lastName
    user.email = email
    user.location = location  

    await user.save()
    const token= user.createJWT()
    res.status(200).json({
        user,
        token,  
    })
}

//Apply trainer ans notification
export const applyTrainerController  = async(req,res)=>{
    try {
        const newtrainer = new trainerModel({...req.body, status:'pending'});                          
        await newtrainer.save();
        const adminuser = await userModel.findOne({isAdmin:true})
        console.log(newtrainer)
 
        const unseenNotifications = adminuser.unseenNotifications
        unseenNotifications.push({
            type:"new-trainer-request",
            message: `${newtrainer.firstName} ${newtrainer.lastName} has applied for trainer account`,
            data:{
                trainerId : newtrainer._id,
                name : newtrainer.firstName+ " " + newtrainer.lastName
            },
       //   onclickPath:"/admin/trainers"   
            })
            await userModel.findByIdAndUpdate(adminuser._id, {unseenNotifications})
            res.status(500).send({
                success:true,
                messsage:'Trainer Applied Successfully',
                newtrainer,
                unseenNotifications
            })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error while Applying for Trainer'
        })
    }
}

//mark all notification as seen
export const seenNotificationController = async (req,res) =>{
    try {
        const user = await userModel.findOne({_id:req.body.userId})
        const unseenNotifications = user.unseenNotifications;
        const seenNotifications = user.seenNotifications;
        seenNotifications.push(...unseenNotifications)
        user.unseenNotifications=[];
        user.seenNotifications = seenNotifications;



        user.seenNotifications = unseenNotifications;
        user.unseenNotifications = [];
        const updateUser = await user.findByIdAndUpdate(user._id, user);
    } catch (error) {
        
    }
}