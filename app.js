import Express from "express";
import userRouter from "./routes/User.js"
import taskRouter from "./routes/task.js"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from 'cors'
export const app = Express();

app.use(Express.json());
app.use(cookieParser());
app.use(Express.urlencoded({ extended: true }));

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true,
}))

app.use("/api/v1/user", userRouter);

app.use("/api/v1/task", taskRouter);
app.use(errorMiddleware);
