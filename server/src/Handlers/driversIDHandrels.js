const  {getById}  = require ("../Controllers/driversIDControllers")


const getIDHandlers = async (req,res) => {

const { idDriver } = req.params;

try {
    const response = await getById(idDriver);
    res.status(200).json(response)
    
} catch (error) {
    console.log("error", error.message);
    res.status(400).send(error.message)
    
}
};

module.exports = { getIDHandlers };