const User = require('../models/User');
const { spawn } = require('child_process');

// Dummy registration (Onboarding)
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, age, location, budget } = req.body;

    let ageGroup = '';
    if (age >= 16 && age <= 18) ageGroup = '16-18';
    else if (age > 18 && age <= 25) ageGroup = '18-25';
    else if (age > 25) ageGroup = '25+';

    const user = new User({ name, email, phone, age, ageGroup, location, budget, traits: {} });
    await user.save();

    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Dummy login
exports.loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    // ✅ Trigger the Python script
    const python = spawn('python3', ['scripts/create_agent.py', user.phone, user.email]);

    python.stdout.on('data', (data) => {
      console.log(`Omnidim stdout: ${data}`);
    });

    python.stderr.on('data', (data) => {
      console.error(`Omnidim stderr: ${data}`);
    });

    python.on('close', (code) => {
      console.log(`Omnidim script exited with code ${code}`);
    });

    return res.status(200).json({
      message: 'Login successful, Omnidim agent triggered',
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

