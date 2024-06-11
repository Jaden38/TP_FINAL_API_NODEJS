const Station = require('../models/station');

// Récupère toutes les stations
exports.getAllStations = async (req, res) => {
  try {
    const stations = await Station.find().populate('cities lines');
    res.json(stations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupère une station par son ID
exports.getStationById = async (req, res) => {
  try {
    const station = await Station.findById(req.params.id).populate('cities lines');
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.json(station);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crée une nouvelle station
exports.createStation = async (req, res) => {
  const station = new Station(req.body);
  try {
    const newStation = await station.save();
    res.status(201).json(newStation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Met à jour une station
exports.updateStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.json(station);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprime une station
exports.deleteStation = async (req, res) => {
  try {
    const station = await Station.findByIdAndDelete(req.params.id);
    if (!station) return res.status(404).json({ message: 'Station not found' });
    res.json({ message: 'Station deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
