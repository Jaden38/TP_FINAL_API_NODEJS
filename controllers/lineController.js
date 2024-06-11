const Line = require('../models/line');

// Récupère toutes les lignes
exports.getAllLines = async (req, res) => {
  try {
    const lines = await Line.find().populate('stations');
    res.json(lines);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupère une ligne par son ID
exports.getLineById = async (req, res) => {
  try {
    const line = await Line.findById(req.params.id).populate('stations');
    if (!line) return res.status(404).json({ message: 'Line not found' });
    res.json(line);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crée une nouvelle ligne
exports.createLine = async (req, res) => {
  const line = new Line(req.body);
  try {
    const newLine = await line.save();
    res.status(201).json(newLine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Met à jour une ligne
exports.updateLine = async (req, res) => {
  try {
    const line = await Line.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!line) return res.status(404).json({ message: 'Line not found' });
    res.json(line);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprime une ligne
exports.deleteLine = async (req, res) => {
  try {
    const line = await Line.findByIdAndDelete(req.params.id);
    if (!line) return res.status(404).json({ message: 'Line not found' });
    res.json({ message: 'Line deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
