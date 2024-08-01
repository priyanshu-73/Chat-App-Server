import express from "express";
import {
  addMembers,
  deleteChat,
  getChatDetails,
  getMessages,
  getMyChats,
  getMyGroups,
  leaveGroup,
  newGroupChat,
  removeMember,
  renameGroup,
  sendAttachments,
} from "../controllers/chat.js";
import {
  addMemberValidator,
  deleteChatValidator,
  getChatDetailsValidator,
  getMessagesValidator,
  leaveGroupValidator,
  newGroupValidator,
  removeMemberValidator,
  renameGroupValidator,
  sendAttachmentsValidator,
  validateHandler,
} from "../lib/validators.js";
import { isAuthenticated } from "../middlewares/auth.js";
import { attachmentMulter } from "../middlewares/multer.js";

const router = express.Router();

router.use(isAuthenticated);
// User must be logged in to use these
router.post("/new", newGroupValidator(), validateHandler, newGroupChat);
router.get("/my", getMyChats);
router.get("/my/groups", getMyGroups);
router.put("/addmembers", addMemberValidator(), validateHandler, addMembers);
router.put(
  "/removemember",
  removeMemberValidator(),
  validateHandler,
  removeMember
);
router.delete("/leave/:id", leaveGroupValidator(), validateHandler, leaveGroup);
router.post(
  "/message",
  attachmentMulter,
  sendAttachmentsValidator(),
  validateHandler,
  sendAttachments
);
router.get(
  "/message/:id",
  getMessagesValidator(),
  validateHandler,
  getMessages
);
router
  .route("/:id")
  .get(getChatDetailsValidator(), validateHandler, getChatDetails)
  .put(renameGroupValidator(), validateHandler, renameGroup)
  .delete(deleteChatValidator(), validateHandler, deleteChat);

export default router;
