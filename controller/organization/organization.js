require("dotenv").config;
const Auth = require("../auth/auth");
const organizationModel = require("../../model/organizationModel");

const addOrganization = async (req, res) => {

    if (!(Auth.isAdmin(req.token))) return res
        .status(403)
        .json({ message: "Admin user only" });

    const { managerID, name, location, description } = req.body

    // Validate the input
    if (!managerID || !name || !location || !description) {
        return res
            .status(400)
            .json({ message: "managerID ,location, description and name are required" });
    }

    const organization = {
        managerID,
        name,
        location,
        description
    }

    await organizationModel.addOrganization(organization);

    res.status(201).json({ message: "Organization created successfully" });

}

const getOrganizations = async (req, res) => {
    return res.status(201).json({ data: await organizationModel.getOrganizations() })
}

const getOrganizationsByUser = async (req, res) => {
    console.log(req.params.id+"sdsdsdsdsdsdsd");
    return res.status(201).json({ data: await organizationModel.getOrganizationsByUser(req.params.id) })
}




const jointOrganization = async (req, res) => {

    const { orgID } = req.body
    // Validate the input
    if (!orgID) {
        return res
            .status(400)
            .json({ message: "orgID is required" });
    }

    const orgxusr ={
        orgID,
        usrID:req.token.id
    }

    await organizationModel.joinOrganization(orgxusr);
    res.status(200).json({ message:"join is successful" });


}




module.exports = { addOrganization, getOrganizations, jointOrganization,getOrganizationsByUser }; 