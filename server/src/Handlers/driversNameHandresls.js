const   {getByName} = require ("../Controllers/driversNameControllers")


const getDriverByNameHandrel = async (req,res) => {
    try {
        const { name } = req.query;
        const response = await getByName(name);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = getDriverByNameHandrel;