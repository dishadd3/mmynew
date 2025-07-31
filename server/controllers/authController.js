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

    
    const python = spawn('python3', ['scripts/create_agent.py', user.phone, user.email]);

    let output = '';
    let errorOutput = '';

    // Collect stdout data
    python.stdout.on('data', (data) => {
      output += data.toString();
    });

    // Collect stderr data
    python.stderr.on('data', (data) => {
      errorOutput += data.toString();
    });

    // When script closes, log output and errors
    python.on('close', (code) => {
      console.log(`Omnidim script exited with code ${code}`);
      console.log('Omnidim stdout:', output);
      if (errorOutput) {
        console.error('Omnidim stderr:', errorOutput);
      }
    });

    return res.status(200).json({
      message: 'Login successful, Omnidim agent triggered',
      user
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

