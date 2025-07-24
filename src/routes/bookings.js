import { Router } from "express";

import createBooking from "../services/bookings/createBooking.js";
import deleteBookingById from "../services/bookings/deleteBookingById.js";
import getBookingById from "../services/bookings/getBookingById.js";
import getBookings from "../services/bookings/getBookings.js";
import updateBookingById from "../services/bookings/updateBookingById.js";
import getUserById from "../services/users/getUserById.js";

const router = Router();

// GET /bookings - fetch all bookings OR bookings by userId query param
router.get("/", async (req, res, next) => {
  try {
    const { userId } = req.query;
    const filters = {};

    if (userId) {
      if (typeof userId !== "string" || userId.trim() === "") {
        return res.status(400).json({ error: "Invalid userId" });
      }

      // Check if userId exists in DB
      const userExists = await getUserById(userId);
      if (!userExists) {
        return res.status(404).json({ error: "User not found" });
      }

      filters.userId = userId;
    }

    const bookings = await getBookings(filters);

    if (userId && bookings.length === 0) {
      return res.status(404).json({ error: "No bookings found for this user" });
    }

    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
});

// GET /bookings/:id - fetch booking by ID
router.get("/:id", async (req, res, next) => {
  try {
    const booking = await getBookingById(req.params.id);
    if (!booking) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
});

// POST /bookings - create a new booking
router.post("/", async (req, res, next) => {
  try {
    const {
      userId,
      propertyId,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus,
    } = req.body;

    if (
      !userId ||
      !propertyId ||
      !checkInDate ||
      !checkOutDate ||
      !numberOfGuests ||
      !totalPrice ||
      !bookingStatus
    ) {
      return res.status(400).json({ error: "Missing required booking fields" });
    }

    const newBooking = await createBooking(
      userId,
      propertyId,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      totalPrice,
      bookingStatus
    );

    res.status(201).json(newBooking);
  } catch (err) {
    next(err);
  }
});

// PUT /bookings/:id - update booking by ID
router.put("/:id", async (req, res, next) => {
  try {
    const updatedBooking = await updateBookingById(req.params.id, req.body);
    if (!updatedBooking)
      return res.status(404).json({ error: "Booking not found" });
    res.status(200).json(updatedBooking);
  } catch (err) {
    next(err);
  }
});

// DELETE /bookings/:id - delete booking by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await deleteBookingById(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Booking not found" });
    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
