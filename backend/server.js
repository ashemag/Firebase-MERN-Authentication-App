import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import colors from "colors";
import userRoutes from "./routes/userRoutes.js";

/////////////// setup ///////////////

//env variables
dotenv.config();
//mongo db connect
connectDB();
/////////////// setup ///////////////

/////////////// api ///////////////
const app = express();
//lets us accept json in body
app.use(express.json());

// return something for main API route - for dev http://localhost:5000/
app.get("/", (req, res) => {
  res.send(`API running...`);
});
//routes
app.use("/api/users", userRoutes);

//400
app.use(notFound);
// 500
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
/////////////// api ///////////////
