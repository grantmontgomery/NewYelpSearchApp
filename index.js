const express = require("express");
const cors = require("cors");
require("dotenv").config();
const json = require("body-parser").json;
const urlEncoded = require("body-parser").urlencoded;
const fetch = require("node-fetch");

const app = express();

app.use(json());
app.use(urlEncoded({ extended: false }));
app.use(cors());

app.get("/yelpforward", (req, res) => {
  const yelp = new URL("https://api.yelp.com/v3/businesses/search"),
    params = { term: "restaurants", location: "Los Angeles", radius: 10000 };

  Object.keys(params).forEach(key =>
    yelp.searchParams.append(key, params[key])
  );

  const response = fetch(yelp, {
    headers: {
      Authorization:
        "Bearer lVed9T3wz3LMh276LgwWGZdKDvIdmVlHPMlboO2_3gay-fBr5L322jgL7rdlEHm7czC5ZzN4xqGXGUgnrl5iN_HuTr74zP6WQUW-5fTC4eZwxxZIn_aWrwHdbIPMXXYx"
    }
  });

  response
    .then(resp => resp.json())
    .then(data => res.send(data.businesses))
    .catch(error => console.log(error.message));
});

app.listen(5000, () => {
  console.log("Server running on 5000");
});
