import mongoose from "mongoose";

async function connectDB() {
  mongoose.connect(
    `mongodb+srv://leofagundes2015:${process.env.PASSWORD_DB_CONNECTION}@mybookscluster.c3liin7.mongodb.net/mybooksDB?retryWrites=true&w=majority&appName=MyBooksCluster`
  );

  return mongoose.connection;
}

export default connectDB;
