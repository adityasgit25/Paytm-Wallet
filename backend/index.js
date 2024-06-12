// backend/index.js
// ----------------

/*
So basically this is the root file of the backend on top of which all routes are made.
*/

// ----------------
const express = require("express");



// cors is basically used to connect backend and frontend, as we are using different urls for both
const cors = require("cors");
const rootRouter = require("./routes/index");

const app = express();


app.use(cors());


// for parsing the body, which has been sent by the post request.
app.use(express.json());


// So here, any request starting with "/api/v1", that request will be handled by the rootRouter in the ./routes/index file.
app.use("/api/v1", rootRouter);


app.listen(3000);
