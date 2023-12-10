import Express from "express";
import userRouter from "./routes/User.js"
import taskRouter from "./routes/task.js"
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from 'cors'
import morgan from 'morgan'
export const app = Express();

app.use(Express.json());
app.use(cookieParser());
app.use(Express.urlencoded({ extended: true }));

app.use(cors({
    origin: [process.env.FRONTEND_URL],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true,
}))

morgan.token('cookies', (req) => JSON.stringify(req.cookies));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :cookies \n'));
app.use("/api/v1/user", userRouter);

app.use("/api/v1/task", taskRouter);
app.use(errorMiddleware);
