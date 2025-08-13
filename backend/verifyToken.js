const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    const token = req.cookies.token
    if(!token) {
        return res.this.status(401).json("you are not authenticated");

    }
    jwt.verify(token, process.env.SECRET, async (err,data) => {
       if(err) {
        return res.status(403).json("Token is Invalid")
       }
       req.userId = data._id
       next()
    })
}
/////////////// 
 /*
const verifyadminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting "Bearer TOKEN"

  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role, email, ... }
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
}; */
////////////
module.exports = (payload) => jwt.sign(payload, process.env.SECRET, { expiresIn: '1h' });
///////////
module.exports ={ verifyToken,
                // verifyadminToken
                };