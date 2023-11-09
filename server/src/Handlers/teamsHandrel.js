const { getAllTeams } = require ("../Controllers/teamsControllers")

 const getAllTeamsHandrels = async (req,res ) => {
     try {
        teamName = await getAllTeams ()
        res.status (200).json(teamName);
        
     } catch (error) {
        res.status(400).json ({error: error.message})
        
     }
 }
 module.exports ={
    
    getAllTeamsHandrels

}