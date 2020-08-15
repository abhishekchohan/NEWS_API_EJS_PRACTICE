const express = require("express");
const bodyParser = require("body-parser");
const urllib = require("urllib");
const app = express();
require('dotenv').config();
let data = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render("index", { newsList: data });
});

app.post("/", (req, res) => {
    const url = "https://newsapi.org/v2/top-headlines";
    const options = {
        method: "GET",
        headers: {
            'Authorization': process.env.AUTH,
        },
        data: {

            country: req.body.country,
        }
    }
    urllib.request(url, options, (err, datas, resp) => {
        if (err) {
            console.log(err);
            console.log(resp.statusCode);
        } else {
            data = JSON.parse(datas);
            data = data.articles;
            res.render("index", { newsList: data });
        }
    })
    data.length = 0;
});

app.listen(process.env.PORT || 3000, () => console.log("Server running on " + (process.env.PORT || 3000)));