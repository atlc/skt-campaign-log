import express from "express";
import validate_token from "../../middlewares/validate_token";
import unsupported_route from "../../middlewares/unsupported_route";

const router = express.Router();
router.use(validate_token);

router.use("/logs", unsupported_route);

export default router;