require("dotenv").config();

const express = require("express");
const app = express();

app.use(express.json());

const connectDB = require("./config/DB");
connectDB();

const imageRoutes = require("./routes/Routes");

app.use("/api", imageRoutes);

app.get('/', (req, res) => {
    res.send('Hello World')
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log('Server is running on port ' + PORT);
})