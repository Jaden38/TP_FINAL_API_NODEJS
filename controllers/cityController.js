const City = require('../models/city');

// Récupère toutes les villes
exports.getAllCities = async (req, res) => {
  try {
    const cities = await City.find().populate('stations');
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Récupère une ville par son ID
exports.getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id).populate('stations');
    if (!city) return res.status(404).json({ message: 'City not found' });
    res.json(city);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Crée une nouvelle ville
exports.createCity = async (req, res) => {
  const city = new City(req.body);
  try {
    const newCity = await city.save();
    res.status(201).json(newCity);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Met à jour une ville
exports.updateCity = async (req, res) => {
  try {
    const city = await City.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!city) return res.status(404).json({ message: 'City not found' });
    res.json(city);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Supprime une ville
exports.deleteCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) return res.status(404).json({ message: 'City not found' });
    res.json({ message: 'City deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
