import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

// UNCAUGHT EXCEPTIONS
process.on('uncaughtException',err=>{
  console.log('Uncaught Exception! Shutting Down...');
  process.exit(1);
})

import app from "./app.js"

//DB CONNECTION
const DB = process.env.DATABASE_URI.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

await mongoose
  .connect(DB, { useNewUrlParser: true })
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err.message));

const port = process.env.PORT||5000;

//START SERVER
const server=app.listen(port, () => {
  console.log(`App Running on PORT:${port}`);
});

//UNHANDLED REJECTIONS
process.on('unhandledRejection', err=>{
  console.log('Unhandled Rejection!Shutting down...');
  server.close(()=>{
    process.exit(1);
  })
})