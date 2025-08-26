import mongoose from "mongoose";

let isConnected = false;

async function connect() {
  if (isConnected) {
    return;
  }

  await mongoose.connect(process.env.MONGODB_URI!, {
    bufferCommands: false,
  });

  isConnected = true;
  console.log("✅ Connected to MongoDB");
}

async function destroyed() {
  await mongoose.disconnect();
  isConnected = false;
  console.log("❌ Disconnected from MongoDB");
}

const db = { connect, destroyed };
export default db;
