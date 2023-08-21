import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import userRouter from './routes/userRouter.js';
import blogRouter from './routes/blogRouter.js';

const app=express();

//ENABLING CORS
app.use(cors());

// SETTING UP SECURITY HEADERS
app.use(helmet());

//LIMITING REQUESTS
const limiter=rateLimit({
    max:100,
    windowMs:60*60*1000,
    message:"Too Many request from this IP, please try again in an hour."
})
app.use('/',limiter);

// MIDDLEWARES
app.use(express.json());

// SANITIZING INPUT DATA
app.use(mongoSanitize());

// SETTING SECURITY AGAINST CROSS SITE SCRIPTING
app.use(xss());

//ROUTES
app.use("/api",userRouter);
app.use("/api/posts",blogRouter);

//NON-EXISTENT RESOURCES
app.all('*',(req,res,next)=>{
    res.status(404).json({
        status:'Not Found',
        message:`Can't find ${req.originalUrl} on this server.`
    });
})


export default app;