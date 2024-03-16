import express from "express";
import {
  getUsers,
  getUsersCountWithRole2,
  Login,
} from "../controllers/Api/UserController.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/Api/RefreshToken.js";
import { CreateUser, deleteUsersById } from "../controllers/Api/MemberController.js";
import { uploadUserImage } from "../multer/UserImage.js";
import { checkAdminRole } from "../middleware/AdminMiddleware.js";
import { getRoles } from "../controllers/Api/RoleController.js";
import { createMembership, deleteMembershipById, getMemberships } from "../controllers/Api/MembershipController.js";
import { uploadMemberImage } from "../multer/MembershipImage.js";
import { createMembershipMember, deleteMembershipMemberById, getAllMembershipMembers, getMembershipMemberById, updateMembershipMemberById } from "../controllers/Api/MemberMembershipController.js";
const router = express.Router();
router.post("/login", Login);

router.get("/token", refreshToken);
router.get("/users", verifyToken, checkAdminRole, getUsers);
router.delete("/deleteUser/:id", verifyToken, checkAdminRole, deleteUsersById);
router.get('/roleLists', verifyToken, checkAdminRole, getRoles);
router.post("/createUser",uploadUserImage, verifyToken, checkAdminRole, CreateUser);
router.get('/users/count',verifyToken, checkAdminRole,  getUsersCountWithRole2);


router.post('/createMembership',uploadMemberImage, verifyToken, checkAdminRole, createMembership);
router.get('/memberships', verifyToken, checkAdminRole, getMemberships);
router.delete('/memberships/:id', deleteMembershipById);

router.post('/createMemberMemberships', verifyToken, checkAdminRole, createMembershipMember);
router.get('/memberMemberships', verifyToken, checkAdminRole, getAllMembershipMembers);
router.get('/memberships/:id', getMembershipMemberById);
router.put('/memberships/:id', updateMembershipMemberById);
router.delete('/memberships/:id', deleteMembershipMemberById);

export default router;
