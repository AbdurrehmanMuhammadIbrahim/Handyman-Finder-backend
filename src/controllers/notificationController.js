// notificationController.js
import Notification from "../models/Notification.js";

export const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({
      recipient: req.user._id,
      recipientModel: req.user.role === "handyman" ? "Handyman" : "User",
    }).sort({ createdAt: -1 });

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching notifications" });
  }
};

// notificationController.js
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);

    if (!notification) return res.status(404).json({ msg: "Notification not found" });

    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    notification.isRead = true;
    await notification.save();

    res.json({ msg: "Marked as read" });
  } catch (err) {
    res.status(500).json({ msg: "Error marking as read" });
  }
};


export const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    const notification = await Notification.findById(id);

    if (!notification) return res.status(404).json({ msg: "Notification not found" });

    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({ msg: "Unauthorized" });
    }

    await notification.deleteOne();

    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting notification" });
  }
};


