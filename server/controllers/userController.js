const User = require('../models/User');

const receiveOmnidimData = async (req, res) => {
  try {
    const {
      call_id,
      user_email,
      phone_number,
      call_report
    } = req.body;

    const { summary, sentiment, extracted_variables, interactions, recording_url } = call_report;
    const traitsArray = JSON.parse(extracted_variables.personality_embedding || "[]");

    const user = await User.findOne({
      $or: [
        { email: user_email },
        { phone: phone_number }
      ]
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found with given phone or email' });
    }

    user.traits = traitsArray;
    user.personalitySummary = summary;
    user.sentiment = sentiment;
    user.callRecordingUrl = recording_url;
    user.callId = call_id;
    user.interactions = interactions;

    await user.save();

    return res.status(200).json({ success: true, message: 'User updated with Omnidim data' });
  } catch (err) {
    console.error('[ERROR: receiveOmnidimData]', err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { receiveOmnidimData };
