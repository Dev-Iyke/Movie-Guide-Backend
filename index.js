const express = require("express")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const cors = require("cors")
const routes = require("./routes")
const app =  express()
app.use(express.json())
// app.use(cors())
dotenv.config()
const url = process.env.MONGODB_URL
const port = process.env.PORT

const allowedOrigins = [
  'https://my-movie-guide.vercel.app',
  'http://localhost:3000' // optional for local dev
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, Postman etc)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true, // if you're using cookies or auth headers
}));

//Interact with the database using mongoose(connected by connection string)
mongoose.connect(url)
.then(() => {
  console.log("Mongoose Connected to MongoDB...")
  app.listen(port, (e) => {
    if(e){
      console.error("Error - App failed to listen: ", e)
    } else {
      console.log(`Server is listening at port ${port}`)
    }
  })
})
.catch(() => {
  console.error('Mongoose failed to connect to mongoDB')
})


//APIs
app.get("/api/v1/", (request, response) => {
  response.send("You are connected")
})

app.use("/api/v1", routes)