import jwt from 'jsonwebtoken';

export default function withAuth(handler) {
  return async (req, res) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.id = decoded.id;
      req.email = decoded.email;
      req.name = decoded.name;
      return handler(req, res); // now call the actual handler
    } catch (err) {
      return res.status(401).json({ message: "Invalid Token" });
    }
  };
}
