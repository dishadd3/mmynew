const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');
dotenv.config();


mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  const dummyUser = new User({
    name: 'Dummy User',
    email: 'dummy@demo.com',
    age: 20,
    ageGroup: '18-25',
    traits: {} 
  });

  const saved = await dummyUser.save();
  console.log('Dummy user created with ID:', saved._id);
  process.exit(0);
}).catch(err => {
  console.error('DB connection error:', err);
  process.exit(1);
});
