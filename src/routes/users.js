import { Router } from "express";

import createUser from "../services/users/createUser.js";
import deleteUserById from "../services/users/deleteUserById.js";
import getUserById from "../services/users/getUserById.js";
import getUsers from "../services/users/getUsers.js";
import updateUserById from "../services/users/updateUserById.js";

const router = Router();

// GET /users - fetch all users OR properties by username OR email query param
router.get("/", async (req, res, next) => {
  try {
    const { username, email } = req.query;
    const filters = {};

    if (username !== undefined) {
      if (typeof username !== "string" || username.trim() === "") {
        return res
          .status(400)
          .json({ error: "Invalid username query parameter" });
      }
      filters.username = username.trim();
    } else if (email !== undefined) {
      if (typeof email !== "string" || email.trim() === "") {
        return res.status(400).json({ error: "Invalid email query parameter" });
      }
      filters.email = email.trim();
    }

    const users = await getUsers(filters);

    // If a filter was applied but no users found → 404
    if ((username || email) && users.length === 0) {
      return res
        .status(404)
        .json({ error: "No users found matching the criteria" });
    }

    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

// GET /users/:id - get user by ID
router.get("/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
});

// POST /users - create a new user
router.post("/", async (req, res, next) => {
  try {
    const { username, name, password, email, phoneNumber, pictureUrl } =
      req.body;

    if (!username || !name || !password || !email) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newUser = await createUser(
      username,
      name,
      password,
      email,
      phoneNumber,
      pictureUrl
    );

    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});

// PUT /users/:id - update user by ID
router.put("/:id", async (req, res, next) => {
  try {
    const updatedUser = await updateUserById(req.params.id, req.body);
    if (!updatedUser) return res.status(404).json({ error: "User not found" });
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
});

// DELETE /users/:id - delete user by ID
router.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await deleteUserById(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    next(err);
  }
});

export default router;
