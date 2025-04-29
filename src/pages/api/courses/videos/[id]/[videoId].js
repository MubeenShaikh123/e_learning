// pages/api/courses/videos/[id]/[videoId].js
import dbConnect from '@/middleware/mongoose';
import Video from '@/models/course/videoModel';

const handler = async (req, res) => {
    const { id, videoId } = req.query;

    if (req.method === 'GET') {
        try {
            await dbConnect();
            const video = await Video.findOne({ courseId: id, _id: videoId });

            if (!video) {
                return res.status(404).json({ message: 'Video not found' });
            }

            res.status(200).json({ video });
        } catch (error) {
            console.error('Error fetching video:', error);
            res.status(500).json({ message: 'Server error' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}

export default dbConnect(handler);