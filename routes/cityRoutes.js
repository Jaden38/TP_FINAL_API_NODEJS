const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

/**
 * @swagger
 * tags:
 *   name: Cities
 *   description: City management
 */

/**
 * @swagger
 * /cities:
 *   get:
 *     summary: Retrieve a list of cities
 *     tags: [Cities]
 *     responses:
 *       200:
 *         description: A list of cities
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 */
router.get('/', cityController.getAllCities);

/**
 * @swagger
 * /cities/{id}:
 *   get:
 *     summary: Retrieve a single city
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The city id
 *     responses:
 *       200:
 *         description: A single city
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       404:
 *         description: City not found
 */
router.get('/:id', cityController.getCityById);

/**
 * @swagger
 * /cities:
 *   post:
 *     summary: Create a new city
 *     tags: [Cities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/City'
 *     responses:
 *       201:
 *         description: The created city
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       400:
 *         description: Invalid input
 */
router.post('/', cityController.createCity);

/**
 * @swagger
 * /cities/{id}:
 *   put:
 *     summary: Update an existing city
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The city id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/City'
 *     responses:
 *       200:
 *         description: The updated city
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/City'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: City not found
 */
router.put('/:id', cityController.updateCity);

/**
 * @swagger
 * /cities/{id}:
 *   delete:
 *     summary: Delete a city
 *     tags: [Cities]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The city id
 *     responses:
 *       200:
 *         description: City deleted
 *       404:
 *         description: City not found
 */
router.delete('/:id', cityController.deleteCity);

module.exports = router;
