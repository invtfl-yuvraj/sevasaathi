import http from "http";
import app from "./app.js";
import connectDB from "./db/db.js";

const port = process.env.PORT || 3000;
const server = http.createServer(app);

connectDB()
  .then(() => {
    server.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Mongodb connection error", err);
  });
