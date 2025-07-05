import dbConnect from "@/middleware/mongoose";
import Notifications from "@/models/dashboard/notificationModel";

const addNotification = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { userId, type, title, message } = req.body;

      if (!type || !title || !message) {
        return res.status(400).json({ success: false, message: "Type, title, and message are required" });
      }

      const newNotification = new Notifications({
        userId: userId || null,
        type,
        title,
        message,
      });

      await newNotification.save();

      return res.status(201).json({ success: true, message: "Notification added successfully" });
    } catch (error) {
      console.error("Error adding notification:", error.message);
      return res.status(500).json({ success: false, message: "Failed to add notification", error: error.message });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
};

export default dbConnect(addNotification);
