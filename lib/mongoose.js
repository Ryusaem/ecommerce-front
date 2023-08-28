// mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
import mongoose from "mongoose";

// Goal: Connect to the MongoDB database.

// Function that connects to the MongoDB database.
// It checks if the connection is already open and returns a promise accordingly.
export function mongooseConnect() {
  // If the connection is already open, return a resolved promise.
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    // If the connection is not open, connect to the database and return a promise.
    // uri(r Uniform Resource Identifier) == tring that identifies the MongoDB database.
    // source: https://docs.mongodb.com/manual/reference/connection-string/
    // example: mongodb://localhost:27017/myapp
    const uri = process.env.MONGODB_URI;

    return mongoose.connect(uri);
  }
}
