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
import { createNotification, deleteNotificationById, getAllNotifications, updateNotificationById } from "../controllers/Api/NotificationController.js";
import { checkUserRole } from "../middleware/UserMiddleware.js";
import { createContact, deleteContact, getAllContacts } from "../controllers/ContactController.js";
import { getUserAttendance, markAttendance } from "../controllers/Api/AttendanceController.js";
import { createAppointment, getAllAppointments } from "../controllers/Api/PersonalTrainerAppointmentController.js";
import { createSurvey, getAllSurveys } from "../controllers/Api/SurveyController.js";
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
router.get('/allMemberships', getMemberships);
router.delete('/memberships/:id', deleteMembershipById);

router.post('/createMemberMemberships', verifyToken, checkAdminRole, createMembershipMember);
router.get('/memberMemberships', verifyToken, checkAdminRole, getAllMembershipMembers);
router.get('/memberships/:id', getMembershipMemberById);
router.put('/memberships/:id', updateMembershipMemberById);
router.delete('/memberships/:id', deleteMembershipMemberById);

router.post("/notifications", verifyToken, checkAdminRole, createNotification);
router.get("/notifications", verifyToken, checkAdminRole, getAllNotifications);
router.get("/allNotifications", verifyToken, checkUserRole, getAllNotifications);
router.put("/notifications/:id", verifyToken, checkAdminRole, updateNotificationById);
router.delete("/notifications/:id", verifyToken, checkAdminRole, deleteNotificationById);

router.post("/contacts" , createContact);
router.get("/contacts", verifyToken, checkAdminRole, getAllContacts);
router.delete("/contacts/:id", verifyToken, checkAdminRole, deleteContact);

router.post('/attendance',  verifyToken, checkAdminRole, markAttendance);
router.get('/attendance/:userId', verifyToken, checkAdminRole, getUserAttendance);

router.post('/appointments', verifyToken, checkAdminRole,createAppointment);
router.get('/appointments', verifyToken, checkAdminRole, getAllAppointments);
// router.get('/appointments/:id', getAppointmentById);
// router.put('/appointments/:id', updateAppointmentById);
// router.delete('/appointments/:id', deleteAppointmentById);


router.post('/surveys',verifyToken, checkAdminRole, createSurvey);
router.get('/surveys',verifyToken, checkAdminRole, getAllSurveys);
// router.get('/surveys/:id', getSurveyById);
// router.put('/surveys/:id', updateSurveyById);
// router.delete('/surveys/:id', deleteSurveyById);

export default router;
