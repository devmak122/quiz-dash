const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    collegeName: { type: String },
    degree: { type: String },
    interestedSubject: { type: String },
    skillSets: { type: String },
    yearsOfExperience: { type: Number },
    resume: { type: String } // Store resume file path or URL
});

module.exports = mongoose.model('User', UserSchema);
