const createDriver = require ("../Controllers/driversPostControllers");


const postDriver = async (req,res) => {
    const {forename, surname, description, image, nationality, dob, teams} = req.body;


    try {

        const postDriver = await createDriver (forename, surname, description, image, nationality, dob, teams);
        res.status(200).json({newDriver: postDriver});

        
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
}
 
module.exports = postDriver