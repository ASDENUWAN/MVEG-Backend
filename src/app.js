import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import mvegRoutes from "./routes/mveg.routes.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));

// Routes
app.use("/api/mveg", mvegRoutes);

// Error middleware
app.use(errorHandler);

export default app;
