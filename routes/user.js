import express from "express";
import {
  acceptFriendRequest,
  getAllNotifications,
  getMyFriends,
  getMyProfile,
  login,
  logout,
  newUser,
  searchUser,
  sendFriendRequest,
} from "../controllers/user.js";
import {
    acceptRequestValidator,
  loginValidator,
  registerValidator,
  sendRequestValidator,
  validateHandler,
} from "../lib/validators.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { singleAvatar } from "../middlewares/multer.js";

const router = express.Router();

router.post(
  "/new",
  singleAvatar,
  registerValidator(),
  validateHandler,
  newUser
);
router.post("/login", loginValidator(), validateHandler, login);

router.use(isAuthenticated);
// User must be logged in to use these
router.get("/me", getMyProfile);
router.get("/logout", logout);
router.get("/search", searchUser);
router.put(
  "/sendrequest",
  sendRequestValidator(),
  validateHandler,
  sendFriendRequest
);

router.put(
  "/acceptrequest",
  acceptRequestValidator(),
  validateHandler,
  acceptFriendRequest
);

router.get(
  "/notifications",
  getAllNotifications
);

router.get(
  "/friends",
  getMyFriends
);

export default router;
