import express from "express";
import {
  getUserSheet,
  addTopic,
  addSubTopic,
  addProblem,
  toggleSolved,
  deleteTopic,
  deleteSubTopic,
  deleteProblem
} from "../controllers/sheetController.js";

const router = express.Router();

router.get("/:userId", getUserSheet);
router.post("/topic", addTopic);
router.post("/subtopic", addSubTopic);
router.post("/problem", addProblem);
router.post("/toggle", toggleSolved);
router.post("/delete/topic", deleteTopic);
router.post("/delete/subtopic", deleteSubTopic);
router.post("/delete/problem", deleteProblem);

export default router;
