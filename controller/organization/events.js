require("dotenv").config;
const Auth = require("../auth/auth");
const organizationModel = require("../../model/organizationModel");

const addEvents = async (req, res) => {

    if (!(await Auth.isAdmin(req.token.user))) return res
        .status(403)
        .json({ message: "Admin user only" });

    const { managerID, name } = req.body

    // Validate the input
    if (!managerID || !name) {
        return res
            .status(400)
            .json({ message: "managerID and name are required" });
    }

    const organization = {
        managerID,
        name,
        eventId:[],
        members:[]
    }

    await organizationModel.addOrganization(organization);

    res.status(201).json({ message: "Organization created successfully"});

}

module.exports = { addEvents }; 