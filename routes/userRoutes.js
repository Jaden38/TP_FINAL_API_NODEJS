const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

/**
 * @swagger
 * /authenticate:
 *   post:
 *     summary: Authenticate a user and generate a token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Server error
 */

// Route pour ajouter un utilisateur
router.post('/authenticate', async (req, res) => {
  const { username, password } = req.body;

  try {
    console.log('Authenticating user:', username);

    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    // Compare le mot de passe fourni avec le hash stocké
    bcrypt.compare(password, user.password, function(err, isMatch) {
      if (err) {
        console.error('Error during password comparison:', err);
        return res.status(500).json({ message: 'Server error' });
      }

      // Si les mots de passe ne correspondent pas
      if (!isMatch) {
        console.log('Password does not match');
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      // Génère un token d'authentification
      const token = jwt.sign({ userId: user._id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
      console.log('Authentication successful, token generated');
      res.json({ token });
    });
  } catch (err) {
    console.error('Error during authentication:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
