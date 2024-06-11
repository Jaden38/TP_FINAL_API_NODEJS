const express = require('express');
const router = express.Router();
const stationController = require('../controllers/stationController');

/**
 * @swagger
 * tags:
 *   name: Stations
 *   description: Station management
 */

/**
 * @swagger
 * /stations:
 *   get:
 *     summary: Retrieve a list of stations
 *     tags: [Stations]
 *     responses:
 *       200:
 *         description: A list of stations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Station'
 */
router.get('/', stationController.getAllStations);

/**
 * @swagger
 * /stations/{id}:
 *   get:
 *     summary: Retrieve a single station
 *     tags: [Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The station id
 *     responses:
 *       200:
 *         description: A single station
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Station'
 *       404:
 *         description: Station not found
 */
router.get('/:id', stationController.getStationById);

/**
 * @swagger
 * /stations:
 *   post:
 *     summary: Create a new station
 *     tags: [Stations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Station'
 *     responses:
 *       201:
 *         description: The created station
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Station'
 *       400:
 *         description: Invalid input
 */
router.post('/', stationController.createStation);

/**
 * @swagger
 * /stations/{id}:
 *   put:
 *     summary: Update an existing station
 *     tags: [Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The station id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Station'
 *     responses:
 *       200:
 *         description: The updated station
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Station'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Station not found
 */
router.put('/:id', stationController.updateStation);

/**
 * @swagger
 * /stations/{id}:
 *   delete:
 *     summary: Delete a station
 *     tags: [Stations]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The station id
 *     responses:
 *       200:
 *         description: Station deleted
 *       404:
 *         description: Station not found
 */
router.delete('/:id', stationController.deleteStation);

module.exports = router;
