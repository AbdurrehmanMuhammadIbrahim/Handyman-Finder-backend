import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
//routes import
import userRouter from './routes/user.routes.js'
import handymanRouter from './routes/handyman.routes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import getNotifications  from "./routes/notificationRoutes.js";

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

const app = express();

app.use(cors({
    origin:CORS_ORIGIN,
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({
    extended:true,
}))
//file and folder
app.use(express.static("public"))
//for cookies
app.use(cookieParser());


app.use("/api/v1/users", userRouter)
// Routes
// app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/v1/handyman', handymanRouter);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/admin', adminRoutes);
app.use('/api/v1/notification', getNotifications);

export default app;