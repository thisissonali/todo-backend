import { app } from "./app.js";
import { connectDB } from "./data/database.js";
const PORT = process.env.PORT || 8000;
connectDB();

app.get('/', (req, res) => {
    res.send("Working");
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
})