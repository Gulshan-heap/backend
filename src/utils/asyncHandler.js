const asyncHandler= (requestHandler)=>{
    (req,res,next)=>{
        Promise.resolve(requestHandler(req,res,next)).catch((err)=>{
            next(err);
        });

        //this will return a function which will handle the async errors
    }

}




export { asyncHandler };
//a wrapper function to handle async errors in express routes
//so that we don't have to write try catch block in every route handler
//we can just wrap the route handler with this function

/*
const asyncHandler = (fn) => async (req, res, next) => {
    //fn is the route handler function
    try {
        await fn(req, res, next);
    } catch (error) {
        res.status(error.code || 500).json({
            success: false,
            message: error.message || "Internal Server Error"
        });
    }
};

*/
