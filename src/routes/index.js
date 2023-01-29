import express from "express";
import cartRouter from "./cartRouter.js";
import itemRouter from "./itemRouter.js";
import signRouter from "./signRouter.js";

const router = express.Router();
router.use(itemRouter);
router.use(cartRouter);
router.use(signRouter);
export default router;
