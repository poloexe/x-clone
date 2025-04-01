import Notification from "../model/notificationModel.js";
import User from "../model/userModel.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notification = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });

    if (notification.length === 0)
      return res.status(404).json({ msg: "No notifications available" });

    await Notification.updateMany({ to: userId }, { read: true });

    return res.status(200).json(notification);
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notiId = req.params.id;
    const userId = req.user._id;

    const notification = await Notification.findById(notiId);
    if (!notification)
      return res.status(404).json({ msg: "No notifications found!" });

    if (userId.toString() !== notification.to.toString())
      return res
        .status(400)
        .json({ msg: "You are not allowed to delete this notifications" });

    await Notification.findByIdAndDelete(notiId);

    return res.status(200).json({ msg: "Notification deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

export const deleteAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notification = await Notification.find({ to: userId });
    if (!notification)
      return res.status(404).json({ msg: "No notifications found!" });

    await Notification.deleteMany({ to: userId });
    return res.status(200).json({ msg: "Notifications deleted successfully" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
