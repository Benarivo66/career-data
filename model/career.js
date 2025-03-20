const Career = require("../schema/career");

const createCareer = (newUserObj) => {
  const career = new Career(newUserObj);
  return career.save();
};

const getAllCareers = () => {
  return Career.find();
};

const getCareerById = (id) => {
  return Career.findById(id);
};

const updateCareer = (id, updateObj) => {
  return Career.findByIdAndUpdate(id, updateObj, {
    new: true,
    runValidators: true,
  });
};

const removeCareer = (id) => {
  return Career.findByIdAndDelete(id);
};

module.exports = {
  createCareer,
  getAllCareers,
  getCareerById,
  updateCareer,
  removeCareer,
};
