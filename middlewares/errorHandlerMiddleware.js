const errorHandlerMiddleware = (err,req,res,next)=>{
        console.error("Transfer Error:", err.status_code ? err.message : err);
        
        const statusCode = err.status_code || 500;
        res.status(statusCode).json({ 
            success: false, 
            message: err.message || "Internal server error" 
        });
}

export default errorHandlerMiddleware;
