import Router from 'express';
import { getUserProfile, login, register,updateUserProfile,verifyToken } from '../controllers/authController.controller.js';
import  protect  from '../middlewares/authMiddleware.js';



const router = Router();

router.get('/user', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Handyman Finder API"
    });
});

router.post("/register",(protect,register) );
router.post("/login", (protect,login));
router.get("/verify", (verifyToken));
router.put("/updateProfile", protect(["user"]), updateUserProfile); 

 router.get("/profile", protect(["user"]), getUserProfile); 



export default router;


