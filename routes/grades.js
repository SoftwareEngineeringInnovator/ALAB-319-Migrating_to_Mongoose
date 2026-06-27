import express from "express";
import Grade from "../models/Grades.js";

const router = express.Router();

// Create a single grade entry
router.post("/", async (req, res) => {
  try {
    let newDocument = req.body;

    // Rename fields for backwards compatibility.
    if (newDocument.student_id) {
      newDocument.learner_id = newDocument.student_id;
      delete newDocument.student_id;
    }

    const result = await Grade.create(newDocument);

    res.status(201).send(result);
  } catch (error) {
    console.error("Create grade error:", error);
    res.status(500).send({ error: "Failed to create grade entry." });
  }
});

// Get a single grade entry
router.get("/:id", async (req, res) => {
  try {
    const result = await Grade.findById(req.params.id);

    if (!result) {
      return res.status(404).send("Not found");
    }

    res.status(200).send(result);
  } catch (error) {
    console.error("Get grade error:", error);
    res.status(500).send({ error: "Failed to get grade entry." });
  }
});

// Add a score to a grade entry
router.patch("/:id/add", async (req, res) => {
  try {
    const result = await Grade.findByIdAndUpdate(
      req.params.id,
      { $push: { scores: req.body } },
      { new: true });

    if (!result) {
      return res.status(404).send("Not found");
    }

    res.status(200).send(result);
  } catch (error) {
    console.error("Add score error:", error);
    res.status(500).send({ error: "Failed to add score." });
  }
});

// Remove a score from a grade entry
router.patch("/:id/remove", async (req, res) => {
  try {
    const result = await Grade.findByIdAndUpdate(
      req.params.id,
      { $pull: { scores: req.body } },
      { new: true });

    if (!result) {
      return res.status(404).send("Not found");
    }

    res.status(200).send(result);
  } catch (error) {
    console.error("Remove score error:", error);
    res.status(500).send({ error: "Failed to remove score." });
  }
});

// Delete a single grade entry
router.delete("/:id", async (req, res) => {
  try {
    const result = await Grade.findByIdAndDelete(req.params.id);

    if (!result) {
      return res.status(404).send("Not found");
    }

    res.status(200).send(result);
  } catch (error) {
    console.error("Delete grade error:", error);
    res.status(500).send({ error: "Failed to delete grade entry." });
  }
});

// Get route for backwards compatibility
router.get("/student/:id", async (req, res) => {
  res.redirect(`learner/${req.params.id}`);
});

// Get a learner's grade data
router.get("/learner/:id", async (req, res) => {
  try {
    let query = { learner_id: Number(req.params.id) };

    // Check for class_id parameter.
    // Example: /grades/learner/9999?class=1234
    if (req.query.class) {
      query.class_id = Number(req.query.class);
    }

    const result = await Grade.find(query);

    if (result.length === 0) {
      return res.status(404).send("Not found");
    }

    res.status(200).send(result);
  } catch (error) {
    console.error("Get learner grades error:", error);
    res.status(500).send({ error: "Failed to get learner grade data." });
  }
});

// Delete a learner's grade data
router.delete("/learner/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { learner_id: Number(req.params.id) };

  let result = await collection.deleteOne(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Get a class's grade data
router.get("/class/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { class_id: Number(req.params.id) };

  // Check for learner_id parameter
  if (req.query.learner) query.learner_id = Number(req.query.learner);

  let result = await collection.find(query).toArray();

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Update a class id
router.patch("/class/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { class_id: Number(req.params.id) };

  let result = await collection.updateMany(query, {
    $set: { class_id: req.body.class_id }
  });

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

// Delete a class
router.delete("/class/:id", async (req, res) => {
  let collection = await db.collection("grades");
  let query = { class_id: Number(req.params.id) };

  let result = await collection.deleteMany(query);

  if (!result) res.send("Not found").status(404);
  else res.send(result).status(200);
});

export default router;
