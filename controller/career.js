const CareerModel = require("../model/career"); 

const createCareer = async (req, res) => {
  try {
    const { userId, education, skills, isEmployed, company } = req.body;

    if (!userId || !education || !skills || isEmployed === undefined) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const careerObj = {
      userId,
      education,
      skills,
      isEmployed,
      company: isEmployed ? company : null
    };
    
    const career = await CareerModel.createCareer(careerObj);

    res.status(201).json({
      message: "Career entry created successfully",
      career,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateCareer = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if(Object.keys(updates).length === 0){
            return res.status(400).json({error: "Update at least one field"});
        }

        const existingCareer = await CareerModel.getCareerById(id);
        if (!existingCareer) {
            return res.status(404).json({ error: "Career not found" });
        }

        const updatedCareer = await CareerModel.updateCareer(id, updates)

        res.status(200).json({
            message: "Career updated successfully",
            career: updatedCareer
        });
    } catch (error) {
        console.error("Error updating career:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getAllCareers = async (req, res) => {
    try {
        const careers = await CareerModel.getAllCareers();
        
        if (careers.length === 0) {
            return res.status(404).json({ message: "No careers found" });
        }

        res.status(200).json({ careers });
    } catch (error) {
        console.error("Error fetching careers:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getCareer = async (req, res) => {
    try {
        const { id } = req.params;
        const career = await CareerModel.getCareerById(id);

        if (!career) {
            return res.status(404).json({ error: "Career not found" });
        }

        res.status(200).json({ career });
    } catch (error) {
        console.error("Error fetching career:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const deleteCareer = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedCareer = await CareerModel.removeCareer(id)

        if (!deletedCareer) {
            return res.status(404).json({ error: "Career not found" });
        }

        res.status(200).json({ message: "Career deleted successfully", career: deletedCareer });
    } catch (error) {
        console.error("Error deleting career:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};




module.exports = { createCareer, updateCareer, getAllCareers, getCareer, deleteCareer};
