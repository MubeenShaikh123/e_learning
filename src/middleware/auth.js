// middleware/withAuth.js
import { getToken } from 'next-auth/jwt';

export default function withAuth(handler) {
  return async (req, res) => {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Invalid or missing token' });
    }
    console.log('token: ', token);
    // Attach token data to request
    req.id = token._id;
    req.email = token.email;
    req.name = token.name;

    return handler(req, res);
  };
}
