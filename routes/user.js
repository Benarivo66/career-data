const express = require("express");
const { createUser, updateUser, getAllUsers, getOneUser, deleteUser } = require("../controller/user");
const router = express.Router();
const validate = require("../middleware/user");

router.post("/", validate.createUserRules(), validate.userData, createUser);
/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update user information
 *     description: Update a user's details by their ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *         description: The user's ID.
 *       - in: body
 *         name: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             firstName:
 *               type: string
 *               example: "John"
 *             lastName:
 *               type: string
 *               example: "Doe"
 *             email:
 *               type: string
 *               example: "john.doe@example.com"
 *             phone:
 *               type: string
 *               example: "1234567890"
 *     responses:
 *       200:
 *         description: User updated successfully.
 *       400:
 *         description: Bad request (missing fields or invalid input).
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal Server Error.
 */
router.put("/:id", validate.updateUserRules(), validate.userData, updateUser);

router.put("/:id", updateUser);
router.get("/:id", getOneUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

module.exports = router;
