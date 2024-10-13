// backend/index.js
// ----------------

/*
So basically this is the root file of the backend on top of which all routes are made.
*/

// ----------------

// this is basically the require module syntax.
const express = require("express");

// You can also do
// import express from "express"

const path = require("path");

// cors is basically used to connect backend and frontend, as we are using different urls for both
const cors = require("cors");
const rootRouter = require("./backend/routes/index");

// this "app" thing is like having Math. , basically you can use many things in that.
const app = express();


app.use(cors());


// for parsing the body, which has been sent by the post request.
app.use(express.json());


// So here, any request starting with "/api/v1", that request will be handled by the rootRouter in the ./routes/index file.
app.use("/api/v1", rootRouter);

// sab kaam hi ports pr hota ha.
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


// production script
// Serve static files from the frontend's dist directory
app.use(express.static(path.join(__dirname, "../frontend/dist")));

// For any other route, serve index.html from the dist directory
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/dist", "index.html"));
});
