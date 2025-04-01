import { Router } from "express";
import {
  deleteAllNotifications,
  deleteNotification,
  getNotifications,
} from "../controller/notificationController.js";
const router = Router();

router.get("/", getNotifications);
router.delete("/delete", deleteAllNotifications);
router.delete("/delete/:id", deleteNotification);

export default router;
