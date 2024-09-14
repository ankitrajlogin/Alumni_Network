
const jwt = require('jsonwebtoken');

const ensureAuthenticated = (req, res, next) => {
    
    try {
        console.log("checking unortharized connection")
        const auth = req.headers['authorization'];
        if (!auth) {
            return res.status(403)
                .json({ message: 'Unauthorized, JWT token is require' });
        }
        const decoded = jwt.verify(auth, process.env.JWT_SECRET);
        req.user = decoded;

        
        next();
    } catch (err) {
        return res.status(403)
            .json({ message: 'Unauthorized, JWT token wrong or expired' });
    }
}

module.exports = ensureAuthenticated;