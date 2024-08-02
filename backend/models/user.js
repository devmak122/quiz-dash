const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: function() { return !this.googleId && !this.githubId && !this.linkedinId; } }, 
    password: { type: String, required: function() { return !this.googleId && !this.githubId && !this.linkedinId; } }, 
    collegeName: { type: String },
    degree: { type: String },
    interestedSubject: { type: String },
    skillSets: { type: String },
    yearsOfExperience: { type: Number },
    resume: { type: String }, // Store resume file path or URL
    googleId: { type: String, unique: true, sparse: true },
    githubId: { type: String, unique: true, sparse: true },
    linkedinId: { type: String, unique: true, sparse: true }
});

module.exports = mongoose.model('User', UserSchema);
