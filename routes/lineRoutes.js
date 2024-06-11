const express = require('express');
const router = express.Router();
const lineController = require('../controllers/lineController');

/**
 * @swagger
 * tags:
 *   name: Lines
 *   description: Line management
 */

/**
 * @swagger
 * /lines:
 *   get:
 *     summary: Retrieve a list of lines
 *     tags: [Lines]
 *     responses:
 *       200:
 *         description: A list of lines
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Line'
 */
router.get('/', lineController.getAllLines);

/**
 * @swagger
 * /lines/{id}:
 *   get:
 *     summary: Retrieve a single line
 *     tags: [Lines]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The line id
 *     responses:
 *       200:
 *         description: A single line
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Line'
 *       404:
 *         description: Line not found
 */
router.get('/:id', lineController.getLineById);

/**
 * @swagger
 * /lines:
 *   post:
 *     summary: Create a new line
 *     tags: [Lines]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Line'
 *     responses:
 *       201:
 *         description: The created line
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Line'
 *       400:
 *         description: Invalid input
 */
router.post('/', lineController.createLine);

/**
 * @swagger
 * /lines/{id}:
 *   put:
 *     summary: Update an existing line
 *     tags: [Lines]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The line id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Line'
 *     responses:
 *       200:
 *         description: The updated line
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Line'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Line not found
 */
router.put('/:id', lineController.updateLine);

/**
 * @swagger
 * /lines/{id}:
 *   delete:
 *     summary: Delete a line
 *     tags: [Lines]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The line id
 *     responses:
 *       200:
 *         description: Line deleted
 *       404:
 *         description: Line not found
 */
router.delete('/:id', lineController.deleteLine);

module.exports = router;
