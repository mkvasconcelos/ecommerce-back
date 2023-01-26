import express from "express";
import castRouter from "./cartRouter.js";
import itemRouter from "./itemRouter.js";

const router = express.Router();
router.use(itemRouter);
router.use(castRouter);
export default router;
