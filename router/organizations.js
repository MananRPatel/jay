const express = require('express');
const router = express.Router();
const organization = require('../controller/organization/organization');
const events = require('../controller/organization/events');
const authenticateToken = require('../middleware/auth');

router.post('/',authenticateToken,organization.addOrganization);
router.get('/',organization.getOrganizations);
router.put('/',authenticateToken,organization.jointOrganization);

router.post('/events/',authenticateToken,events.addEvents);
router.put('/events/',authenticateToken,events.jointEvent);


router.get('/events/:orgID',authenticateToken,events.getEvents);
router.get('/:id',organization.getOrganizationsByUser);

module.exports = router;
