//Script pour ajouter un utilisateur à la base de données MongoDB (exécuté avec node addUser.js <username> <password>)

const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/user');

dotenv.config();

const addUser = async (username, password) => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const user = new User({
    username,
    password,
    createdAt: new Date(),
    updatedAt: new Date()
  });

  await user.save();
  console.log(`User ${username} added successfully`);

  await mongoose.disconnect();
};

const username = process.argv[2];
const password = process.argv[3];

if (!username || !password) {
  console.log('Usage: node addUser.js <username> <password>');
  process.exit(1);
}

addUser(username, password);
