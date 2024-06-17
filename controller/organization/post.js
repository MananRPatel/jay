require("dotenv").config;
const Auth = require("../auth/auth");
const organizationModel = require("../../model/organizationModel");
const eventModel = require("../../model/eventModel");
const postModel = require("../../model/postModel");

const addPost = async (req, res) => {

    const { name, description,eventID} = req.body

    // Validate the input
    if (!name ||
        !description ||
        !eventID) {
        return res
            .status(400)
            .json({ message: "name,description,eventID are required" });
    
        }



    if (!(await eventModel.isValidEventManager(eventID,req.token.id))) return res
        .status(403)
        .json({ message: "Valid Manager only" });




    const post = {
        name,
        description,
        eventID
    }

    await postModel.addPost(post);

    res.status(201).json({ message: "event created successfully" });

}


const getPosts = async (req, res) => {
    if(await organizationModel.isEventOrganizationJointByUser(req.token.id,req.params.eventID)){
        return res.status(201).json({ data: await postModel.getPosts(req.params.eventID) })
    }
    return res
            .status(400)
            .json({ message: "need to join organization first" });
}



module.exports = { addPost,getPosts }; 