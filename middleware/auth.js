const catchAsyncErrors = require("./catchAsyncErrors");

exports.isAuthenticateUser= catchAsyncErrors(async(req,res,next)=>{
    const {token}= req.cookie;

    if (!token) {
        return next(new ErrorHander("Please Login to access this resource", 401));
      }
    
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    
      req.user = await User.findById(decodedData.id);
    
      next();
    
})

exports.authorizedRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHander(
            `Role: ${req.user.role} is not allowed to access this resouce `,
            403
          )
        );
      }
  
      next();
    };
  };