var express = require('express');
var router = express.Router();

const PersonGroupController = require('../controllers/persongroup_controller');

/* GET /persongroup returns a list of all persongroups. */
router.get('/', PersonGroupController.getAllGroups);

/* GET /persongroup/:id returns a specific persongroup. */
router.get('/:id', PersonGroupController.getOneGroup);

/* GET /persongroup/:id/json returns a specific persongroup JSON. */
router.get('/:id/json', PersonGroupController.getOneGroupJson);

/* GET /persongroup/:id/person/ returns a specific person in a persongroup. */
router.get('/:groupId/person/:personId', PersonGroupController.getOnePerson);


/* POST /persongroup Creates a person group. */
router.post('/', PersonGroupController.createPersonGroup);

/* POST /persongroup/:id/person Creates a new person in a person group. */
router.post('/:id/person', PersonGroupController.createPerson);

/* POST /persongroup/:id/person Creates a new person in a person group. */
router.post('/:groupId/person/:personId', PersonGroupController.addPersonFace);

/* POST /persongroup/:id/train trains a person group. */
router.post('/:groupId/train', PersonGroupController.train);

/* POST /persongroup/:id/identify identify a person in a person group from an image url. */
router.post('/:groupId/identify', PersonGroupController.identify);


/* DELETE /persongroup/:id deletes a specific person group. */
router.delete('/:id', PersonGroupController.removePersonGroup);

/* DELETE /persongroup/:groupId/person/:personId deletes a specific person from a person-group. */
router.delete('/:groupId/person/:personId', PersonGroupController.removePerson);


module.exports = router;
