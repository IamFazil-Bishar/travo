import express from "express";
import dotenv, { config } from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoute from './routes/tours.js' 
import userRoute from './routes/users.js' 
import authRoute from './routes/auth.js' 
import reviewRoute from './routes/review.js' 
import bookingRoute from './routes/booking.js' 




dotenv.config();
const app = express();
const port = process.env.PORT || 8000;

// const corsOptions = {
//   origin: true,
//   Credential: true
// }

 // Enable CORS middleware

app.use((req, res, next) => {
  const allowedOrigins = ["https://travo-2pk9.vercel.app"];
  const origin = req.headers.origin;

  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  next();
});

// database connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB database Conntected");
  } catch (err) {
    console.log("MongoDB database Connectoion failed", err);
  }
};

// middleware
app.use(express.json());
// app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);


app.listen(port, () => {
  connect();
  console.log("server listening on port", port);
});
