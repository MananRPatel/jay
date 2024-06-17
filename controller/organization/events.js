require("dotenv").config;
const Auth = require("../auth/auth");
const organizationModel = require("../../model/organizationModel");
const eventModel = require("../../model/eventModel");

const addEvents = async (req, res) => {


    const { name, description, date, location, orgID } = req.body
    if (!(await Auth.isValidManager(await organizationModel.getOrganizationsByManager(req.token.id)))) return res
        .status(403)
        .json({ message: "Valid Manager only" });


    // Validate the input
    if (!name ||
        !description ||
        !date ||
        !location ||
        !orgID) {
        return res
            .status(400)
            .json({ message: "name,description,date,location and orgID are required" });
    }

    const event = {
        name,
        description,
        date,
        location,
        orgID
    }

    await eventModel.addEvent(event);

    res.status(201).json({ message: "event created successfully" });

}


const getEvents = async (req, res) => {
    console.log(req.params.orgID,req.token.id);
    if(await organizationModel.isOrganizationJointByUser(req.token.id,req.params.orgID)){
        return res.status(201).json({ data: await eventModel.getEvents(req.params.orgID) })
    }
    return res
            .status(400)
            .json({ message: "need to join organization first" });
}


const jointEvent = async (req, res) => {

    const { eventID } = req.body
    // Validate the input
    if (!eventID) {
        return res
            .status(400)
            .json({ message: "eventID is required" });
    }



    const eventxusr ={
        eventID,
        usrID:req.token.id
    }


    if(await organizationModel.isEventOrganizationJointByUser(req.token.id,eventID)){
        await eventModel.joinEvent(eventxusr);
        return res.status(200).json({ message:"join is successful" });
    }
    return res
            .status(400)
            .json({ message: "need to join organization first" });



}



module.exports = { addEvents,getEvents,jointEvent }; 