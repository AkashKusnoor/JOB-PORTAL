import  express  from "express";
import { applyTrainerController, seenNotificationController, updateUserController } from "../controllers/userController.js";
import { requireSignIn } from "../middelwares/authMiddleware.js";

//router object
const router = express.Router()

//routes
//GET USERS || GET



//UPDATE USER  || PUT
router.put('/update-user',requireSignIn, updateUserController);

//Apply Trainer || POST
router.post("/apply-trainer", requireSignIn, applyTrainerController);

//Mark allnotification as seen
router.post("/mark-all-notification-as-seen", requireSignIn, seenNotificationController);







export default router;
