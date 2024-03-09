import express from "express";
import {
  getUsers,
  Login,
} from "../controllers/Api/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/Api/RefreshToken.js";
import { CreateUser, deleteUsersById } from "../controllers/Api/MemberController.js";
import { uploadUserImage } from "../multer/UserImage.js";
import { checkAdminRole } from "../middleware/AdminMiddleware.js";
import { getRoles } from "../controllers/Api/RoleController.js";
const router = express.Router();
router.post("/login", Login);

router.get("/token", refreshToken);
router.get("/users", verifyToken, checkAdminRole, getUsers);
router.delete("/deleteUser/:id", verifyToken, checkAdminRole, deleteUsersById);
router.get('/roleLists', verifyToken, checkAdminRole, getRoles);
router.post("/createUser",uploadUserImage, verifyToken, checkAdminRole, CreateUser);

export default router;
