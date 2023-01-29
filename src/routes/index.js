import express from "express";
import castRouter from "./cartRouter.js";
import itemRouter from "./itemRouter.js";
import signRouter from "./signRouter.js";

const router = express.Router();
router.use(itemRouter);
router.use(castRouter);
router.use(signRouter);
export default router;
