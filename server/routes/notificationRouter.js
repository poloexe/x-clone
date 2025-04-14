import { Router } from "express";
import {
  deleteAllNotifications,
  deleteNotification,
  getNotifications,
  getUnreadNotificationCount,
} from "../controller/notificationController.js";
const router = Router();

router.get("/", getNotifications);
router.get("/unread", getUnreadNotificationCount);
router.delete("/delete", deleteAllNotifications);
router.delete("/delete/:id", deleteNotification);

export default router;
