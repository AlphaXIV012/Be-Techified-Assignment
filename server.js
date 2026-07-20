import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

// server.js

const app = express();
const port = process.env.PORT;
app.use(express.json());


app.get('/', (req, res) => {
  res.send('My Week-2 API!');
})

// Register endpoint
app.post("/register", (req, res) => {
  const { username, email } = req.body;

  if (!username || !email) {
    return res.status(400).json({ message: "Username and email are required" });

    res.send(`Hello ${username}!`);
  }

  app.get('/user/:id', (req, res) => {
    const { id } = req.params;
    res.json({ id, username, email });
    res.send(`User ${id} profile`);
  });

  res.status(201).json({
    message: "User registered successfully",
    user: { username, email }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
