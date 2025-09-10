import dbConnect from "@/middleware/mongoose";
import Notifications from "@/models/dashboard/notificationModel";
import withAuth from "@/middleware/auth";

const getUserNotifications = async (req, res) => {
  if (req.method === "GET") {
    const userId = req.id;
    console.log(`userId notification: ${userId}`)

    try {
      const notifications = await Notifications.find({
        $or: [{ userId }, { userId: null }],
      }).sort({ createdAt: -1 });

      return res.status(200).json({ success: true, data: notifications });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Failed to fetch notifications" });
    }
  } else {
    return res.status(405).json({ success: false, message: "Method Not Allowed" });
  }
};

export default dbConnect(withAuth(getUserNotifications));
