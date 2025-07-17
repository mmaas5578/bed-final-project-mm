import { Router } from "express";

import createProperty from "../services/properties/createProperty.js";
import deletePropertyById from "../services/properties/deletePropertyById.js";
import getPropertyById from "../services/properties/getPropertyById.js";
import getProperties from "../services/properties/getProperties.js";
import updatePropertyById from "../services/properties/updatePropertyById.js";

const router = Router();

// GET /properties - fetch all properties OR properties by location AND/ OR pricePerNight query params
router.get("/", async (req, res, next) => {
  try {
    const { location, pricePerNight } = req.query;
    const filters = {};

    // Validate location - must be non-empty string if provided
    if (location !== undefined) {
      if (typeof location !== "string" || location.trim() === "") {
        return res
          .status(400)
          .json({ error: "Invalid location query parameter" });
      }
      filters.location = location.trim();
    }

    // Validate pricePerNight - must be a valid number if provided
    if (pricePerNight !== undefined) {
      const parsedPrice = parseFloat(pricePerNight);
      if (isNaN(parsedPrice)) {
        return res
          .status(400)
          .json({ error: "Invalid pricePerNight query parameter" });
      }
      filters.pricePerNight = parsedPrice;
    }

    const properties = await getProperties(filters);

    // Return 404 if filters were provided but no results found
    if ((location || pricePerNight) && properties.length === 0) {
      return res
        .status(404)
        .json({ error: "No properties found matching the criteria" });
    }

    res.status(200).json(properties);
  } catch (err) {
    next(err);
  }
});

// GET /properties/:id - fetch property by ID
router.get("/:id", async (req, res, next) => {
  try {
    const property = await getPropertyById(req.params.id);
    if (!property) return res.status(404).json({ error: "Property not found" });
    res.status(200).json(property);
  } catch (err) {
    next(err);
  }
});

// POST /properties - create a new property
router.post("/", async (req, res, next) => {
  try {
    const {
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating,
    } = req.body;

    if (!hostId || !title || !pricePerNight || !location) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newProperty = await createProperty(
      hostId,
      title,
      description,
      location,
      pricePerNight,
      bedroomCount,
      bathRoomCount,
      maxGuestCount,
      rating
    );

    res.status(201).json(newProperty);
  } catch (err) {
    next(err);
  }
});

// PUT /properties/:id - update property by ID
router.put("/:id", async (req, res, next) => {
  try {
    const updatedProperty = await updatePropertyById(req.params.id, req.body);
    if (!updatedProperty)
      return res.status(404).json({ error: "Property not found" });
    res.status(200).json(updatedProperty);
  } catch (err) {
    next(err);
  }
});

// DELETE /properties/:id - delete property by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await deletePropertyById(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Property not found" });
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
