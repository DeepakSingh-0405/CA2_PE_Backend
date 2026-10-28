import { Router } from "express";
import { addBook, getPaginatedBooks, updateAvailabilityStatus } from "../controllers/Books.controller.js";
const router = Router()

router.get('/',getPaginatedBooks);
router.post('/',addBook);
router.patch('/:id',updateAvailabilityStatus);
export default router;