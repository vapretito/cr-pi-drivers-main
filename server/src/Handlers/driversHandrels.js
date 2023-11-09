const { getAllDrivers } = require ("../Controllers/driversControllers");



const getAllDriversHandler = async (req,res) => {
    try {
        const response = await getAllDrivers();
        res.status(200).json(response);
        
    } catch (error) {
        res.status(400).send({ error: error.message});
        
    }
}

module.exports = { getAllDriversHandler};
