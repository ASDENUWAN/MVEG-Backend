import express from "express";
import { getExplanation } from "../controllers/mveg.controller.js";

const router = express.Router();

router.post("/explain", getExplanation);

export default router;
