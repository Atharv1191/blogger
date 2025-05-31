
// const jwt = require('jsonwebtoken');

// const auth = (req,res,next)=>{
//     const token = req.headers.authorization;
//     try {
//         jwt.verify(token, process.env.JWT_SECRET);
//         next();
//     } catch (error) {
//         return res.status(401).json({ success: false, message: "Unauthorized access" });
        
//     }

// }
// module.exports = auth;
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "Unauthorized access" });
    }

    const token = authHeader.split(' ')[1]; // ✅ Extract the actual token

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Optional: add user data to request
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Invalid token" });
    }
};

module.exports = auth;
