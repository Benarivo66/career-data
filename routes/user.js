const express = require("express");
const { createUser, updateUser, getAllUsers, getOneUser, deleteUser } = require("../controller/user");
const router = express.Router();
const validate = require("../middleware/user");

router.post("/", validate.createUserRules(), validate.userData, createUser);
router.put("/:id", validate.updateUserRules(), validate.userData, updateUser);
router.get("/:id", getOneUser);
router.get("/", getAllUsers);
router.delete("/:id", deleteUser);

module.exports = router;
