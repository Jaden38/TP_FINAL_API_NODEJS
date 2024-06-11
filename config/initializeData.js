const Line = require('../models/line');
const Station = require('../models/station');
const City = require('../models/city');

const initializeData = async () => {
    try {
        // Check if lines exist
        const lineCount = await Line.countDocuments();
        let ligneParisLyon, ligneLyonMarseille;
        if (lineCount === 0) {
            ligneParisLyon = new Line({ name: 'Ligne Paris-Lyon', nature: 'tourisme', stations: [], cities: [] });
            ligneLyonMarseille = new Line({ name: 'Ligne Lyon-Marseille', nature: 'fret', stations: [], cities: [] });
            ligneGrenobleLyon = new Line({ name: 'Ligne Grenoble-Lyon', nature: 'tourisme', stations: [], cities: [] });
            await ligneParisLyon.save();
            await ligneLyonMarseille.save();
            console.log('Lines initialized');
        } else {
            ligneParisLyon = await Line.findOne({ name: 'Ligne Paris-Lyon' });
            ligneLyonMarseille = await Line.findOne({ name: 'Ligne Lyon-Marseille' });
            ligneGrenobleLyon = await Line.findOne({ name: 'Ligne Grenoble-Lyon' });
        }

        // Check if stations exist
        const stationCount = await Station.countDocuments();
        let gareDeLyon, gareDeMarseille, gareDeParisLyon, gareDeReaumont, gareDeGrenoble;
        if (stationCount === 0) {
            gareDeLyon = new Station({ name: 'Gare de Lyon', cities: [], lines: [] });
            gareDeMarseille = new Station({ name: 'Gare de Marseille-Saint-Charles', cities: [], lines: [] });
            gareDeParisLyon = new Station({ name: 'Gare de Paris-Gare-de-Lyon', cities: [], lines: [] });
            gareDeMontparnasse = new Station({ name: 'Gare de Montparnasse', cities: [], lines: [] });
            gareDeReaumont = new Station({ name: 'Gare de Réaumont / Saint Cassien', cities: [], lines: [] });
            gareDeGrenoble = new Station({ name: 'Gare de Grenoble', cities: [], lines: [] });
            await gareDeLyon.save();
            await gareDeMarseille.save();
            await gareDeParisLyon.save();
            await gareDeMontparnasse.save();
            await gareDeReaumont.save();
            console.log('Stations initialized');
        } else {
            gareDeLyon = await Station.findOne({ name: 'Gare de Lyon' });
            gareDeMarseille = await Station.findOne({ name: 'Gare de Marseille-Saint-Charles' });
            gareDeParisLyon = await Station.findOne({ name: 'Gare de Paris-Gare-de-Lyon' });
            gareDeMontparnasse = await Station.findOne({ name: 'Gare de Montparnasse' });
            gareDeReaumont = await Station.findOne({ name: 'Gare de Réaumont / Saint Cassien' });
            gareDeGrenoble = await Station.findOne({ name: 'Gare de Grenoble' });
        }

        // Check if cities exist
        const cityCount = await City.countDocuments();
        let paris, lyon, marseille, reaumont, saintCassien, grenoble;
        if (cityCount === 0) {
            paris = new City({ name: 'Paris', stations: [], lines: [] });
            lyon = new City({ name: 'Lyon', stations: [], lines: [] });
            marseille = new City({ name: 'Marseille', stations: [], lines: [] });
            reaumont = new City({ name: 'Réaumont', stations: [], lines: [] });
            saintCassien = new City({ name: 'Saint Cassien', stations: [], lines: [] });
            grenoble = new City({ name: 'Grenoble', stations: [], lines: [] });
            await paris.save();
            await lyon.save();
            await marseille.save();
            await reaumont.save();
            await saintCassien.save();
            await grenoble.save();
            console.log('Cities initialized');
        } else {
            paris = await City.findOne({ name: 'Paris' });
            lyon = await City.findOne({ name: 'Lyon' });
            marseille = await City.findOne({ name: 'Marseille' });
            reaumont = await City.findOne({ name: 'Réaumont' });
            saintCassien = await City.findOne({ name: 'Saint Cassien' });
            grenoble = await City.findOne({ name: 'Grenoble' });
        }

        const updateStationLineLink = async (station, line) => {
            if (station && line && !station.lines.includes(line._id)) {
                station.lines.push(line._id);
                await station.save();
            }
            if (line && station && !line.stations.includes(station._id)) {
                line.stations.push(station._id);
                await line.save();
            }
        };

        await updateStationLineLink(gareDeLyon, ligneParisLyon);
        await updateStationLineLink(gareDeLyon, ligneLyonMarseille);
        await updateStationLineLink(gareDeLyon, ligneGrenobleLyon);

        await updateStationLineLink(gareDeMarseille, ligneLyonMarseille);

        await updateStationLineLink(gareDeParisLyon, ligneParisLyon);

        await updateStationLineLink(gareDeReaumont, ligneGrenobleLyon);

        await updateStationLineLink(gareDeGrenoble, ligneGrenobleLyon);


        const updateCityStationLink = async (city, station) => {
            if (city && station && !city.stations.includes(station._id)) {
                city.stations.push(station._id);
                await city.save();
            }
            if (station && city && !station.cities.includes(city._id)) {
                station.cities.push(city._id);
                await station.save();
            }
        };

        await updateCityStationLink(paris, gareDeParisLyon);
        await updateCityStationLink(paris, gareDeMontparnasse);
        await updateCityStationLink(lyon, gareDeLyon);
        await updateCityStationLink(marseille, gareDeMarseille);
        await updateCityStationLink(reaumont, gareDeReaumont);
        await updateCityStationLink(saintCassien, gareDeReaumont);
        await updateCityStationLink(grenoble, gareDeGrenoble);

        const updateCityLineLink = async (city, line) => {
            if (city && line && !city.lines.includes(line._id)) {
                city.lines.push(line._id);
                await city.save();
            }
            if (line && city && !line.cities.includes(city._id)) {
                line.cities.push(city._id);
                await line.save();
            }
        };

        await updateCityLineLink(paris, ligneParisLyon);
        await updateCityLineLink(lyon, ligneParisLyon);
        await updateCityLineLink(lyon, ligneLyonMarseille);
        await updateCityLineLink(lyon, ligneGrenobleLyon);
        await updateCityLineLink(marseille, ligneLyonMarseille);
        await updateCityLineLink(reaumont, ligneGrenobleLyon);
        await updateCityLineLink(saintCassien, ligneGrenobleLyon);
        await updateCityLineLink(grenoble, ligneGrenobleLyon);

        console.log('Database initialization complete');
    } catch (error) {
        console.error('Error initializing database:', error);
    }
};

module.exports = initializeData;
