const express = require('express');
const router = express.Router();
const organization = require('../controller/organization/organization');
const events = require('../controller/organization/events');
const authenticateToken = require('../middleware/auth');

router.post('/',authenticateToken,organization.addOrganization);
router.get('/',organization.getOrganizations);
router.get('/:id',organization.getOrganizationsByUser);
router.put('/',authenticateToken,organization.jointOrganization);


router.post('/events/',authenticateToken,events.addEvents);

module.exports = router;
