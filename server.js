import { app } from "./app.js";
import { connectDB } from "./data/database.js";

connectDB();

app.get('/', (req, res) => {
    res.send("Working");
})

app.listen(5000, () => {
    console.log(`Server listening on port ${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
})