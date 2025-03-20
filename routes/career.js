const express = require("express");
const { createCareer, getAllCareers, getCareer, updateCareer, deleteCareer } = require("../controller/career");
const router = express.Router();
const validate = require("../middleware/career");

router.post("/", validate.createCareerRules(), validate.careerData, createCareer);
router.put("/:id", validate.updateCareerRules(), validate.careerData, updateCareer);
router.get("/:id", getCareer);
router.get("/", getAllCareers);
router.delete("/:id", deleteCareer);

module.exports = router;
