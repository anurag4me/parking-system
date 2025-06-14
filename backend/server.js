import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import express, { json } from "express";
import authRoute from "./Server/router/auth-router.js";
import contactRoute from "./Server/router/contact-router.js";
import parkingSpotRoute from "./Server/router/park-router.js";
import connectDb from "./Server/utils/db.js";
import errorMiddleware from "./Server/middlewares/error-middleware.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(json());

app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/parking-spots", parkingSpotRoute);

app.use(errorMiddleware);

const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on port http://localhost:${PORT}`);
  });
});
