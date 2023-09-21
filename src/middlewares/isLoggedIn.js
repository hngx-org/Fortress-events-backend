module.exports = (req,res,next) => {
    req.isAuthenticated() ? next() : res.sendStatus(401);
}