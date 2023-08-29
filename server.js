const express = require('express');
const app = express();
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
app.use(express.json());

const PORT = process.env.PORT;

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("CONNECTED MONGODB SUCCESS");
  } catch (error) {
    throw error;
  }
};

mongoose.set("strictQuery", true);

mongoose.connection.on("disconnected", () => {
  console.log("MONGODB DISCONNECTED");
});

mongoose.connection.on("connected", () => {
  console.log("MONGODB CONNECTED");
});

const route = require('./routes');
// Router init
route(app);

app.use(express.static(__dirname + "/client"));

// start server
app.listen(PORT, () => {
  connect();
  console.log("CONNECTED BACKEND SUCCESS", PORT);
});
