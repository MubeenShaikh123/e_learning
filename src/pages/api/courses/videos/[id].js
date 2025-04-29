import dbConnect from "@/middleware/mongoose";
import Video from '@/models/course/videoModel';

const getAllVideos = async (req, res) => {

    const { id } = req.query;

    if (req.method === 'GET') {
        try {
            const videos = await Video.find({ courseId: id });
            console.error(`id: ${id}`);
            console.error(`videos: ${videos}`);
            return res.status(200).json({ success: true, videos });
        } catch (err) {
            console.error("Error fetching videos:", err);
            return res.status(500).json({ success: false, message: "Failed to fetch videos" });
        }
    } else {
        res.setHeader("Allow", ["GET"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

export default dbConnect(getAllVideos);