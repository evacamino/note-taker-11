const express = require("express");
const htmlroute = require("./routes/routehtml");
const apiroute = require("./routes/routeapi");
const PORT = 3001;

const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use("/", htmlroute);
app.use("/api", apiroute);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
