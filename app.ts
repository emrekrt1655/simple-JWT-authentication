import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import logger from "morgan";
import routes from "./routes/index";
import bodyParser from "body-parser";

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server at listening on port ${PORT}`);
});
