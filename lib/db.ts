import mongoose from "mongoose";

async function connect() {
  await mongoose.connect("mongodb://127.0.0.1:27017/shop-feature-based");
  console.log("connected to db.");
}
async function destroyed() {
  await mongoose.disconnect();
  console.log("disconnected db.");
}

const db = { connect, destroyed };
export default db;
