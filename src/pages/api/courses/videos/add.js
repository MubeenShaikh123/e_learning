import dbConnect from '@/middleware/mongoose';
import Video from '@/models/course/videoModel';

const handler = async (req, res) => {

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const { courseId, title, url, thumbnail, duration } = req.body;

    if (!courseId || !title || !url || !thumbnail || !duration) {
        return res.status(400).json({ success: false, message: 'Missing required fields' });
    }

    try {
        const newVideo = new Video({
            courseId,
            title,
            url,
            thumbnail,
            duration,
        });

        await newVideo.save();

        return res.status(201).json({ success: true, message: 'Video added successfully', video: newVideo });
    } catch (error) {
        console.error("Error adding video:", error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
}

export default dbConnect(handler);