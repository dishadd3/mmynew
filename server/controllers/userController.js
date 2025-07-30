const User = require('../models/User');

const createUserFromOmnidim = async (req, res) => {
  try {
    const { userId, traits } = req.query;

    if (!userId || !traits) {
      return res.status(400).json({ success: false, error: 'userId and traits are required' });
    }

    const traitsArray = traits.split(',').map((val) => {
      const num = parseFloat(val);
      if (isNaN(num)) throw new Error(`Invalid trait value: ${val}`);
      return num;
    });

    const user = await User.findByIdAndUpdate(
      userId,
      { traits: traitsArray },
      { new: true, upsert: true }
    );

    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('[ERROR in createUserFromOmnidim]', error.message);
    return res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createUserFromOmnidim };
