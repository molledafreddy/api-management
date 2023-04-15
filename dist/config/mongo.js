// import "dotenv/config";
// import { connect } from "mongoose";

// async function dbConnect(): Promise<void> {
//     const DB_URI = <string>process.env.DB_URI;
//     console.log(DB_URI);
//     await connect(DB_URI)
// } 

// async function dbConnect(): Promise<void> {
//     const DB_URI = <string>process.env.DB_URI;
//     console.log(DB_URI);
//     await connect(DB_URI)
// } 

// mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
// .then(result => app.listen(PORT, () => console.log(`app running on port ${PORT}`)))
// .catch(err => console.log(err))

// import express from "express";
// import mongoose from "mongoose";


// const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.raz9g.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`
// mongoose
//   .connect(uri)
//   .then(() =>
//     app.listen(PORT, () =>
//       console.log(`Server running on http://localhost:${PORT}`)
//     )
//   )
//   .catch((error) => {
//     throw error;
//   });

// export default dbConnect;