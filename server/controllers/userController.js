const User = require('../models/User');

const createUserFromOmnidim = async (req, res) => {
  try {
    const { userId } = req.query;
    const embeddingStr = req.body?.call_report?.extracted_variables?.personality_embedding;

    if (!userId || !embeddingStr) {
      return res.status(400).json({
        success: false,
        error: 'userId and personality_embedding are required.'
      });
    }

    // Parse embedding string: "[2, 4, 2, 3, 2]" => [2, 4, 2, 3, 2]
    let embedding;
    try {
      embedding = JSON.parse(embeddingStr);
    } catch (err) {
      return res.status(400).json({ success: false, error: 'Invalid embedding format' });
    }

    if (!Array.isArray(embedding) || embedding.length !== 5) {
      return res.status(400).json({ success: false, error: 'Expected 5 trait scores in embedding' });
    }

    // Get user to access ageGroup
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, error: 'User not found' });
    }

    const traitKeysByGroup = {
      '16-18': ['sleepDiscipline', 'cleanliness', 'studyStyle', 'emotionalSupport', 'streamAffinity'],
      '18-25': ['cleanliness', 'noiseTolerance', 'guestComfort', 'itemSharing', 'emotionalSharing'],
      '25+': ['socialPreference', 'scheduleTolerance', 'partyOpenness', 'cleanliness', 'workLifeRespect'],
    };

    const traitKeys = traitKeysByGroup[user.ageGroup];
    if (!traitKeys) {
      return res.status(400).json({ success: false, error: `Invalid or missing ageGroup for user` });
    }

    // Map trait scores to structured object (score + dummy embedding)
    const traits = {};
    traitKeys.forEach((key, i) => {
      traits[key] = {
        score: embedding[i],
        embedding: [embedding[i]] // You can replace this with real vector data if you have it
      };
    });

    user.traits = traits;
    await user.save();

    return res.status(200).json({ success: true, user });

  } catch (error) {
    console.error('[ERROR in createUserFromOmnidim]', error);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createUserFromOmnidim };
