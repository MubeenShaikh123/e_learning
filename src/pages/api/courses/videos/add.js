import dbConnect from '@/middleware/mongoose';
import Video from '@/models/course/videoModel';

const handler = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: 'Method not allowed' });
    }

    const videos = req.body;

    if (!Array.isArray(videos) || videos.length === 0) {
        return res.status(400).json({ success: false, message: 'Expected an array of videos' });
    }

    // Validate all entries
    const invalidVideo = videos.find(
        v => !v.courseId || !v.title || !v.url || !v.thumbnail || !v.duration
    );

    if (invalidVideo) {
        return res.status(400).json({ success: false, message: 'One or more videos are missing required fields' });
    }

    try {
        const insertedVideos = await Video.insertMany(videos);
        return res.status(201).json({ success: true, message: 'Videos added successfully', videos: insertedVideos });
    } catch (error) {
        console.error("Error adding videos:", error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};

export default dbConnect(handler);