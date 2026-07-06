const express = require('express');
const cors = require('cors');
require("dotenv").config();
const app = express();
const PORT = process.env.B_PORT;

app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3001"],
  credentials: true,
}));

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
    }
);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

