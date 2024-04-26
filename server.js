const express = require("express");
const app = express();
const mongodb = require("./database/connect");

const port = process.env.PORT || 3000;


app.use("/", require("./routes/"))



mongodb.initDB((err, mongodb) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Database connected and Web Server listening at port ${port}`)
    }
})
