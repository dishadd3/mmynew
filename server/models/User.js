const mongoose = require('mongoose');

const allowedTraits = {
  '16-18': ['sleepDiscipline', 'cleanliness', 'studyStyle', 'emotionalSupport', 'streamAffinity'],
  '18-25': ['cleanliness', 'noiseTolerance', 'guestComfort', 'itemSharing', 'emotionalSharing'],
  '25+': ['socialPreference', 'scheduleTolerance', 'partyOpenness', 'cleanliness', 'workLifeRespect'],
};

const traitSubSchema = new mongoose.Schema({
  score: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  embedding: {
    type: [Number],  // array of numbers (embedding vector)
    required: true,
  }
}, { _id: false });

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },

  age: {
    type: Number,
    required: true,
    min: 16,
  },

  ageGroup: {
    type: String,
    enum: ['16-18', '18-25', '25+'],
    required: true,
  },

  traits: {
  type: [Number], // Array of numbers
  required: true,
}


}, { timestamps: true });

// Validation pre-save hook
userSchema.pre('save', function(next) {
  if (!this.ageGroup) {
    return next(new Error('ageGroup is required'));
  }

  const validTraits = allowedTraits[this.ageGroup];
  if (!validTraits) {
    return next(new Error(`Invalid ageGroup: ${this.ageGroup}`));
  }

  const traitsKeys = Array.from(this.traits.keys());
  const invalidTraits = traitsKeys.filter(t => !validTraits.includes(t));

  if (invalidTraits.length) {
    return next(new Error(`Invalid traits for age group ${this.ageGroup}: ${invalidTraits.join(', ')}`));
  }

  for (const [key, value] of this.traits.entries()) {
    if (typeof value.score !== 'number' || value.score < 0 || value.score > 10) {
      return next(new Error(`Trait score for ${key} must be a number between 0 and 10`));
    }

    if (!Array.isArray(value.embedding) || value.embedding.some(x => typeof x !== 'number')) {
      return next(new Error(`Trait embedding for ${key} must be an array of numbers`));
    }
  }

  next();
});

module.exports = mongoose.model('User', userSchema);
