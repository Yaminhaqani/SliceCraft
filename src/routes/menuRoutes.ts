import { Router } from "express";
import { addMenu, getMenu } from "../controllers/menuController";
import { upload } from "../middleware/upload";


const router = Router();

router.get("/menu", getMenu);
router.post("/menu",upload.single("image"), addMenu);

export default router;