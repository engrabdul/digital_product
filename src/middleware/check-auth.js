const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    // Get auth header value
    const token = req.header('auth-token');
    // Check if bearer is undefined
    if(!token) return res.status(401).send('Access Denied!');
     
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(401).json({
            message: 'Auth failed',
            error: err
        })
    } 
}