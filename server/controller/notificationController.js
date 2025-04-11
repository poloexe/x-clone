import Notification from "../model/notificationModel.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });

    if (!notifications || notifications.length === 0)
      return res.status(200).json(notifications);

    await Notification.updateMany({ to: userId }, { read: true });

    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const notiId = req.params.id;
    const userId = req.user._id;

    const notification = await Notification.findById(notiId);
    if (!notification)
      return res.status(404).json({ error: "No notifications found!" });

    if (userId.toString() !== notification.to.toString())
      return res
        .status(400)
        .json({ error: "You are not allowed to delete this notification" });

    await Notification.findByIdAndDelete(notiId);

    return res.status(200).json({ msg: "Notification deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteAllNotifications = async (req, res) => {
  try {
    const userId = req.user._id;

    const notifications = await Notification.find({ to: userId });
    if (!notifications || notifications.length === 0)
      return res.status(200).json({ msg: "No notification available" });

    await Notification.deleteMany({ to: userId });
    return res.status(200).json(notifications);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
