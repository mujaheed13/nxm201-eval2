const authorize = (roles_arr) => {
    return (req, res, next) => {
        const {user_role} = req.body
        console.log(user_role);
        if(roles_arr.includes(user_role)){
            next();
        } else {
            res.status(401).json({msg: "You are not Authorized!"});
        }
    }
}

module.exports = { authorize }