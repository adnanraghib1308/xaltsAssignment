import { authorizeRequest } from "../helpers/middlewares";

const express = require("express");
const router = express.Router();

router.use("/auth", require("../auth"));
router.use("/api", authorizeRequest(), require("../controllers/app"));

export = router;
