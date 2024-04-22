import express from "express";
import charactersRouter from "./characters";
import logsRouter from "./logs";
import validate_token from "../../middlewares/validate_token";

const router = express.Router();

router.use("/characters", charactersRouter);
router.use("/logs", validate_token, logsRouter);

export default router;
