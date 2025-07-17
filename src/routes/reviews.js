import { Router } from "express";

import createReview from "../services/reviews/createReview.js";
import deleteReviewById from "../services/reviews/deleteReviewById.js";
import getReviewById from "../services/reviews/getReviewById.js";
import getReviews from "../services/reviews/getReviews.js";
import updateReviewById from "../services/reviews/updateReviewById.js";

const router = Router();

//GET /reviews — fetch all reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  } catch (err) {
    next(err);
  }
});

// GET /reviews/:id — fetch review by ID
router.get("/:id", async (req, res, next) => {
  try {
    const review = await getReviewById(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.status(200).json(review);
  } catch (err) {
    next(err);
  }
});

// POST /reviews — create a new review
router.post("/", async (req, res, next) => {
  try {
    const { propertyId, userId, rating, comment } = req.body;

    if (!propertyId || !userId || typeof rating !== "number") {
      return res.status(400).json({ error: "Missing required review fields" });
    }

    const newReview = await createReview(propertyId, userId, rating, comment);

    res.status(201).json(newReview);
  } catch (err) {
    next(err);
  }
});

// PUT /reviews/:id — update an review by ID
router.put("/:id", async (req, res, next) => {
  try {
    const updatedReview = await updateReviewById(req.params.id, req.body);
    if (!updatedReview)
      return res.status(404).json({ error: "Review not found" });
    res.status(200).json(updatedReview);
  } catch (err) {
    next(err);
  }
});

// DELETE /reviews/:id — delete review by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await deleteReviewById(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Review not found" });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
