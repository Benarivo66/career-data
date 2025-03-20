const mongoose = require("mongoose");

const CareerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    education: { type: String, required: true, trim: true },
    skills: { type: [String], required: true },
    isEmployed: { type: Boolean, required: true },
    company: { type: String, trim: true }
}, { timestamps: true });

const Career = mongoose.model("Career", CareerSchema);

module.exports = Career;
