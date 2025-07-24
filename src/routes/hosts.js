import { Router } from "express";

import createHost from "../services/hosts/createHost.js";
import deleteHostById from "../services/hosts/deleteHostById.js";
import getHostById from "../services/hosts/getHostById.js";
import getHosts from "../services/hosts/getHosts.js";
import updateHostById from "../services/hosts/updateHostById.js";

const router = Router();

// GET /hosts - fetch all hosts OR hosts by name query param
router.get("/", async (req, res, next) => {
  try {
    const filters = {};

    if (req.query.name) {
      const name = req.query.name.trim();
      if (!name) {
        return res.status(400).json({ error: "Invalid name query parameter" });
      }
      filters.name = name;
    }

    const hosts = await getHosts(filters);

    if (filters.name && hosts.length === 0) {
      return res.status(404).json({ error: "No hosts found with that name" });
    }

    res.status(200).json(hosts);
  } catch (err) {
    next(err);
  }
});

// GET /hosts/:id - fetch host by ID
router.get("/:id", async (req, res, next) => {
  try {
    const host = await getHostById(req.params.id);
    if (!host) return res.status(404).json({ error: "Host not found" });
    res.status(200).json(host);
  } catch (err) {
    next(err);
  }
});

// POST /hosts - create a new host
router.post("/", async (req, res, next) => {
  try {
    const {
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe,
    } = req.body;

    if (!username || !password || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if host already exists (username or email)
    const existingHost = await prisma.host.findFirst({
      where: {
        OR: [{ username: username }, { email: email }],
      },
    });

    if (existingHost) {
      return res.status(409).json({ error: "Host already exists" });
    }

    const newHost = await createHost(
      username,
      password,
      name,
      email,
      phoneNumber,
      profilePicture,
      aboutMe
    );

    res.status(201).json(newHost);
  } catch (err) {
    next(err);
  }
});

// PUT /hosts/:id - update host by ID
router.put("/:id", async (req, res, next) => {
  try {
    const updatedHost = await updateHostById(req.params.id, req.body);
    if (!updatedHost) return res.status(404).json({ error: "Host not found" });
    res.status(200).json(updatedHost);
  } catch (err) {
    next(err);
  }
});

// DELETE /hosts/:id - delete host by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await deleteHostById(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Host not found" });
    res.status(200).json({ message: "Host deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
